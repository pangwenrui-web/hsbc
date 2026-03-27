<script lang="ts">
	import type { BillingRecord } from '$lib/types/billing';

	let { records }: { records: BillingRecord[] } = $props();
</script>

<section class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
	<table class="min-w-full text-sm">
		<thead class="bg-slate-50 text-slate-700">
			<tr>
				<th class="px-4 py-3 text-left">日期</th>
				<th class="px-4 py-3 text-left">类别</th>
				<th class="px-4 py-3 text-left">来源</th>
				<th class="px-4 py-3 text-left">描述</th>
				<th class="px-4 py-3 text-right">金额 (CNY)</th>
			</tr>
		</thead>
		<tbody>
			{#if records.length === 0}
				<tr>
					<td class="px-4 py-4 text-slate-500" colspan="5">没有匹配到数据</td>
				</tr>
			{:else}
				{#each records as record}
					<tr class="border-t border-slate-100">
						<td class="px-4 py-3">{record.date}</td>
						<td class="px-4 py-3">{record.category}</td>
						<td class="px-4 py-3">{record.source}</td>
						<td class="px-4 py-3">{record.description}</td>
						<td class="px-4 py-3 text-right">{record.amount.toFixed(2)}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</section>
