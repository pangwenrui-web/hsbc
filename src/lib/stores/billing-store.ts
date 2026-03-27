import { derived, writable } from 'svelte/store';
import { DEFAULT_FILTERS } from '$lib/constants/billing';
import { applyBillingFilters } from '$lib/domain/billing-analytics';
import type { BillingFilters, BillingRecord } from '$lib/types/billing';

export const allBillingRecords = writable<BillingRecord[]>([]);
export const billingFilters = writable<BillingFilters>({ ...DEFAULT_FILTERS });

export const filteredBillingRecords = derived([allBillingRecords, billingFilters], ([records, filters]) =>
	applyBillingFilters(records, filters)
);
