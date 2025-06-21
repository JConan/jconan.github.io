import type { Plugin } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

interface CVManifest {
	lastHash: string;
	generated: string;
	sourceFiles: string[];
}

interface CVPDFGeneratorOptions {
	sourceFiles?: string[];
	outputDir?: string;
	port?: number;
	devPort?: number;
	devPortFile?: string;
	route?: string;
}

const defaultOptions: Required<CVPDFGeneratorOptions> = {
	sourceFiles: [
		'static/CV.md',
		'src/routes/about/+page.svelte',
		'src/routes/about/+page.ts',
		'src/routes/about/cv.css',
		'src/app.css',
		'plugins/cv-pdf-generator.ts'
	],
	outputDir: 'static/pdf',
	port: 4173,
	devPort: 5173,
	devPortFile: '.dev-server-port',
	route: '/about'
};

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

async function setDevServerPort(portFile: string, port: number): Promise<void> {
	try {
		await fs.writeFile(portFile, port.toString());
	} catch (error) {
		console.warn(`Could not write dev server port: ${error}`);
	}
}

async function clearDevServerPort(portFile: string): Promise<void> {
	try {
		await fs.unlink(portFile);
	} catch {
		// File doesn't exist, which is fine
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

export function cvPDFGenerator(options: CVPDFGeneratorOptions = {}): Plugin {
	const opts = { ...defaultOptions, ...options };

	return {
		name: 'cv-pdf-generator',
		apply: 'build',

		async buildStart() {
			console.log('🔍 Checking CV files for changes...');

			// Calculate current hash
			const currentHash = await calculateHash(opts.sourceFiles);

			// Load existing manifest
			const manifest = await loadManifest();

			// Check if we need to generate a new PDF
			if (manifest && manifest.lastHash === currentHash) {
				console.log(`✅ No changes detected, PDF is up to date`);
				return;
			}

			console.log(`📄 Changes detected, PDF generation will be needed`);
			console.log(`ℹ️  After build completes, run: pnpm run generate-cv-pdf`);

			// Ensure static directory exists
			await fs.mkdir('static', { recursive: true });
		}
	};
}

// Export the generation function for manual use
export async function generateCVPDF(options: CVPDFGeneratorOptions & { devPort?: number } = {}) {
	const opts = { ...defaultOptions, ...options };

	// Check for dev server port file first, then fallback to options or default
	const devServerPort = await getDevServerPort(opts.devPortFile);
	const devPort = options.devPort || devServerPort || opts.devPort;

	console.log('🔍 Checking CV files for changes...');

	// Calculate current hash
	const currentHash = await calculateHash(opts.sourceFiles);

	// Load existing manifest
	const manifest = await loadManifest();

	// Check if we need to generate a new PDF
	if (manifest && manifest.lastHash === currentHash) {
		console.log(`✅ No changes detected, PDF is up to date`);
		return;
	}

	console.log('� Generating CV PDF...');

	// Ensure output directory exists
	await fs.mkdir(opts.outputDir, { recursive: true });

	// Try to use dev server first, fallback to preview server if needed
	const devUrl = `http://localhost:${devPort}${opts.route}`;
	const previewUrl = `http://localhost:${opts.port}${opts.route}`;

	let useDevServer = true;
	let serverProcess: any = null;
	let targetUrl = devUrl;

	try {
		// Test if dev server is running
		console.log(`🔍 Checking if dev server is running on port ${devPort}...`);
		const response = await fetch(devUrl).catch(() => null);

		if (!response || !response.ok) {
			console.log(`⚠️  Dev server not running, starting preview server on port ${opts.port}...`);
			useDevServer = false;
			targetUrl = previewUrl;

			serverProcess = spawn('pnpm', ['preview', '--port', opts.port.toString(), '--host'], {
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
		} else {
			console.log(`✅ Using dev server at ${devUrl}`);
		}

		// Generate PDF
		const filename = `CV.pdf`;
		const outputPath = path.join('static', filename);

		console.log(`📄 Generating PDF from ${targetUrl}...`);

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

			// Add PDF-specific styling to fix image positioning
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

			console.log(`✅ PDF generated: ${outputPath}`);
		} finally {
			await browser.close();
		}

		// Update manifest
		const newManifest: CVManifest = {
			lastHash: currentHash,
			generated: new Date().toISOString(),
			sourceFiles: opts.sourceFiles
		};

		await saveManifest(newManifest);
		console.log(`✅ PDF generated successfully: ${filename}`);
		console.log(`📋 Updated manifest: static/cv.manifest.json`);
	} finally {
		if (serverProcess) {
			serverProcess.kill();
			console.log('🛑 Stopped preview server');
		}
	}
}

// Export a function specifically for use with dev server
export async function generateCVPDFFromDev(
	devPort: number = 5173,
	options: CVPDFGeneratorOptions = {}
) {
	const opts = { ...defaultOptions, ...options };

	// Store dev server port for build process
	await setDevServerPort(opts.devPortFile, devPort);

	return generateCVPDF({ ...options, devPort });
}

// Function to clean up dev server port file
export async function cleanupDevServer(options: CVPDFGeneratorOptions = {}) {
	const opts = { ...defaultOptions, ...options };
	await clearDevServerPort(opts.devPortFile);
	console.log('🧹 Cleaned up dev server port file');
}
