<script lang="ts">
	import CVContent from './components/CVContent.svelte';
	import DownloadButton from './components/DownloadButton.svelte';

	const { data } = $props();

	let isLoading = $state(false);
	let cvContent: CVContent;

	async function downloadPDF() {
		if (isLoading) return;

		isLoading = true;

		try {
			// Try html2pdf first
			const html2pdf = (await import('html2pdf.js')).default;

			if (!cvContent?.element) {
				throw new Error('CV content not found');
			}

			const element = cvContent.element;

			const opt = {
				margin: 15,
				filename: 'CV-Johan-CHAN.pdf',
				image: {
					type: 'jpeg',
					quality: 0.92
				},
				html2canvas: {
					scale: 1,
					useCORS: true,
					allowTaint: true,
					backgroundColor: '#ffffff',
					logging: false
				},
				jsPDF: {
					unit: 'mm',
					format: 'a4',
					orientation: 'portrait'
				}
			};

			await html2pdf().set(opt).from(element).save();
		} catch (error) {
			console.error('Error with html2pdf, falling back to print:', error);
			// Fallback to browser print
			printCV();
		} finally {
			isLoading = false;
		}
	}

	function printCV() {
		// Create a new window with print-optimized styles
		const printWindow = window.open('', '_blank');
		if (!printWindow) {
			alert('Veuillez autoriser les pop-ups pour télécharger le PDF');
			return;
		}

		const element = cvContent?.element;
		if (!element) return;

		printWindow.document.write(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>CV - Johan CHAN</title>
				<style>
					@page {
						margin: 2cm;
						size: A4;
					}
					body {
						font-family: 'Inter', -apple-system, sans-serif;
						line-height: 1.6;
						color: #000;
						background: #fff;
						margin: 0;
						padding: 0;
					}
					h1 { font-size: 2.5em; margin-bottom: 1rem; }
					h2 { font-size: 1.8em; margin: 2rem 0 1rem; border-bottom: 2px solid #ccc; padding-bottom: 0.5rem; }
					h3 { font-size: 1.3em; margin: 1.5rem 0 0.5rem; }
					p { margin-bottom: 1rem; }
					img { max-width: 160px; height: auto; border-radius: 8px; }
					a { color: #0066cc; }
					div[style*="grid-template-columns"] {
						display: grid;
						grid-template-columns: auto 1fr;
						gap: 0.5rem 1rem;
						margin-bottom: 3rem;
						position: relative;
					}
					div[style*="grid-template-columns"] h1 {
						grid-column: 1 / -1;
						margin-bottom: 1.5rem;
					}
					div[style*="grid-template-columns"] img {
						position: absolute;
						top: 0;
						right: 0;
					}
					div[style*="page-break-inside"] {
						page-break-inside: avoid;
						break-inside: avoid;
						margin-bottom: 1.5rem;
					}
				</style>
			</head>
			<body>
				${element.innerHTML}
			</body>
			</html>
		`);

		printWindow.document.close();

		// Wait for content to load then print
		setTimeout(() => {
			printWindow.print();
			printWindow.close();
		}, 500);
	}
</script>

<svelte:head>
	<title>CV - Johan CHAN</title>
	<meta
		name="description"
		content="CV professionnel de Johan CHAN - Développeur Fullstack spécialisé en Svelte et SvelteKit"
	/>
</svelte:head>

<div class="cv-page">
	<header class="cv-header">
		<h1>Mon CV</h1>
		<DownloadButton {isLoading} onclick={downloadPDF} />
	</header>

	<main class="cv-main">
		<CVContent bind:this={cvContent} cvHTML={data.cvHTML} />
	</main>
</div>

<style>
	@reference "tailwindcss";

	.cv-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		padding: 1rem;
	}

	.cv-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto 2rem;
		padding: 1rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	.cv-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0;
	}

	.cv-main {
		max-width: 1200px;
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		.cv-header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}

		.cv-header h1 {
			font-size: 2rem;
		}

		.cv-page {
			padding: 0.5rem;
		}
	}
</style>
