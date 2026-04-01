import type { BillingRecord } from '$lib/types/billing';
import { parseBillingCsv } from '$lib/services/parsers/csv-parser';
import { parseBillingXlsx } from '$lib/services/parsers/xlsx-parser';

const isCsvFile = (file: File): boolean => file.name.toLowerCase().endsWith('.csv');
const isXlsxFile = (file: File): boolean => {
	const lower = file.name.toLowerCase();
	return lower.endsWith('.xlsx') || lower.endsWith('.xls');
};

export const loadBillingFromFile = async (file: File): Promise<BillingRecord[]> => {
	if (isCsvFile(file)) {
		const content = await file.text();
		return parseBillingCsv(content);
	}
	if (isXlsxFile(file)) {
		const buffer = await file.arrayBuffer();
		return parseBillingXlsx(buffer);
	}
	throw new Error('Unsupported file type. Please upload CSV or XLSX.');
};
