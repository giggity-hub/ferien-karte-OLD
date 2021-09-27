<script>
    export let bundesland;
    export let geoGenerator;
    import {createPopper} from '@popperjs/core'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import {store, selectedState} from 'stores/store.js';
    import { onMount } from 'svelte';
    export let tooltipRef;

    let stateCode = bundesland.properties.id.split('-')[1]

    let activeVacation;
    const unsubscribe = store.subscribe(activeVacations => {
		activeVacation = activeVacations[stateCode];
	});

    let ref;
    let popperInstance


    function show(event){
        dispatch('show', {
            event,
            stateCode,
            activeVacation
        })
    }
</script>

<path bind:this={ref}
    on:mousedown|stopPropagation={show}
    stroke="blue"
    stroke-width="1"
    class={ activeVacation ? activeVacation.type + " active" : ""}
    class:is-selected={$selectedState == stateCode}
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
    .is-selected{
        fill: white;
    }
</style>