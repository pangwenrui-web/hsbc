import type { BillingRecord } from '$lib/types/billing';
import { fetchBillingFromApi } from '$lib/services/sources/api-source';
import { loadBillingFromFile } from '$lib/services/sources/file-source';

export interface BillingIngestionService {
	loadFromApi(): Promise<BillingRecord[]>;
	loadFromFile(file: File): Promise<BillingRecord[]>;
	mergeRecords(current: BillingRecord[], incoming: BillingRecord[]): BillingRecord[];
}

export const billingIngestionService: BillingIngestionService = {
	loadFromApi: fetchBillingFromApi,
	loadFromFile: loadBillingFromFile,
	mergeRecords(current, incoming) {
		return [...current, ...incoming];
	}
};
