<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as echarts from 'echarts';

	let { option, height = '320px' }: { option: echarts.EChartsOption; height?: string } = $props();

	let container: HTMLDivElement;
	let chart: echarts.ECharts | null = null;
	let isMounted = $state(false);

	$effect(() => {
		if (!isMounted || !container) return;
		chart = chart ?? echarts.init(container);
		chart.setOption(option, true);
	});

	onMount(() => {
		isMounted = true;
		const resize = () => chart?.resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	});

	onDestroy(() => {
		chart?.dispose();
		chart = null;
	});
</script>

<div bind:this={container} class="w-full rounded-xl border border-slate-200 bg-white p-2" style={`height:${height}`}></div>
