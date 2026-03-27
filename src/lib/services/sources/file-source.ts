import type { BillingRecord } from '$lib/types/billing';
import { parseBillingCsv } from '$lib/services/parsers/csv-parser';

export const loadBillingFromFile = async (file: File): Promise<BillingRecord[]> => {
	const content = await file.text();
	return parseBillingCsv(content);
};
