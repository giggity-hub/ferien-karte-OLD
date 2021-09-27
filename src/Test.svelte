

<script>
    import { onMount } from "svelte";
    import Splide from '@splidejs/splide';


    let ref;
    onMount(()=>{
        let splide = new Splide( ref, {
            classes: {
                arrows: 'w-1'
            }
            // autoWidth: true,
            // fixedWidth: "100%",
        } ).mount();

        splide.on('move', function(e){
            console.log(e);
        })
    })

    // splide.go()

</script>


<div class="bg-sommer ">
    <div class="splide " bind:this={ref}>
        <div class="splide__track h-32 bg-green-800">
            <div class="splide__list h-full bg-red-800">
                <div class="splide__slide bg-green-300 ">Slide 01</div>
                <div class="splide__slide bg-red-400 ">Slide 02</div>
                <div class="splide__slide bg-blue-200 ">Slide 03</div>
            </div>
        </div>
    </div>
</div>


<style global>
    .splide__arrow,
    .splide__pagination__page{
        display: none !important;

    }
</style>