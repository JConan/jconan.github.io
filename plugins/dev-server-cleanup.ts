import type { Plugin } from 'vite';
import fs from 'fs/promises';

interface DevServerCleanupOptions {
	portFile?: string;
}

const defaultOptions: Required<DevServerCleanupOptions> = {
	portFile: '.dev-server-port'
};

async function clearPortFile(portFile: string): Promise<void> {
	try {
		await fs.unlink(portFile);
		console.log('🧹 Cleaned up dev server port file');
	} catch {
		// File doesn't exist, which is fine
	}
}

async function setPortFile(portFile: string, port: number): Promise<void> {
	try {
		await fs.writeFile(portFile, port.toString());
	} catch (error) {
		console.warn(`Could not write dev server port: ${error}`);
	}
}

function devServerCleanup(options: DevServerCleanupOptions = {}): Plugin {
	const opts = { ...defaultOptions, ...options };
	let cleanupRegistered = false;

	const cleanup = async () => {
		await clearPortFile(opts.portFile);
	};

	const registerCleanup = () => {
		if (cleanupRegistered) return;
		cleanupRegistered = true;

		// Handle various process termination signals
		process.on('SIGINT', cleanup);
		process.on('SIGTERM', cleanup);
		process.on('SIGQUIT', cleanup);
		process.on('exit', cleanup);

		// Handle uncaught exceptions and unhandled rejections
		process.on('uncaughtException', async (error) => {
			console.error('Uncaught exception:', error);
			await cleanup();
			process.exit(1);
		});

		process.on('unhandledRejection', async (reason) => {
			console.error('Unhandled rejection:', reason);
			await cleanup();
			process.exit(1);
		});
	};

	return {
		name: 'dev-server-cleanup',
		apply: 'serve', // Only apply during development

		configureServer(server) {
			// Register cleanup handlers
			registerCleanup();

			// Write port file when server starts
			server.httpServer?.on('listening', async () => {
				const address = server.httpServer?.address();
				if (address && typeof address === 'object' && address.port) {
					await setPortFile(opts.portFile, address.port);
				}
			});

			// Clean up when server closes
			server.httpServer?.on('close', cleanup);
		}
	};
}

export { devServerCleanup };
