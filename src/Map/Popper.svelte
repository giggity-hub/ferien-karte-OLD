<script>
    import { fade } from 'svelte/transition';
	import { elasticOut, linear } from 'svelte/easing';
    import {stateNames} from 'stores/states.js';

    export let popperStateCode = "NW"
    import coatOfArms from 'stores/coatOfArms.js';
    import { beforeUpdate } from 'svelte';

    const stopPropagation = (e) => e.stopPropagation()

    export let ref = null;
    export let isTransitionEnabled;
    export let popperVacation;

    function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = linear(t)
                console.log(eased);
				return `
					transform: rotateY(${eased * 180}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}
    function spout(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = linear(t)

				return `
					transform: rotateY(${180 + eased* 180}deg);
                    display: none;
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}
    console.log(popperVacation);
</script>



<div on:mousedown={stopPropagation} class:show={popperStateCode} class="tooltip p-4 bg-gray-900 shadow-lg " bind:this={ref} class:transition={isTransitionEnabled} >

    <div class="flex ">
        <div class="coat-of-arms  w-10 ">
            <img class="img-fluid" src={coatOfArms[popperStateCode]} alt="coat of arms">
        </div>
        <div class="ml-4 flex-column">
            <h1 class="">
                {stateNames[popperStateCode]}
            </h1>
            <p class="text-xs mt-1">
                {#if popperVacation}
                    <span class="text-{popperVacation.type.toLowerCase()}">{popperVacation.name}</span>
                {:else}
                    <span class="text-sommer">Keine Ferien</span>
                {/if}
                
            </p>
        </div>
    </div>

    <!-- Selected State = {popperStateCode} -->
    

</div>


<style>


    .tooltip{
        position: absolute;
        /* background: rgb(22, 22, 22); */
        color: white;
        min-height: 100px;
        /* width: 500px; */
        display: none;
        transition: none;
        border-radius: .5rem;
        
    }
    .tooltip.show{
        display: block;
        
    }
    .tooltip.transition{
        transition: all .15s linear;
    }
</style>