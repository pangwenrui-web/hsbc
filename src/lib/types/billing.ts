export type BillingCategory = 'compute' | 'storage' | 'network' | 'database' | 'other';

export interface BillingRecord {
	id: string;
	source: 'api' | 'file';
	date: string;
	category: BillingCategory;
	amount: number;
	currency: 'CNY';
	description: string;
}

export interface BillingFilters {
	startDate: string;
	endDate: string;
	categories: BillingCategory[];
	sources: Array<'api' | 'file'>;
	search: string;
}
