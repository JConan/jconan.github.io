/// <reference path="./k6.d.ts" />

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

export const options = {
	stages: [
		{ duration: '30s', target: 5 }, // Ramp up to 5 users
		{ duration: '1m', target: 10 }, // Stay at 10 users
		{ duration: '30s', target: 0 } // Ramp down to 0 users
	],
	thresholds: {
		http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
		http_req_failed: ['rate<0.1'], // Error rate must be below 10%
		errors: ['rate<0.1'] // Custom error rate below 10%
	}
};

export default function () {
	// Test contact page load
	const pageResponse = http.get('http://localhost:5173/contact');

	check(pageResponse, {
		'contact page loads': (r) => r.status === 200,
		'contact page load time': (r) => r.timings.duration < 1000
	}) || errorRate.add(1);

	// Test form submission
	const formData = {
		name: `Load Test User ${__VU}-${__ITER}`,
		email: `loadtest${__VU}${__ITER}@example.com`,
		message: `This is a performance test message from VU ${__VU}, iteration ${__ITER}.`
	};

	const submitResponse = http.post('http://localhost:5173/contact', formData);

	check(submitResponse, {
		'form submission successful': (r) => r.status === 200,
		'form submission time': (r) => r.timings.duration < 2000,
		'no server errors': (r) => !r.body.includes('error')
	}) || errorRate.add(1);

	sleep(1);
}

/**
 * @param {SummaryData} data
 * @returns {{ [filename: string]: string }}
 */
export function handleSummary(data) {
	return {
		'performance-report.json': JSON.stringify(data, null, 2),
		'performance-report.html': htmlReport(data)
	};
}

/**
 * @param {SummaryData} data
 * @returns {string}
 */
function htmlReport(data) {
	const p95 = data.metrics.http_req_duration?.values?.p95 || 0;
	const errorRateValue = data.metrics.http_req_failed?.values?.rate || 0;
	const totalRequests = data.metrics.http_reqs?.values?.count || 0;
	const avgDuration = data.metrics.http_req_duration?.values?.avg || 0;

	return `
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form Performance Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
        .pass { border-left: 5px solid #4CAF50; }
        .fail { border-left: 5px solid #f44336; }
    </style>
</head>
<body>
    <h1>Contact Form Performance Test Report</h1>
    <div class="metric ${p95 < 2000 ? 'pass' : 'fail'}">
        <strong>95th Percentile Response Time:</strong> ${p95.toFixed(2)}ms
        <br><em>Threshold: < 2000ms</em>
    </div>
    <div class="metric ${errorRateValue < 0.1 ? 'pass' : 'fail'}">
        <strong>Error Rate:</strong> ${(errorRateValue * 100).toFixed(2)}%
        <br><em>Threshold: < 10%</em>
    </div>
    <div class="metric">
        <strong>Total Requests:</strong> ${totalRequests}
    </div>
    <div class="metric">
        <strong>Average Response Time:</strong> ${avgDuration.toFixed(2)}ms
    </div>
</body>
</html>`;
}
