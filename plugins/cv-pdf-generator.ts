import type { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

interface CVLanguageManifest {
	lastHash: string;
	generated: string;
	sourceFiles: string[];
	pdfPath: string;
}

interface CVManifest {
	en: CVLanguageManifest;
	fr: CVLanguageManifest;
}

interface CVPDFGeneratorOptions {
	outputDir?: string;
	port?: number;
	devPort?: number;
	devPortFile?: string;
}

interface LanguageConfig {
	lang: string;
	route: string;
	sourceFiles: string[];
	outputFilename: string;
}

const defaultOptions: Required<CVPDFGeneratorOptions> = {
	outputDir: 'static',
	port: 4173,
	devPort: 5173,
	devPortFile: '.dev-server-port'
};

const languageConfigs: LanguageConfig[] = [
	{
		lang: 'en',
		route: '/en/about',
		sourceFiles: [
			'static/CV.en.md',
			'src/routes/about/+page.svelte',
			'src/routes/about/+page.ts',
			'src/routes/about/cv.css',
			'src/app.css',
			'plugins/cv-pdf-generator.ts'
		],
		outputFilename: 'CV.en.pdf'
	},
	{
		lang: 'fr',
		route: '/fr/about',
		sourceFiles: [
			'static/CV.fr.md',
			'src/routes/about/+page.svelte',
			'src/routes/about/+page.ts',
			'src/routes/about/cv.css',
			'src/app.css',
			'plugins/cv-pdf-generator.ts'
		],
		outputFilename: 'CV.fr.pdf'
	}
];

async function calculateHash(files: string[]): Promise<string> {
	const hash = crypto.createHash('sha256');

	for (const file of files) {
		try {
			const content = await fs.readFile(file, 'utf-8');
			hash.update(content);
		} catch (error) {
			console.warn(`Warning: Could not read file ${file} for hash calculation`);
		}
	}

	return hash.digest('hex').substring(0, 8);
}

async function getDevServerPort(portFile: string): Promise<number | null> {
	try {
		const portContent = await fs.readFile(portFile, 'utf-8');
		const port = parseInt(portContent.trim());
		return isNaN(port) ? null : port;
	} catch {
		return null;
	}
}

async function loadManifest(): Promise<CVManifest | null> {
	try {
		const content = await fs.readFile('static/CV.manifest.json', 'utf-8');
		return JSON.parse(content);
	} catch {
		return null;
	}
}

async function saveManifest(manifest: CVManifest): Promise<void> {
	await fs.writeFile('static/CV.manifest.json', JSON.stringify(manifest, null, 2));
}

async function needsRegeneration(
	config: LanguageConfig,
	manifest: CVManifest | null
): Promise<boolean> {
	if (!manifest || !manifest[config.lang as keyof CVManifest]) {
		return true;
	}

	const currentHash = await calculateHash(config.sourceFiles);
	const langManifest = manifest[config.lang as keyof CVManifest];

	return langManifest.lastHash !== currentHash;
}

async function startPreviewServer(port: number): Promise<any> {
	console.log(`🚀 Starting preview server on port ${port}...`);

	const serverProcess = spawn('pnpm', ['preview', '--port', port.toString(), '--host'], {
		stdio: 'pipe',
		detached: false
	});

	// Wait for preview server to start
	await new Promise<void>((resolve, reject) => {
		let resolved = false;
		const timeout = setTimeout(() => {
			if (!resolved) {
				reject(new Error('Server startup timeout'));
			}
		}, 30000);

		serverProcess.stdout?.on('data', (data: Buffer) => {
			const output = data.toString();
			if ((output.includes('Local:') || output.includes('localhost')) && !resolved) {
				resolved = true;
				clearTimeout(timeout);
				setTimeout(resolve, 3000); // Give server time to fully start
			}
		});

		serverProcess.on('error', (error: Error) => {
			if (!resolved) {
				resolved = true;
				clearTimeout(timeout);
				reject(error);
			}
		});
	});

	return serverProcess;
}

async function generatePDFForLanguage(
	config: LanguageConfig,
	targetUrl: string,
	outputDir: string
): Promise<void> {
	const outputPath = path.join(outputDir, config.outputFilename);

	console.log(`📄 Generating ${config.lang.toUpperCase()} PDF from ${targetUrl}...`);

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});

	try {
		const page = await browser.newPage();
		await page.setViewport({ width: 1200, height: 1600 });

		// Navigate to the CV page
		await page.goto(targetUrl, {
			waitUntil: 'networkidle0',
			timeout: 30000
		});

		// Wait for content to load
		await page.waitForSelector('.cv', { timeout: 10000 });

		// Add PDF-specific styling
		await page.addStyleTag({
			content: `
				@media print {
					.cv-header {
						display: grid !important;
						grid-template-columns: 2fr 1fr !important;
						gap: 2rem !important;
						align-items: start !important;
					}
					
					.cv-photo-container {
						display: flex !important;
						justify-content: center !important;
						align-items: flex-start !important;
					}
					
					.cv-photo {
						width: 160px !important;
						height: 160px !important;
						object-fit: cover !important;
						border-radius: 8px !important;
						display: block !important;
					}
					
					.cv-info {
						padding-right: 1rem !important;
					}
					
					/* Ensure proper layout flow */
					.cv-container {
						max-width: none !important;
						padding: 1rem !important;
						transform: scale(0.95) !important;
						transform-origin: top left !important;
					}
					
					/* Hide navigation and actions for PDF */
					nav, header:not(.cv-header), .cv-actions {
						display: none !important;
					}
				}
			`
		});

		// Generate PDF
		await page.pdf({
			path: outputPath,
			format: 'A4',
			printBackground: true,
			margin: {
				top: '15mm',
				right: '8mm',
				bottom: '15mm',
				left: '8mm'
			}
		});

		console.log(`✅ ${config.lang.toUpperCase()} PDF generated: ${outputPath}`);
	} finally {
		await browser.close();
	}
}

