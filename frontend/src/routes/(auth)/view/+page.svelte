<script lang="ts">
	import { onMount } from "svelte"
	import * as d3 from "d3";
	import {tsvParse, tsvFormat,csvFormat} from 'd3-dsv';
    import Row from "../../../lib/row.svelte";
    import all from "$lib/global";

    import { validate_slots } from "svelte/internal";
    import { post } from "$lib/API";
    import { BACKEND_HOST } from "$lib/API";

	export var data: any;
	var datas: string[][] = [];
 	onMount(
		async () => {
			console.log("mais", data.path);
			var temp = await d3.csv(BACKEND_HOST + `${data.path}`);
			var res = [];
			for (var i of temp)
			{
				console.log(i);
				res.push(Object.values(i));
			}
			all.table.set(res);
		}
	);

	all.table.subscribe((value) => {
		datas = value;
	});


	let names = [
		"exercice",
		"colaborateur",
		"status",
		"communaute",
		"niveau",
		"region",
		"var",
		"jh",
		"tjm",
		"ca",
	]

	function handleDownload() {


		const element = document.createElement('a');
		const file = new Blob([d3.csvFormat(datas)], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = "myFile.csv";
		element.click();
	}

</script>

<button on:click={handleDownload}>download</button>
<br>

<Row datas={names} title="#" modes={["lock"] * names.length}/>
{#each datas as row, index}
	<Row datas={row} title="{index}" modes={[]}/>
{/each}