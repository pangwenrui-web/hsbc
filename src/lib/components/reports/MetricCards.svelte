<script lang="ts">
	let {
		totalAmount,
		recordCount,
		avgAmount
	}: { totalAmount: number; recordCount: number; avgAmount: number } = $props();
</script>

<section class="grid gap-3 md:grid-cols-3">
	<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
		<p class="text-sm text-slate-500">总费用</p>
		<p class="mt-1 text-2xl font-bold text-slate-800">¥ {totalAmount.toFixed(2)}</p>
	</article>
	<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
		<p class="text-sm text-slate-500">记录条数</p>
		<p class="mt-1 text-2xl font-bold text-slate-800">{recordCount}</p>
	</article>
	<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
		<p class="text-sm text-slate-500">平均每条费用</p>
		<p class="mt-1 text-2xl font-bold text-slate-800">¥ {avgAmount.toFixed(2)}</p>
	</article>
</section>
