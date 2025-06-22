import { generateCVPDF } from '../plugins/cv-pdf-generator';

async function main() {
	console.log('⚠️  Manual PDF generation is deprecated.');
	console.log('📄 PDFs are now generated automatically during the build process.');
	console.log('🚀 To generate PDFs, run: pnpm build');
	console.log('');
	console.log('ℹ️  This will generate both:');
	console.log('   • CV.en.pdf (English version)');
	console.log('   • CV.fr.pdf (French version)');
	console.log('');
	console.log('🔍 PDFs will only be regenerated if source files have changed.');
}

main();
