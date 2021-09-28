
<script>
    import { onMount } from "svelte";
    import Splide from '@splidejs/splide';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let ref;
    let splide;
    export let start = 0;
    onMount(()=>{
        splide = new Splide(ref, {
            start,
            // height: "100px",
        }).mount();

        splide.on('move', function(index){
            dispatch('move', index)
        })
    })

    export function go(index){
        splide.go(index)
    }

    $: {
        if (splide){
            splide.go(start)
        }
    }
</script>



<div class="splide h-full" bind:this={ref}>
    <!-- make overflow visible for cool effect auf der linken seide weischde bescheid wa -->
    <div class="splide__track bg-green-800 overflow-visible h-full">
        <div class="splide__list h-full bg-red-800">
            <slot></slot>
        </div>
    </div>
</div>



<style global>
    .splide__arrow,
    .splide__pagination__page{
        display: none !important;

    }
</style>