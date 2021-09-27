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


    function duplicateYearOverflowHolidays(ferien){
        let keys = Object.keys(ferien).sort()
        console.log(keys);
        for (let i=0; i < keys.length -1; i++){
            for (let bundesland in ferien[keys[i]]){
                for (let holiday of ferien[keys[i]][bundesland]){
                    let endDate = new Date(holiday.end).getFullYear()
                    if (endDate > keys[i]){
                        console.log(endDate, keys[i]);
                        // ferien[keys[i+1]][bundesland].push(holiday);

                        // ferien[keys[i+1]].push(holiday);
                    }
                    // console.log();
                }
                // console.log(bundesland);
            }
            // let year = keys[i]

            // ferien[keys]
        }
        return ferien
    }

    function getActiveVacation(vacations, day){
        for (let holiday of vacations){
            const isActive = Date.parse(holiday.start) <= +day && Date.parse(holiday.end) >= +selectedDay;
            if (isActive){
                return holiday
            }
            // console.log(Date.parse(holiday.start));
        }
        return null;
    }
    // getActiveHoliday("NW")
    function updateSelectedDay({detail}){
        console.log(firstDayOfYear);
        console.log(lastDayOfYear);
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

    console.log(ferien);


</script>

<div class="p-8 flex flex-col ">
    

        <div class="h-24 bg-blue-300 pl-12">
                <!-- <div>{selectedDay.getDate()}.{selectedDay.getMonth()}.{selectedDay.getFullYear()}</div> -->
            <YearSelection date={selectedDay} years={Object.keys(ferien)} on:change={updateSelectedDay}/>
        
            shosh
            <TimeLine on:change={updateSelectedDay} min={firstDayOfYear} max={lastDayOfYear} date={selectedDay}/>
        </div>

        <div class="flex-grow-0 flex relative w-full">
            <div class="w-12 flex-none">
                <StateCodes/>
            </div>
            <div class="bg-black min-w-0 flex-1">
                <div class=" h-full bg-white relative">
                    
               
                        <Years {ferien} year={selectedDay.getFullYear()} />
     
                        <Line min={firstDayOfYear} max={lastDayOfYear} date={selectedDay} />

                    <!-- <Test/> -->
                </div>
            </div>
            
                <!-- <div class="splide__list placeholder bg-black h-screen w-full flex relative">
                    
                        <div class="splide__slide bg-green-400 flex-none h-full w-full">
                            asdf
                        </div>
                        <div class="splide__slide bg-orange-400 flex-none  h-full w-full">
                            asdf
                        </div>
                        <div class="splide__slide bg-blue-400 flex-none  h-full w-full">
                            asdf
                        </div>
                </div> -->
                    <!-- <Line min={firstDayOfYear} max={lastDayOfYear} date={selectedDay} />
                    <Year  ferien={ferien[selectedDay.getFullYear()]} year={selectedDay.getFullYear()} /> -->
                    <!-- <div class="flex " style="transform: translateX({-100 * Object.keys(ferien).indexOf(selectedDay.getFullYear().toString())}%)">
                        {#each Object.entries(ferien) as [key, ferienYear], i}
                            <Year ferien={ferienYear} year={key} />
                        {/each}
                    </div> -->
                    
                
            
        </div>

  
        <div class="">
            <!-- <div class="">
                
                
            </div> -->
        </div>
  
</div>



<style>
    .schmontainer{
        width: 100%;
        height: 100%;
        position: relative;
        /* transform: translateX(-100%); */
        display: flex;
        transition: all .2s linear;
    }
    .grid{
        display: grid;
        grid-template-columns: 50px auto;
        grid-template-rows: 50px auto;
        grid-template-areas: 
            ". header"
            "aside body"
    }
    .grid__header{
        grid-area: header;
        /* display: flex; */
    }
    .grid__aside{grid-area: aside}
    .grid__body{grid-area: body}




    .container{
        background: yellow;
        /* transform: translateX(-30px); */
        /* width: 800px; */
        /* width: 50%; */
        /* height: 800px; */
        display: flex;
        overflow: hidden;
        height: 100%;
        position: relative;
        /* border: 1px solid black; */
        

    }
    .year{
        width: 100%;
        height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        background: red;
    }
    .bar{
        display: block;
        background: red;
        margin-left: 50px;
    }

    
</style>