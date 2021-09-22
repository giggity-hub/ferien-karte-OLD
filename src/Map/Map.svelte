<script>
    import bundesländer from './bundesländer.geo.json';
    import Bundesland from './Bundesland.svelte';
    import {geoMercator, geoPath} from 'd3';

    let width = 800;
	let height = 900;

	let projection = geoMercator().fitSize([width, height], bundesländer)
	let geoGenerator = geoPath().projection(projection)
</script>

<div class="svg-container">
    <svg viewBox="0 0 750 900">
        {#each bundesländer.features as bundesland,i}
            <Bundesland {bundesland} {geoGenerator}/>
        {/each}
     
     </svg>
</div>

<style>
    .svg-container{
        position: relative;
        height: 100%;
        
        
    }
    svg{
        max-height: 100%;
    }
</style>