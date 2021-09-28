<script context="module">
    import { writable } from 'svelte/store';
    // we export the relX position so that it can be used by the line component
    export const relX = writable(0);
</script>

<script>
import {scaleLinear, scaleTime} from 'd3'
import { onMount } from 'svelte';
import { createEventDispatcher } from 'svelte';
import {selectedDate, selectedYear, firstDateOfSelectedYear, lastDateOfSelectedYear} from 'stores/selection.js';

const dispatch = createEventDispatcher();


let ref;
let unix;
// let relX;

// export let min;
// export let max;
// export let date;

function clamp(num, [min, max]){
    return Math.min(Math.max(num, min), max);
}

let width = 0; //initial value damit der folgende code nicht breakt
$: scaleDay = scaleLinear()
                .domain([0, width])
                .range([$firstDateOfSelectedYear, $lastDateOfSelectedYear])
                .clamp(true)



$:{
    // update the relX position if the date or width changes
    relX.set(scaleDay.invert($selectedDate))
}


function resizeHandler(){
    width = ref.getBoundingClientRect().width
}
onMount(resizeHandler)

function moveHandler(clientX){
    let rect = ref.getBoundingClientRect()
    relX.set(clamp(clientX - rect.x, [0, width]))
    selectedDate.set(scaleDay($relX))
}

const mouseMoveHandler = ({clientX}) => moveHandler(clientX)
function attachMouseMoveListener(e){
    mouseMoveHandler(e)
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', ()=>{
        document.removeEventListener('mousemove', mouseMoveHandler)
    }, {once: true})
}
const touchMoveHandler = ({touches}) => moveHandler(touches[0])
function attachTouchMoveListener(e){
    touchMoveHandler(e)
    document.addEventListener('touchmove', touchMoveHandler)
    document.addEventListener('touchend', ()=>{
        document.removeEventListener('touchmove', touchMoveHandler)
    }, {once: true})
}



</script>

<svelte:window on:resize={resizeHandler} />
<div class="no-hover">

</div>
<!-- on:touchend|preventDefault={detachMoveListener} -->
<div bind:this={ref} class="range-wrapper" 
    on:touchstart|preventDefault={attachTouchMoveListener}
    on:mousedown|preventDefault={attachMouseMoveListener}
    
    >
    <div class="slider__thumb" style="transform: translateX(calc({$relX}px - var(--thumbwidth)/2))"></div>

    
</div>

<style>
    .slider__thumb{
        --thumbwidth : var(--trackheight);
        height: var(--trackheight);
        width: var(--thumbwidth);
        background: green;
        pointer-events: none;
        position: absolute;
        border-radius: 50px;

    }
    .range-wrapper{
        --trackheight : 20px;
        background: yellow;
        position: relative;
        width: 100%;
        height: var(--trackheight);
        /* overflow: hidden; */
        /* border-radius: 5px; */
        
    }
    .range-input{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
    }
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