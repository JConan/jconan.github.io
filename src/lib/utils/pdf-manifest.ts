interface CVManifest {
	latest: string;
	versions: Array<{
		hash: string;
		filename: string;
		generated: string;
		source_files: string[];
	}>;
}

export async function fetchCVManifest(): Promise<CVManifest | null> {
	try {
		const response = await fetch('/pdf/cv-manifest.json');
		if (!response.ok) {
			return null;
		}
		return await response.json();
	} catch {
		return null;
	}
}

export function getCVPDFUrl(manifest: CVManifest): string {
	return `/pdf/${manifest.latest}`;
}
