import { goto } from "$app/navigation";
import { getCookies } from "$lib/Cookies";
import { redirect } from "@sveltejs/kit";

export const ssr: boolean = false;

export async function load()
{

}