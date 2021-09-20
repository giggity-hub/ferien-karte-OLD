<script>
    
    import StateCodes from './StateCodes.svelte';
    import Year from './Year.svelte';
    import TimeLine from './TimeLine.svelte'
    import Line from './Line.svelte';
    import YearSelection from './YearSelection.svelte';
    import {store} from 'stores/store.js';
    export let ferien;

    function getFirstDayOfYear(year){
        return new Date(year,0,1);
    }
    function getLastDayOfYear(year){
        return new Date(year,11,31);
    }
    // console.log(Object.keys(ferien).indexOf('2021'));
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


    let count_value;

    store.subscribe(value => {
        count_value = value;
    });

    console.log(count_value);

</script>

<div class="kalenderview">
    <YearSelection date={selectedDay} years={Object.keys(ferien)} on:change={updateSelectedDay}/>
    <div>{selectedDay.getDate()}.{selectedDay.getMonth()}.{selectedDay.getFullYear()}</div>
    <div class="grid">
        <div class="grid__header">
            <TimeLine on:change={updateSelectedDay} min={firstDayOfYear} max={lastDayOfYear} />
        </div>
        <div class="grid__aside">
            <StateCodes/>
        </div>
        <div class="grid__body">
            <div class="container">
                
                <div class="schmontainer" style="transform: translateX({-100 * Object.keys(ferien).indexOf(selectedDay.getFullYear().toString())}%)">
                        {#each Object.entries(ferien) as [key, ferienYear], i}
                            <Year ferien={ferienYear} year={key} />
                        {/each}
                </div>
                <Line min={firstDayOfYear} max={lastDayOfYear} date={selectedDay} />
            </div>
        </div>
    </div>
</div>



<style>
    .schmontainer{
        width: 100%;
        height: 100%;
        /* transform: translateX(-100%); */
        display: flex;
        transition: all .2s linear;
    }
    .grid{
        display: grid;
        grid-template-columns: auto auto;
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
        width: 800px;
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