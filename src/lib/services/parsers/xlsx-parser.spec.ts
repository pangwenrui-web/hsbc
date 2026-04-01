import { describe, expect, it } from 'vitest';
import * as XLSX from 'xlsx';
import { parseBillingXlsx } from '$lib/services/parsers/xlsx-parser';

describe('parseBillingXlsx', () => {
	it('parses first worksheet rows into billing records', () => {
		const rows = [
			{ date: '2026-03-20', category: 'compute', amount: 300.5, description: 'vm pool' },
			{ date: '2026-03-21', category: 'unknown', amount: 'abc', description: 'fallback' }
		];
		const ws = XLSX.utils.json_to_sheet(rows);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Billing');
		const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;

		const parsed = parseBillingXlsx(buffer);
		expect(parsed).toHaveLength(2);
		expect(parsed[0].category).toBe('compute');
		expect(parsed[0].amount).toBe(300.5);
		expect(parsed[1].category).toBe('other');
		expect(parsed[1].amount).toBe(0);
	});
});
