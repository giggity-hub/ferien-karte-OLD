<script>
    const stateCodes = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH']
</script>


<div class="state-code-container">
    {#each stateCodes as code}
        <div class="state-code">{code}</div>
    {/each}
</div>

<style>
    .state-code-container{
        background: yellow;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .state-code{
        flex-grow: 1;
        background: green;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>