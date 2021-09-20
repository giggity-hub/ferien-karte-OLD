<script>
    import bundesländer from './bundesländer.geo.json';
    import Bundesland from './Bundesland.svelte';
    import {geoMercator, geoPath} from 'd3';
    import {store} from '../stores/store.js';

    let width = 700;
	let height = 900;

	let projection = geoMercator().fitSize([width, height], bundesländer)
	let geoGenerator = geoPath().projection(projection)
</script>

<svg {width} {height}>
   {#each bundesländer.features as bundesland,i}
       <Bundesland activeVacation={$store.BB} {bundesland} {geoGenerator}/>
   {/each}

</svg>