export function cvPDFGenerator(options: CVPDFGeneratorOptions = {}): Plugin {
	const opts = { ...defaultOptions, ...options };

	return {
		name: 'cv-pdf-generator',
		apply: 'build',

		async buildStart() {
			console.log('🔍 Checking CV files for changes...');

			// Load existing manifest
			const manifest = await loadManifest();

			// Check which languages need regeneration
			const regenerationNeeded: LanguageConfig[] = [];

			for (const config of languageConfigs) {
				if (await needsRegeneration(config, manifest)) {
					regenerationNeeded.push(config);
				}
			}

			if (regenerationNeeded.length === 0) {
				console.log('✅ All PDFs are up to date');
				return;
			}

			console.log(
				`📄 Generating PDFs for languages: ${regenerationNeeded.map((c) => c.lang.toUpperCase()).join(', ')}`
			);

			// Ensure output directory exists
			await fs.mkdir(opts.outputDir, { recursive: true });

			// Check if developer has intentionally enabled PDF generation
			const devServerPort = await getDevServerPort(opts.devPortFile);

			if (!devServerPort) {
				console.log(`ℹ️  No .dev-server-port file found - skipping PDF generation`);
				console.log(
					`💡 To enable PDF generation, create a .dev-server-port file with your dev server port`
				);
				return;
			}

			let useDevServer = false;
			let serverProcess: any = null;
			let targetPort = opts.port;

			// Dev server port file exists - check if dev server is running
			console.log(`🔍 Dev server port file found, checking server on port ${devServerPort}...`);
			try {
				const response = await fetch(`http://localhost:${devServerPort}/en/about`).catch(
					() => null
				);
				if (response && response.ok) {
					console.log(`✅ Using dev server at port ${devServerPort}`);
					useDevServer = true;
					targetPort = devServerPort;
				} else {
					console.log(`⚠️  Dev server not responding on port ${devServerPort}`);
					console.log(`🚀 Starting preview server on port ${opts.port} instead...`);
				}
			} catch {
				console.log(`⚠️  Dev server not available on port ${devServerPort}`);
				console.log(`🚀 Starting preview server on port ${opts.port} instead...`);
			}

			if (!useDevServer) {
				serverProcess = await startPreviewServer(opts.port);
				targetPort = opts.port;
			}

			try {
				// Generate PDFs for each language that needs it
				const newManifest: CVManifest = manifest || {
					en: {} as CVLanguageManifest,
					fr: {} as CVLanguageManifest
				};

				for (const config of regenerationNeeded) {
					const targetUrl = `http://localhost:${targetPort}${config.route}`;

					await generatePDFForLanguage(config, targetUrl, opts.outputDir);

					// Update manifest for this language
					const currentHash = await calculateHash(config.sourceFiles);
					newManifest[config.lang as keyof CVManifest] = {
						lastHash: currentHash,
						generated: new Date().toISOString(),
						sourceFiles: config.sourceFiles,
						pdfPath: path.join(opts.outputDir, config.outputFilename)
					};
				}

				// Save updated manifest
				await saveManifest(newManifest);
				console.log('✅ All PDFs generated successfully');
				console.log('📋 Updated manifest: static/CV.manifest.json');
			} finally {
				if (serverProcess) {
					serverProcess.kill();
					console.log('🛑 Stopped preview server');
				}
			}
		}
	};
}

// Export the generation function for manual use (backward compatibility)
export async function generateCVPDF(options: CVPDFGeneratorOptions & { devPort?: number } = {}) {
	console.log(
		'⚠️  Manual PDF generation is deprecated. PDFs are now generated automatically during build.'
	);
	console.log('ℹ️  Run "pnpm build" to generate PDFs.');
}

// Export a function specifically for use with dev server (backward compatibility)
export async function generateCVPDFFromDev(
	devPort: number = 5173,
	options: CVPDFGeneratorOptions = {}
) {
	console.log(
		'⚠️  Manual PDF generation is deprecated. PDFs are now generated automatically during build.'
	);
	console.log('ℹ️  Run "pnpm build" to generate PDFs.');
}

// Function to clean up dev server port file (backward compatibility)
export async function cleanupDevServer(options: CVPDFGeneratorOptions = {}) {
	console.log('ℹ️  Dev server cleanup is no longer needed.');
}
