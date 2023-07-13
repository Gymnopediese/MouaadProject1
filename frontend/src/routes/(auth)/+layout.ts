import { get } from "$lib/API";
import { getCookies } from "$lib/Cookies.js";
import all from "$lib/global";
import { redirect } from "@sveltejs/kit";






export async function load({fetch})
{
	// if (getCookies("TOKEN") == null)
	// 	throw redirect(302, "/");
	all.user = await get("users/me", {}, fetch);
	console.log(all.user);
}