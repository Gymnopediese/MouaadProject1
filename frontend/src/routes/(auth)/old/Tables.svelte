<script lang="ts">
    import { post } from "$lib/API";


	let name = "";
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

	interface Data{
		exercice: string,
		colaborateur: string,
		status: string,
		communaute: string,
		niveau: string,
		region: string,
		var: string,
		jh: number,
		tjm: number,
		ca: number,
	}

	var data: Array<Data> = []
	var years = [
		'2022',
		'2023',
		'2024',
		'2025',
		'2026'
	]

	var status = [
		'Partner',
		'Leader',
	]

	var niveau = [
		'1',
		'2',
		'3',
		'HG',
	]

	var region = [
		'Paris',
		'Atlantique',
		'Hawaii',
		'Bahamas',
	]

	function add()
	{
		data.push({
			exercice: "2022",
			colaborateur: "Jesus",
			status: "Partner",
			communaute: "salut",
			niveau: '1',
			region: 'Paris',
			var: '1',
			jh: 10,
			tjm: 10,
			ca: 100,
		});
		data = data;
	}

	async function save()
	{
		if (data.length == 0 || name == "")
			return ;
		var response = await post("projects/create", {name: name, data: data})
	}

</script>

<button on:click={save}>save</button>
<button on:click={add}>+</button>
<button on:click={function(){ data.pop(); data = data }}>-</button>
<input type="text" bind:value={name}>
<table>
	<tr>
		{#each names as name}
			<th>{name}</th>
		{/each}
	</tr>
	{#each data as item}
	<tr>
		<select bind:value={item.exercice}>
			{#each years as value}<option {value}>{value}</option>{/each}
		</select>
		<input type="text" class="animal" bind:value={item.colaborateur} />
		<select bind:value={item.status}>
			{#each status as value}<option {value}>{value}</option>{/each}
		</select>

		<select bind:value={item.niveau}>
			{#each niveau as value}<option {value}>{value}</option>{/each}
		</select>

		<select bind:value={item.region}>
			{#each region as value}<option {value}>{value}</option>{/each}
		</select>

		<input type="number" class="animal" bind:value={item.jh} />
		<input type="number" class="animal" bind:value={item.tjm} />
		<input type="number" class="animal" value="{item.jh * item.tjm}" readonly/>

		<!-- {#each cols as col}
			<td>
				<input type="text" class="{col.name !== 'animal' && 'numeric' }" bind:value={item[col.name]} />
				</td>
		{/each} -->
	</tr>
	{/each}
</table>

<style>
	.numeric {
		width: 70px;
	}


</style>