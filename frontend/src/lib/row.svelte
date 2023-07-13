<script lang="ts">
    import Cell from "./cell.svelte";


	export let datas: any = [];
	export let modes: any = [];
	export let title: any = [];
	//convert

	$: console.log("salut");
</script>

<div class="salut">

	<Cell text={title} mode={"header"} x={-1} y={title}/>
	{#each datas as cell, index}
		<Cell bind:text={cell} mode={modes[index]} x={index} y={title} />
	{/each}


</div>

<style>

	.salut {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		/* grid-template-rows: repeat(12, 1fr); */
		grid-gap: 1px;
		width: 100%;
	}

</style>