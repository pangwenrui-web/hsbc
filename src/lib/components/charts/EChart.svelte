<script lang="ts">
	import { onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	let { option, height = '320px' }: { option: echarts.EChartsOption; height?: string } = $props();

	let container: HTMLDivElement;
	let chart: echarts.ECharts | null = null;

	const renderChart = () => {
		if (!container) return;
		chart = chart ?? echarts.init(container);
		chart.setOption(option, true);
	};

	$effect(() => {
		renderChart();
		return () => chart?.dispose();
	});

	onDestroy(() => chart?.dispose());
</script>

<div bind:this={container} class="w-full rounded-xl border border-slate-200 bg-white p-2" style={`height:${height}`}></div>
