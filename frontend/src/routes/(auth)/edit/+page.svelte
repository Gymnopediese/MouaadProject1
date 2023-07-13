<script lang="ts">
	import { onMount } from "svelte"
	import * as d3 from "d3";
	// import {tsvParse, tsvFormat,csvFormat} from 'd3-dsv';
    import Row from "../../../lib/row.svelte";
    import all from "$lib/global";

    import { patch, post } from "$lib/API";
    import { BACKEND_HOST } from "$lib/API";
    import { goto } from "$app/navigation";

	export var data: any;
	var datas: string[][] = [];

	let name = "new"
	var project: any = {
		status: 0,
		id: -1,
		name: "new",
	};

 	onMount(
		async () => {
			if (data.path != "csv/new.csv")
			{
				project = all.user.projects.find((val) => val.path == data.path);
				if (project == null || (project.status > 1 && all.user.rights != 2))
				{
					console.log("slaut");
					goto("/home");
					return;
				}
				name = project.name;
			}
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

	var d_val = ["2022",
				"Jesus",
				"Partner",
				"salut",
				'1',
				'Paris',
				'1',
				10,
				10,
				100,]

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


	function add()
	{
		all.table.update((val) => [...val, [...d_val]]);
	}

	function remove()
	{
		all.table.update((val) => {val.pop(); return val;});
	}


	//use d3 to convert data to csv
	function convert()
	{
		var csv = d3.csvFormat(all.table);
		console.log(csv);
	}
	function handleDownload() {


		const element = document.createElement('a');
		const file = new Blob([d3.csvFormat(all.table)], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = "myFile.csv";
		element.click();
	}

	async function save()
	{
		if (datas.length == 0 || name == "")
			return ;

    	const file = new Blob([d3.csvFormat(datas)], { type: 'text/csv' });

    	const formData = new FormData();	
   		

		formData.append('file', file, data.path);
		if (data.path == "csv/new.csv")
		{
			var res = await post("projects/upload", formData);
			document.location.href = ("/edit?file=" + res.path);

		}
		else
		{
			console.log(project);
			formData.append('id', project.id);
			formData.append('name', name);
			// formData.append('file', file, data.path);
			await patch("projects/update", formData);
		}
	}
	async function change_status(nstat)
	{
		await patch("projects/status", {id: project.id, status: nstat});
		console.log(nstat);
		project.status = nstat;
	}
</script>

<p>project name: 
	<input name="name" bind:value={name} type="text" placeholder="project name...">
</p>

<button on:click={save}>save</button>
<br>
<button on:click={handleDownload}>download</button>
<br>
{#if project.name != "new" && project.status == 0}
	<button on:click={() => change_status(1)}>publy</button>
{/if}

{#if all.user.rights == 2 && project.status == 1}
	<button on:click={() => change_status(2)}>validate</button>
	<button on:click={() => change_status(0)}>deny</button>
{/if}

{#if all.user.rights == 2 && project.status == 2}
	<button on:click={() => change_status(3)}>set as finish</button>
{/if}
<button on:click={add}>+</button>
<button on:click={remove}>-</button>

<Row datas={names} title="#" modes={["lock"] * names.length}/>
{#each datas as row, index}
	<Row datas={row} title="{index}" modes={["years", "input", "status", "lock", "niveau", "region"]}/>
{/each}