import { mockApiBillingData } from '$lib/data/mock-api-data';
import type { BillingRecord } from '$lib/types/billing';

export const fetchBillingFromApi = async (): Promise<BillingRecord[]> => {
	await new Promise((resolve) => setTimeout(resolve, 250));
	return [...mockApiBillingData];
};
