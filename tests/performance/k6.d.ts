// k6 type declarations for performance tests
declare module 'k6/http' {
	export interface Response {
		status: number;
		body: string;
		timings: {
			duration: number;
			[key: string]: number;
		};
		[key: string]: any;
	}

	export function get(url: string, params?: any): Response;
	export function post(url: string, body?: any, params?: any): Response;
}

declare module 'k6' {
	export function check(val: any, sets: { [name: string]: (val: any) => boolean }): boolean;
	export function sleep(t: number): void;
}

declare module 'k6/metrics' {
	export class Rate {
		constructor(name: string);
		add(value: number): void;
	}
}

// k6 global variables
declare const __VU: number;
declare const __ITER: number;

// k6 summary data interface
interface MetricValue {
	count?: number;
	rate?: number;
	avg?: number;
	p95?: number;
	[key: string]: any;
}

interface Metric {
	values: MetricValue;
	[key: string]: any;
}

interface SummaryData {
	metrics: {
		http_req_duration?: Metric;
		http_req_failed?: Metric;
		http_reqs?: Metric;
		[key: string]: Metric | undefined;
	};
	[key: string]: any;
}

// Global functions
declare function handleSummary(data: SummaryData): { [filename: string]: string };
