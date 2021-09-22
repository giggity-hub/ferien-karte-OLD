<script>
	import KalenderView from './gantt-chart/KalenderView.svelte';
	import Map from './Map/Map.svelte';

	const ferienUrl = 'https://raw.githubusercontent.com/giggity-hub/schulferien/main/ferien.json'
    let ferien = fetch(ferienUrl)
        .then(res => res.json())
</script>

<main>
	<div class="map-wrapper wrapper">
		<Map/>
	</div>

	<div class="calendar-wrapper wrapper">
		{#await ferien}
		loading schmoading
		{:then ferien}
			<KalenderView {ferien}/>
		{/await}
	</div>
</main>

<style>
	:root{
		--calendar-head-height : 80px;
	}
	.map-wrapper{
		background: blue;
		flex-grow: 1;
		
	}
	.calendar-wrapper{
		background: orange;
		flex-grow: 1;
	}


	@media only screen and (max-width: 900px) {
		.map-wrapper{
			position: fixed;
			height: 90vh;
		}
		.wrapper{
			width: 100%;
			flex-shrink: 0;
			flex-grow: 0;
		}
  		.calendar-wrapper {
			background-color: lightblue;
			position: absolute;
			top: 90vh;
			}
		}

	main{
		display: flex;
		background: orchid;
		height: 100vh;
	}
</style>