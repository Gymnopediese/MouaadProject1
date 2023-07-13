<script>
    import { goto } from "$app/navigation";
    import all from "$lib/global";


	var data = [];


	function go(url)
	{
		goto("/edit?file=" + url);
	}

	function view(url)
	{
		goto("/view?file=" + url);
	}
</script>

<h1>edit</h1>
{#each all.user.projects.filter((val) => val.status == 0) as project}
	<p>
		{project.name}
		<button on:click={() => go(project.path)}>edit</button>
		<button on:click={() => view(project.path)}>view</button>
	</p>
{/each}

<h1>en cours</h1>
{#each all.user.projects.filter((val) => val.status == 1) as project}
	<p>
		{project.name}
		<button>edit</button>
	</p>
{/each}

<h1>archive</h1>
{#each all.user.projects.filter((val) => val.status == 2) as project}
	<p>
		{project.name}
		<button>edit</button>
	</p>
{/each}
