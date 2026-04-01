import type { BillingRecord } from '$lib/types/billing';
import { toBillingRecord } from '$lib/services/parsers/record-normalizer';

export const parseBillingCsv = (content: string): BillingRecord[] => {
	const lines = content.split(/\r?\n/).map((line) => line.trim());
	const rows = lines.filter((line) => line.length > 0);
	if (rows.length <= 1) {
		return [];
	}

	return rows.slice(1).map((row, index) => {
		const [date = '', category = '', amount = '0', description = ''] = row.split(',').map((v) => v.trim());
		return toBillingRecord({ date, category, amount, description }, index);
	});
};
