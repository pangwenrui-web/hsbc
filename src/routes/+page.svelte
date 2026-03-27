<script lang="ts">
	import CategoryPieChart from '$lib/components/charts/CategoryPieChart.svelte';
	import TrendBarChart from '$lib/components/charts/TrendBarChart.svelte';
	import FilterPanel from '$lib/components/filters/FilterPanel.svelte';
	import BillingTable from '$lib/components/reports/BillingTable.svelte';
	import MetricCards from '$lib/components/reports/MetricCards.svelte';
	import { DEFAULT_FILTERS } from '$lib/constants/billing';
	import {
		groupAmountByCategory,
		groupAmountByDate,
		sumBillingAmount
	} from '$lib/domain/billing-analytics';
	import { fetchBillingFromApi } from '$lib/services/sources/api-source';
	import { loadBillingFromFile } from '$lib/services/sources/file-source';
	import {
		allBillingRecords,
		billingFilters,
		filteredBillingRecords
	} from '$lib/stores/billing-store';
	import type { BillingFilters } from '$lib/types/billing';

	let fileMessage = $state('请先加载 API 数据，也可以上传 CSV 叠加数据。');
	let loading = $state(false);

	const filteredRecords = $derived($filteredBillingRecords);
	const totalAmount = $derived(sumBillingAmount(filteredRecords));
	const recordCount = $derived(filteredRecords.length);
	const avgAmount = $derived(recordCount === 0 ? 0 : totalAmount / recordCount);
	const categoryData = $derived(groupAmountByCategory(filteredRecords));
	const trendData = $derived(groupAmountByDate(filteredRecords));

	const updateFilters = (next: BillingFilters) => {
		billingFilters.set(next);
	};

	const resetFilters = () => {
		billingFilters.set({ ...DEFAULT_FILTERS });
	};

	const importApiData = async () => {
		loading = true;
		const data = await fetchBillingFromApi();
		allBillingRecords.set(data);
		fileMessage = `已从 API 导入 ${data.length} 条记录`;
		loading = false;
	};

	const uploadCsv = async (event: Event) => {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		const fromFile = await loadBillingFromFile(file);
		allBillingRecords.update((prev) => [...prev, ...fromFile]);
		fileMessage = `已从文件导入 ${fromFile.length} 条记录`;
		input.value = '';
	};
</script>

<main class="mx-auto max-w-7xl space-y-5 bg-slate-100 p-4 md:p-8">
	<section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
		<h1 class="text-2xl font-bold text-slate-800">计费管理系统</h1>
		<p class="mt-2 text-slate-600">支持 API 与文件上传双数据源，提供筛选、汇总与可视化报表。</p>
		<div class="mt-4 flex flex-wrap items-center gap-3">
			<button
				class="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
				type="button"
				onclick={importApiData}
				disabled={loading}
			>
				{loading ? '导入中...' : '加载 API 数据'}
			</button>
			<label class="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
				上传 CSV
				<input type="file" class="hidden" accept=".csv" onchange={uploadCsv} />
			</label>
			<button
				class="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
				type="button"
				onclick={resetFilters}
			>
				重置筛选
			</button>
		</div>
		<p class="mt-3 text-sm text-slate-500">{fileMessage}</p>
		<p class="mt-1 text-xs text-slate-400">CSV 格式: date,category,amount,description</p>
	</section>

	<FilterPanel filters={$billingFilters} onChange={updateFilters} />
	<MetricCards {totalAmount} {recordCount} {avgAmount} />

	<section class="grid gap-4 lg:grid-cols-2">
		<TrendBarChart data={trendData} />
		<CategoryPieChart data={categoryData} />
	</section>

	<BillingTable records={filteredRecords} />
</main>
