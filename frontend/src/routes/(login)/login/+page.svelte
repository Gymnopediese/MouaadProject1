<script lang="ts">
    import { goto } from "$app/navigation";
    import { post } from "$lib/API";
    import { setCookies } from "$lib/Cookies";


	var username: string;
	var password: string;
	var err		: string = "";
	async function login()
	{
		var token = await post("users/login", {username: username, password: password});
		if (token.message)
		{
			err = token.message;
			return ;
		}
		setCookies("TOKEN", token);
		goto("/home")
	}

</script>
<p style="color:red">{err}</p>
<input bind:value={username} type="text" placeholder="username">
<input bind:value={password} type="password" placeholder="password">
<button on:click={login}>signIn</button>