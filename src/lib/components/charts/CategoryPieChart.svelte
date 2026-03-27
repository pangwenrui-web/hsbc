<script lang="ts">
	import EChart from '$lib/components/charts/EChart.svelte';
	import type { EChartsOption } from 'echarts';

	let { data }: { data: Record<string, number> } = $props();

	const option = $derived<EChartsOption>({
		title: { text: '按类别占比', left: 'center' },
		tooltip: { trigger: 'item' as const },
		series: [
			{
				type: 'pie' as const,
				radius: '65%',
				data: Object.entries(data).map(([name, value]) => ({ name, value })),
				emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0 } }
			}
		]
	});
</script>

<EChart {option} />
