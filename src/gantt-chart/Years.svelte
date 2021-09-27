<script>
    import {stateCodes} from 'stores/states.js'
    import Splide from '../utils/Splide.svelte';
    import SplideSlide from '../utils/SplideSlide.svelte';
import Year from './Year.svelte';
    export let ferien;

    export let year;

    const years = Object.keys(ferien).sort()
    console.log(years);

    function indexToYear(index){
        return years[index]
    }

    function yearToIndex(year){
        return years.indexOf(year)
    }
</script>


<Splide start={yearToIndex(year)}>
    {#each Object.entries(ferien) as [year, vacations]}
        <SplideSlide >
            <Year ferien={vacations} {year} />
            
        </SplideSlide>
    {/each}
</Splide>