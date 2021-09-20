<script>
    import { createEventDispatcher } from 'svelte';
    export let years;
    export let date;
    

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
</script>

<button class:muted={!isDecrementable} on:click={decrementYear}>
    -
</button>
<div>
    {date.getFullYear()}
</div>
<button class:muted={!isIncrementable} on:click={incrementYear}>
    +
</button>

<style>
    button{
        background: white;
    }
    button.muted{
        background: darkgrey;
        pointer-events: none;
    }

</style>