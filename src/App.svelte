<script>
	import KalenderView from './gantt-chart/KalenderView.svelte';
	import Map from './Map/Map.svelte';

	const ferienUrl = 'https://raw.githubusercontent.com/giggity-hub/schulferien/main/ferien.json'
    let ferien = fetch(ferienUrl)
        .then(res => res.json())
</script>

<main>
	<Map/>

	{#await ferien}
	loading schmoading
	{:then ferien}
		<KalenderView {ferien}/>
	{/await}
</main>

<style>
	main{
		display: flex;
	}
</style>