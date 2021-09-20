<script>
    import {scaleLinear, scaleTime} from 'd3';
    export let date;
    export let min;
    export let max;

    $: scalePos = scaleTime()
                    .domain([min, max])
                    .range([0,100])
                    .clamp(true)
</script>


<div class="line" style="left:{scalePos(date)}%"></div>


<style>
    .line{
    position: absolute;
    height: 100%;
    border-left: 1px solid black;

    width: 0;
    }
</style>