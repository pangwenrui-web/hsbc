import type { BillingRecord } from '$lib/types/billing';

export const mockApiBillingData: BillingRecord[] = [
	{
		id: 'api-1',
		source: 'api',
		date: '2026-03-03',
		category: 'compute',
		amount: 1280.5,
		currency: 'CNY',
		description: 'K8s cluster node pool'
	},
	{
		id: 'api-2',
		source: 'api',
		date: '2026-03-08',
		category: 'database',
		amount: 860,
		currency: 'CNY',
		description: 'Managed PostgreSQL'
	},
	{
		id: 'api-3',
		source: 'api',
		date: '2026-03-10',
		category: 'storage',
		amount: 420.25,
		currency: 'CNY',
		description: 'Object storage'
	},
	{
		id: 'api-4',
		source: 'api',
		date: '2026-03-12',
		category: 'network',
		amount: 330.75,
		currency: 'CNY',
		description: 'Outbound bandwidth'
	}
];
