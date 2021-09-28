<script>
    import TimeLine from './TimeLine.svelte';
    import {selectedDate} from 'stores/selection.js'
    import { onMount } from 'svelte';
    import {whilePressed} from '../utils/whilePressed';



    function decrementDay(){
        selectedDate.update(date => {
            date.setDate(date.getDate() - 1)
            return date
        })
    }

    function incrementDay(){
        selectedDate.update(date => {
            date.setDate(date.getDate() + 1)
            return date
        })
    }


    // function clickAndHold()


    let incrementBtnRef;
    let decrementBtnRef;
    onMount(()=>{
        whilePressed(incrementBtnRef, incrementDay, {preventDefault: true})
        whilePressed(decrementBtnRef, decrementDay, {preventDefault: true})
    })

</script>



<div class="flex">
    <div class="w-12 bg-white" bind:this={decrementBtnRef}>
        -
    </div>
    <div class="flex-1">
        <TimeLine/>
    </div>
    <div class="w-12 bg-white" bind:this={incrementBtnRef}>
        +
    </div>
</div>