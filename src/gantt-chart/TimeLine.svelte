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

    let scaleX =  scaleLinear()
                    .domain([min, max])
                    .range([0, 100])

    let ticks =  scaleTime()
                    .domain([new Date(2021,0,1), new Date(2021,11,31)])
                    .range([0, 100])
                    .ticks()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
]
console.log(ticks);
console.log(ticks.map(scaleX));
</script>

<svelte:window on:mouseup={removeMousemoveListener} />


<div bind:this={ref} on:mousedown|preventDefault={attachMousePositionListener} class="timeline">
    {#each ticks as tick}
        
        <div class="test" style="left:{scaleX(tick)}%">{monthNames[tick.getMonth()]}</div>
    {/each}
</div>



<style>
    .test{
        background: green;
        position: absolute;
        /* left: 90%; */
    }
    .timeline{
        height:50px;
        background: yellow;
        display: flex;
        position: relative;
    }
</style>