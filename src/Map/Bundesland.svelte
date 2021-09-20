<script>
    export let bundesland;
    export let geoGenerator;
    
    import {store} from 'stores/store.js';

    let stateCode = bundesland.properties.id.split('-')[1]

    let activeVacation;
    const unsubscribe = store.subscribe(activeVacations => {
		activeVacation = activeVacations[stateCode];
	});
</script>

<path 
    on:mouseenter={()=> console.log(bundesland)}
    stroke="black"
    class={ activeVacation ? activeVacation.type + " active" : ""}
    d={geoGenerator(bundesland)}
/>

<style>
    path{
        fill: grey;
    }
    .active{
        fill: black;
    }
    .OSTERN{
        fill: green;
    }
    .HERBST{
        fill: orange;
    }
    .SOMMER{
        fill: yellow;
    }
    .WINTER, .WEIHNACHTEN{
        fill: blue;
    }

</style>