import { describe, expect, it } from 'vitest';
import { parseBillingCsv } from '$lib/services/parsers/csv-parser';

describe('parseBillingCsv', () => {
	it('parses csv rows into billing records', () => {
		const rows = parseBillingCsv(
			'date,category,amount,description\n2026-03-01,compute,120,cluster\n2026-03-02,invalid,abc,bad amount'
		);
		expect(rows).toHaveLength(2);
		expect(rows[0].category).toBe('compute');
		expect(rows[1].category).toBe('other');
		expect(rows[1].amount).toBe(0);
		expect(rows[1].source).toBe('file');
	});
});
