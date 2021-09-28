<script>
    import {stateCodes} from 'stores/states.js'
    import Splide from '../utils/Splide.svelte';
    import SplideSlide from '../utils/SplideSlide.svelte';
    import Year from './Year.svelte';
    import { createEventDispatcher } from 'svelte';
    import {allHolidays} from 'stores/holidays.js';
    import { selectedYear, selectedDate } from 'stores/selection.js';


    const years = Object.keys($allHolidays).sort()

    function indexToYear(index){
        return years[index]
    }
    function yearToIndex(year){
        return years.indexOf(year.toString())
    }

    function handleMove({detail}){
        let newYear = indexToYear(detail)
        selectedDate.update(date => {
            date.setFullYear(newYear)
            return date
        })
    }


</script>


<Splide start={yearToIndex($selectedYear)} on:move={handleMove}>
    {#each Object.entries($allHolidays) as [year, vacations]}
        <SplideSlide >
            <Year ferien={vacations} {year} />
            
        </SplideSlide>
    {/each}
</Splide>