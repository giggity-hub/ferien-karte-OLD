<script>
    import {scaleLinear} from 'd3'
    export let ferien;
    let width = 500;
    let height = 800;
    export let year;

    console.log(ferien);

    function getFirstDayOfYear(year){
        return + new Date(year,0,1);
    }
    function getLastDayOfYear(year){
        return + new Date(year,11,31);
    }

    let scale =  scaleLinear()
                    .domain([getFirstDayOfYear(year), getLastDayOfYear(year)])
                    .range([0, 100])
</script>



<div class="year">

        {#each Object.entries(ferien) as [key, bundesland], i}
            <!-- {console.log(bundesland)} -->
            <div class="row">
                {#each bundesland as holidy}
                    <div class="test {holidy.type}" style="
                        left:{scale(Date.parse(holidy.start))}%;
                        width:{scale(getFirstDayOfYear(year) + Date.parse(holidy.end) - Date.parse(holidy.start))}%"></div>

                    <!-- <rect style="fill: #69b3a2"  x={scale(Date.parse(holidy.start))} y={i*20} 
                    width={scale(firstDayOfYear(2021) + Date.parse(holidy.end) - Date.parse(holidy.start))}
                    height=10
                    rx=3
                    /> -->
                {/each}
            </div>

        {/each}
    

</div>

<style>



    .row{
        display: flex;
        flex-grow: 1;
        align-items: center;
        position: relative;
        height: 40px;
    }
    .row:hover{
        background: darkred;
    }
    .test{
        background: black;
        height: 10px;
        position: absolute;
        /* width: 5%; */
        border-radius: 2px;
        /* left: 50%; */
        z-index: 300;
    }

    .year{
        width: 100%;
        height: 100%;
        flex-grow: 0;
        flex-shrink: 0;
        background: red;
        display: flex;
        flex-direction: column;
    }

    .OSTERN{
        background: green;
    }
    .HERBST{
        background: orange;
    }
    .SOMMER{
        background: yellow;
    }
    .WINTER, .WEIHNACHTEN{
        background: blue;
    }
</style>