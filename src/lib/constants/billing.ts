import type { BillingCategory, BillingFilters } from '$lib/types/billing';

export const BILLING_CATEGORIES: BillingCategory[] = [
	'compute',
	'storage',
	'network',
	'database',
	'other'
];

export const DEFAULT_FILTERS: BillingFilters = {
	startDate: '',
	endDate: '',
	categories: [...BILLING_CATEGORIES],
	sources: ['api', 'file'],
	search: ''
};
