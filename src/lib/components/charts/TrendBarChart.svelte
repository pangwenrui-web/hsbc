<script lang="ts">
	import EChart from '$lib/components/charts/EChart.svelte';
	import type { EChartsOption } from 'echarts';

	let { data }: { data: Array<{ date: string; amount: number }> } = $props();

	const option = $derived<EChartsOption>({
		title: { text: '按日期费用趋势', left: 'center' },
		tooltip: { trigger: 'axis' as const },
		xAxis: { type: 'category' as const, data: data.map((item) => item.date) },
		yAxis: { type: 'value' as const, name: '金额 (CNY)' },
		series: [
			{
				type: 'bar' as const,
				data: data.map((item) => Number(item.amount.toFixed(2))),
				itemStyle: { color: '#0ea5e9' }
			}
		]
	});
</script>

<EChart {option} />
