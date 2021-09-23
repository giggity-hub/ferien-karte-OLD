<script>
    import bundesländer from './bundesländer.geo.json';
    import Bundesland from './Bundesland.svelte';
    import {create, geoMercator, geoPath} from 'd3';
    import {createPopper} from '@popperjs/core'
import { onMount } from 'svelte';

    let width = 800;
	let height = 900;

	let projection = geoMercator().fitSize([width, height], bundesländer)
	let geoGenerator = geoPath().projection(projection)

    let tooltipRef;
    let svgRef;
    let popperContext;
    onMount(()=>{
        function generateGetBoundingClientRect(x = 0, y = 0) {
        return () => ({
            width: 0,
            height: 10,
            top: y,
            right: x,
            bottom: y,
            left: x,
        });
        }

        const virtualElement = {
            getBoundingClientRect: generateGetBoundingClientRect(),
        };
        const instance = createPopper(virtualElement, tooltipRef, {
            modifiers: [
                {
                name: 'preventOverflow',
                options: {
                    boundary: popperContext,
                },
                },
            ],
            });

        document.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
        virtualElement.getBoundingClientRect = generateGetBoundingClientRect(x, y);
        console.log(generateGetBoundingClientRect(x, y)());
        instance.update();
        });
    })
    function handleShow({detail}){
        // console.log(detail);
        // const popperInstance = createPopper(detail.ref, tooltipRef)
    }

</script>

<div bind:this={popperContext}  class="svg-container">
    <div class="tooltip" bind:this={tooltipRef}>Toool tip schmultipasdf asdf</div>
    <svg viewBox="0 0 750 900">
        {#each bundesländer.features as bundesland,i}
            <Bundesland on:show={handleShow} {tooltipRef} {bundesland} {geoGenerator}/>
        {/each}
     
     </svg>
     
</div>


<style>
    .tooltip{
        position: absolute;
        background: red;
        min-height: 100px;
    }
    .tooltip[data-show]{
        background: orange !important;
    }
    .svg-container{
        position: relative;
        height: 100%;
        
        
    }
    svg{
        max-height: 100%;
    }
</style>