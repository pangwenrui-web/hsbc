import type { BillingFilters, BillingRecord } from '$lib/types/billing';

export const applyBillingFilters = (records: BillingRecord[], filters: BillingFilters): BillingRecord[] => {
	return records.filter((record) => {
		const dateMatched =
			(!filters.startDate || record.date >= filters.startDate) &&
			(!filters.endDate || record.date <= filters.endDate);
		const categoryMatched = filters.categories.includes(record.category);
		const sourceMatched = filters.sources.includes(record.source);
		const search = filters.search.trim().toLowerCase();
		const keywordMatched =
			search.length === 0 ||
			record.description.toLowerCase().includes(search) ||
			record.category.toLowerCase().includes(search);

		return dateMatched && categoryMatched && sourceMatched && keywordMatched;
	});
};

export const sumBillingAmount = (records: BillingRecord[]): number =>
	records.reduce((sum, record) => sum + record.amount, 0);

export const groupAmountByCategory = (records: BillingRecord[]): Record<string, number> =>
	records.reduce<Record<string, number>>((acc, record) => {
		acc[record.category] = (acc[record.category] ?? 0) + record.amount;
		return acc;
	}, {});

export const groupAmountByDate = (records: BillingRecord[]): Array<{ date: string; amount: number }> => {
	const byDate = records.reduce<Record<string, number>>((acc, record) => {
		acc[record.date] = (acc[record.date] ?? 0) + record.amount;
		return acc;
	}, {});

	return Object.entries(byDate)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([date, amount]) => ({ date, amount }));
};
