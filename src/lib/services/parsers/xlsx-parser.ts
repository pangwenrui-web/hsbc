import * as XLSX from 'xlsx';
import type { BillingRecord } from '$lib/types/billing';
import { toBillingRecord } from '$lib/services/parsers/record-normalizer';

type SheetRow = {
	date?: unknown;
	category?: unknown;
	amount?: unknown;
	description?: unknown;
};

export const parseBillingXlsx = (buffer: ArrayBuffer): BillingRecord[] => {
	const workbook = XLSX.read(buffer, { type: 'array' });
	const firstSheetName = workbook.SheetNames[0];
	if (!firstSheetName) return [];

	const sheet = workbook.Sheets[firstSheetName];
	const rows = XLSX.utils.sheet_to_json<SheetRow>(sheet, {
		defval: '',
		raw: false,
		dateNF: 'yyyy-mm-dd'
	});

	return rows.map((row, index) => toBillingRecord(row, index));
};
