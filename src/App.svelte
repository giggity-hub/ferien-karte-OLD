<script>
	import KalenderView from './gantt-chart/KalenderView.svelte';
	import Map from './Map/Map.svelte';

	const ferienUrl = 'https://raw.githubusercontent.com/giggity-hub/schulferien/main/ferien.json'
    let ferien = fetch(ferienUrl)
        .then(res => res.json())
</script>

<main>
	<div class="map-wrapper">
		<Map/>
	</div>

	<div class="calendar-wrapper">
		{#await ferien}
		loading schmoading
		{:then ferien}
			<KalenderView {ferien}/>
		{/await}
	</div>
</main>

<style>
	.map-wrapper{
		background: blue;
		flex-grow: 1;
	}
	.calendar-wrapper{
		background: orange;
		flex-grow: 1;
	}
	main{
		display: flex;
		background: orchid;
		height: 100vh;
	}
</style>