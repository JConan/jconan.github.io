import { generateCVPDF } from '../plugins/cv-pdf-generator';

async function main() {
	try {
		await generateCVPDF();
		console.log('✅ CV PDF generation completed successfully!');
	} catch (error) {
		console.error('❌ Failed to generate CV PDF:', error);
		process.exit(1);
	}
}

main();
