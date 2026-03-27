import { describe, expect, it } from 'vitest';
import {
	applyBillingFilters,
	groupAmountByCategory,
	groupAmountByDate,
	sumBillingAmount
} from '$lib/domain/billing-analytics';
import type { BillingFilters, BillingRecord } from '$lib/types/billing';

const data: BillingRecord[] = [
	{
		id: '1',
		source: 'api',
		date: '2026-03-01',
		category: 'compute',
		amount: 100,
		currency: 'CNY',
		description: 'ecs core'
	},
	{
		id: '2',
		source: 'file',
		date: '2026-03-02',
		category: 'storage',
		amount: 200,
		currency: 'CNY',
		description: 'bucket'
	},
	{
		id: '3',
		source: 'api',
		date: '2026-03-03',
		category: 'compute',
		amount: 50,
		currency: 'CNY',
		description: 'ecs gpu'
	}
];

describe('billing analytics', () => {
	it('applies combined filters', () => {
		const filters: BillingFilters = {
			startDate: '2026-03-02',
			endDate: '2026-03-03',
			categories: ['compute'],
			sources: ['api'],
			search: 'gpu'
		};
		expect(applyBillingFilters(data, filters)).toHaveLength(1);
	});

	it('sums records amount', () => {
		expect(sumBillingAmount(data)).toBe(350);
	});

	it('groups by category and date', () => {
		expect(groupAmountByCategory(data)).toEqual({ compute: 150, storage: 200 });
		expect(groupAmountByDate(data)).toEqual([
			{ date: '2026-03-01', amount: 100 },
			{ date: '2026-03-02', amount: 200 },
			{ date: '2026-03-03', amount: 50 }
		]);
	});
});
