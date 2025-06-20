import { generateCVPDFFromDev } from '../plugins/cv-pdf-generator.js';

async function main() {
	const devPort = process.argv[2] ? parseInt(process.argv[2]) : 5173;

	try {
		console.log(`🚀 Generating CV PDF using dev server on port ${devPort}...`);
		await generateCVPDFFromDev(devPort);
		console.log('✅ CV PDF generation completed successfully!');
	} catch (error) {
		console.error('❌ Failed to generate CV PDF:', error);
		process.exit(1);
	}
}

main();
