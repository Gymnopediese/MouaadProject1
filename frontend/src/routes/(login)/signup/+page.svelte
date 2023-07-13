<script lang="ts">
    import { goto } from "$app/navigation";
    import { post } from "$lib/API";
    import { setCookies } from "$lib/Cookies";


	var username: string;
	var password: string;
	var password2: string;
	var err = '';
	async function signup()
	{
		var token = await post("users/create", {username: username, password: password});
		console.log(token);
		if (token.message)
		{
			err = token.message;
			return ;
		}
		setCookies("TOKEN", token);
		goto("/home")
	}

</script>
<p style="color:red" >{err}</p>
<input bind:value={username} type="text" placeholder="username">
<input bind:value={password} type="password" placeholder="password">
<input bind:value={password2} type="password" placeholder="confirm password">
<button on:click={signup}>signIn</button>