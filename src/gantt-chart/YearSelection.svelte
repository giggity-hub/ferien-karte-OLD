<script>
    import { createEventDispatcher, onMount } from 'svelte';
    export let years;
    export let date;
    import {createPopper} from '@popperjs/core'
    

    const dispatch = createEventDispatcher();

    let maxYear = Math.max(...years);
    let minYear = Math.min(...years);

    $: isIncrementable = maxYear > date.getFullYear()
    $: isDecrementable = minYear < date.getFullYear()

    function incrementYear(){
        date.setFullYear(date.getFullYear() + 1)
        dispatch('change', {
            date
        })
    }

    function decrementYear(){
        date.setFullYear(date.getFullYear() - 1)
        dispatch('change', {
            date
        })
    }

    let btnRef;
    let tooltipRef;
    onMount(()=>{
        const popperInstance = createPopper(btnRef, tooltipRef)
    })
</script>

<div class="year-selection">
    <button class:muted={!isDecrementable} on:click={decrementYear}>
        -
    </button>
    <div>
        {date.getFullYear()}
    </div>
    <button bind:this={btnRef} class:muted={!isIncrementable} on:click={incrementYear}>
        +
    </button>
    <div class="tip" bind:this={tooltipRef}>tooltip schmultip</div>
</div>

<style>
    .tip{
        background: black;
        color: white;
    }
    .year-selection{
        display: flex;
    }
    button{
        background: white;
    }
    button.muted{
        background: darkgrey;
        pointer-events: none;
    }

</style>