import type { BillingCategory, BillingRecord } from '$lib/types/billing';

const categorySet = new Set<BillingCategory>(['compute', 'storage', 'network', 'database', 'other']);

export const normalizeCategory = (value: string): BillingCategory => {
	const lowered = value.trim().toLowerCase();
	return categorySet.has(lowered as BillingCategory) ? (lowered as BillingCategory) : 'other';
};

const normalizeText = (value: unknown): string => (value ?? '').toString().trim();

const pad2 = (n: number): string => n.toString().padStart(2, '0');

const formatYmd = (year: number, month: number, day: number): string =>
	`${year}-${pad2(month)}-${pad2(day)}`;

const normalizeTwoDigitYear = (yy: number): number => (yy >= 70 ? 1900 + yy : 2000 + yy);

const normalizeDate = (value: unknown): string => {
	if (value instanceof Date) {
		return formatYmd(value.getFullYear(), value.getMonth() + 1, value.getDate());
	}
	const text = normalizeText(value);
	if (text.length === 0) return '';
	const normalized = text.replaceAll('/', '-');

	// yyyy-m-d
	const isoLike = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	if (isoLike) {
		return formatYmd(Number(isoLike[1]), Number(isoLike[2]), Number(isoLike[3]));
	}

	// m-d-yy or m-d-yyyy (common Excel formatted text)
	const mdYLike = normalized.match(/^(\d{1,2})-(\d{1,2})-(\d{2}|\d{4})$/);
	if (mdYLike) {
		const month = Number(mdYLike[1]);
		const day = Number(mdYLike[2]);
		const rawYear = Number(mdYLike[3]);
		const year = mdYLike[3].length === 2 ? normalizeTwoDigitYear(rawYear) : rawYear;
		return formatYmd(year, month, day);
	}

	const parsed = new Date(normalized);
	if (!Number.isNaN(parsed.getTime())) {
		return formatYmd(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate());
	}

	return normalized;
};

export const toBillingRecord = (
	row: { date?: unknown; category?: unknown; amount?: unknown; description?: unknown },
	index: number
): BillingRecord => {
	const normalizedDate = normalizeDate(row.date);
	const parsedAmount = typeof row.amount === 'number' ? row.amount : Number.parseFloat(normalizeText(row.amount));

	return {
		id: `file-${normalizedDate || 'unknown'}-${index + 1}`,
		source: 'file',
		date: normalizedDate,
		category: normalizeCategory(normalizeText(row.category)),
		amount: Number.isNaN(parsedAmount) ? 0 : parsedAmount,
		currency: 'CNY',
		description: normalizeText(row.description)
	};
};
