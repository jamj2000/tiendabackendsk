<script>
    export let data;

    console.log(data);
</script>
<h1>Hola</h1>

{#each data.serialized as d }
    <p>{d._id} {d.nombre} {d.precio}</p>
{/each}
