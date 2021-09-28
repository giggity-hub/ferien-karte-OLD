<script>
    import StateCodes from './StateCodes.svelte';
    import Line from './Line.svelte';
    import YearSelection from './YearSelection.svelte';
    import {store} from 'stores/store.js';

 
    import Years from './Years.svelte';
    import DateSlider from './DateSlider.svelte';





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
