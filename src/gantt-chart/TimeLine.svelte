<script>
    import {scaleLinear, scaleTime} from 'd3'
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let ref;

    export let min;
    export let max;

    let width = 0; //initial value damit der folgende code nicht breakt
    $: scaleDay = scaleTime()
                    .domain([0, width])
                    .range([min, max])
                    .clamp(true) 

    const handler = ({clientX})=>{
        let rect = ref.getBoundingClientRect()
        let relX = clientX - rect.x
        dispatch('change', {
            date: scaleDay(relX)
        })
    }

    function attachMousePositionListener(e){
        handler(e)
        document.addEventListener('mousemove', handler)
    }

    function removeMousemoveListener(){
        document.removeEventListener('mousemove', handler)
    }

    onMount(()=>{
        width = ref.getBoundingClientRect().width


    })

</script>

<svelte:window on:mouseup={removeMousemoveListener} />


<div bind:this={ref} on:mousedown|preventDefault={attachMousePositionListener} class="timeline">
        
</div>


<style>
    .timeline{
        height:50px;
        background: yellow;
        display: flex;
    }
</style>