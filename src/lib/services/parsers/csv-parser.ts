import type { BillingCategory, BillingRecord } from '$lib/types/billing';

const categorySet = new Set<BillingCategory>(['compute', 'storage', 'network', 'database', 'other']);

const normalizeCategory = (value: string): BillingCategory => {
	const lowered = value.trim().toLowerCase();
	return categorySet.has(lowered as BillingCategory) ? (lowered as BillingCategory) : 'other';
};

export const parseBillingCsv = (content: string): BillingRecord[] => {
	const lines = content.split(/\r?\n/).map((line) => line.trim());
	const rows = lines.filter((line) => line.length > 0);
	if (rows.length <= 1) {
		return [];
	}

	return rows.slice(1).map((row, index) => {
		const [date = '', category = '', amount = '0', description = ''] = row.split(',').map((v) => v.trim());
		const parsedAmount = Number.parseFloat(amount);
		return {
			id: `file-${date}-${index + 1}`,
			source: 'file',
			date,
			category: normalizeCategory(category),
			amount: Number.isNaN(parsedAmount) ? 0 : parsedAmount,
			currency: 'CNY',
			description
		} as BillingRecord;
	});
};
