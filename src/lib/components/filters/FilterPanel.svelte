<script lang="ts">
	import { BILLING_CATEGORIES } from '$lib/constants/billing';
	import type { BillingFilters } from '$lib/types/billing';

	let { filters, onChange }: { filters: BillingFilters; onChange: (next: BillingFilters) => void } = $props();

	const toggleCategory = (category: (typeof BILLING_CATEGORIES)[number]) => {
		const hasCategory = filters.categories.includes(category);
		const categories = hasCategory
			? filters.categories.filter((item) => item !== category)
			: [...filters.categories, category];
		onChange({ ...filters, categories });
	};

	const toggleSource = (source: 'api' | 'file') => {
		const hasSource = filters.sources.includes(source);
		const sources = hasSource
			? filters.sources.filter((item) => item !== source)
			: [...filters.sources, source];
		onChange({ ...filters, sources });
	};

	const sources: Array<'api' | 'file'> = ['api', 'file'];
</script>

<section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
	<h2 class="mb-4 text-lg font-semibold text-slate-800">筛选条件</h2>
	<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
		<label class="text-sm text-slate-600">
			开始日期
			<input
				type="date"
				class="mt-1 w-full rounded-md border border-slate-300 p-2"
				value={filters.startDate}
				onchange={(e) => onChange({ ...filters, startDate: e.currentTarget.value })}
			/>
		</label>
		<label class="text-sm text-slate-600">
			结束日期
			<input
				type="date"
				class="mt-1 w-full rounded-md border border-slate-300 p-2"
				value={filters.endDate}
				onchange={(e) => onChange({ ...filters, endDate: e.currentTarget.value })}
			/>
		</label>
		<label class="text-sm text-slate-600 md:col-span-2">
			关键字
			<input
				type="text"
				class="mt-1 w-full rounded-md border border-slate-300 p-2"
				placeholder="输入描述或类别关键词"
				value={filters.search}
				oninput={(e) => onChange({ ...filters, search: e.currentTarget.value })}
			/>
		</label>
	</div>

	<div class="mt-4">
		<p class="mb-2 text-sm font-medium text-slate-700">费用类别</p>
		<div class="flex flex-wrap gap-2">
			{#each BILLING_CATEGORIES as category}
				<button
					type="button"
					class={`rounded-full border px-3 py-1 text-sm ${
						filters.categories.includes(category)
							? 'border-sky-600 bg-sky-100 text-sky-700'
							: 'border-slate-300 text-slate-600'
					}`}
					onclick={() => toggleCategory(category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<div class="mt-4">
		<p class="mb-2 text-sm font-medium text-slate-700">数据来源</p>
		<div class="flex gap-2">
			{#each sources as source}
				<button
					type="button"
					class={`rounded-full border px-3 py-1 text-sm ${
						filters.sources.includes(source)
							? 'border-emerald-600 bg-emerald-100 text-emerald-700'
							: 'border-slate-300 text-slate-600'
					}`}
					onclick={() => toggleSource(source)}
				>
					{source}
				</button>
			{/each}
		</div>
	</div>
</section>
