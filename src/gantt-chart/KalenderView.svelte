<script>
    import { fade, fly } from 'svelte/transition';
    import StateCodes from './StateCodes.svelte';
    import Year from './Year.svelte';
    import TimeLine from './TimeLine.svelte'
    import Line from './Line.svelte';
    import YearSelection from './YearSelection.svelte';
    import {store} from 'stores/store.js';
    export let ferien;
    import Map from '../Map/Map.svelte';
    import Splide from '@splidejs/splide';
    import { onMount } from 'svelte';
    import 'slider-core.min.css'
    import Test from '../Test.svelte';
    import Years from './Years.svelte';
    import {selectedDate} from 'stores/selection.js'
    import DateSlider from './DateSlider.svelte';

    function getFirstDayOfYear(year){
        return new Date(year,0,1);
    }
    function getLastDayOfYear(year){
        return new Date(year,11,31);
    }

    let selectedDay = new Date()
    let selectedYear = selectedDay.getFullYear()
    let firstDayOfYear = getFirstDayOfYear(selectedDay.getFullYear())
    let lastDayOfYear = getLastDayOfYear(selectedDay.getFullYear())



    function getActiveVacation(vacations, selectedDate){
        for (let holiday of vacations){
            let start = new Date(holiday.start)
            let end = new Date(holiday.end)
            let isActive = start <= selectedDate && end >= selectedDate;
            if (isActive){
                return holiday
            }
            // console.log(Date.parse(holiday.start));
        }
        return null;
    }
    // getActiveHoliday("NW")
    function updateSelectedDay({detail}){
        selectedDay = detail.date;
        firstDayOfYear = getFirstDayOfYear(selectedDay.getFullYear())
        lastDayOfYear = getLastDayOfYear(selectedDay.getFullYear())
        
        for (let bundesland in ferien[selectedDay.getFullYear()] ){
            let activeVacation = getActiveVacation(ferien[selectedDay.getFullYear()][bundesland], selectedDay)
            store.setActiveVacation(bundesland, activeVacation)
            // console.log(bundesland);
        }
        // console.log(getActiveHoliday('NW'))
    }



</script>

<div class="p-8 flex flex-col ">
    
        <div class="bg-blue-300 ">
            <!-- <div>{selectedDay.getDate()}.{selectedDay.getMonth()}.{selectedDay.getFullYear()}</div> -->
            <YearSelection />

            <DateSlider/>
            
            
        </div>

        <div class="flex-grow-0 flex relative w-full overflow-hidden">
            <div class="w-12 flex-none z-10">
                <StateCodes/>
            </div>
            <div class="bg-black min-w-0 flex-1">
                <div class="h-full bg-white relative">
                    
               
                        <Years/>
     
                        <Line/>

                    <!-- <Test/> -->
                </div>
            </div>
            <div class="w-12 flex-none bg-white opacity-50">

            </div>
                
            
        </div>
  
</div>
