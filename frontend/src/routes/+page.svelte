<script>
    import { goto } from "$app/navigation";
    import { post } from "$lib/API";
    import { get } from "svelte/store";


	function join()
	{
		goto("/signup")
	}
	console.log("mmmm")
	function signin()
	{
		goto("/login")
	}

</script>

salut
<button on:click={join}>signup</button>
<button on:click={signin}>signin</button>