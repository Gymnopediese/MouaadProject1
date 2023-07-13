<script lang="ts">
    import { goto } from "$app/navigation";
    import all from "$lib/global";

	function go(url: string)
	{
		console.log(url)
		goto("/edit?file=" + url);
	}

	function view(url: string)
	{
		goto("/view?file=" + url);
	}
</script>

<h1>Welcome {all.user.name}</h1>

<!-- {#if all.user.rights == 1}
<p>you are a simple user</p>
<button>Projets en attente</button>
<button>Projets en cours</button>
<button>Projets archive</button>
{:else}
<p>you are an admin 😎</p>
<button>Gerer les utilisateur</button>
<button>Modifier des projets en attente</button>
<button>Valider un projet</button>
<button>Voir les archives</button>
{/if} -->
<button on:click={()=>go("csv/new.csv")}>Nouveau projet</button>

<h1>brouillons</h1>
{#each all.user.projects.filter((val) => val.status == 0) as project}
	<p>
		{project.name}
		<button on:click={() => go(project.path)}>edit</button>
		<button on:click={() => view(project.path)}>view</button>
	</p>
{/each}

<h1>en attente</h1>
{#each all.user.projects.filter((val) => val.status == 1) as project}
	<p>
		{project.name}
		<button on:click={() => go(project.path)}>edit</button>
		<button on:click={() => view(project.path)}>view</button>
	</p>
{/each}

<h1>en cours</h1>
{#each all.user.projects.filter((val) => val.status == 2) as project}
	<p>
		{project.name}
		{#if all.user.rights == 2}
			<button on:click={() => go(project.path)}>edit</button>
		{/if}
		<button on:click={() => view(project.path)}>view</button>
	</p>
{/each}

<h1>archives</h1>
{#each all.user.projects.filter((val) => val.status == 3) as project}
	<p>
		{project.name}
		{#if all.user.rights == 2}
			<button on:click={() => go(project.path)}>edit</button>
		{/if}
		<button on:click={() => view(project.path)}>view</button>
	</p>
{/each}
