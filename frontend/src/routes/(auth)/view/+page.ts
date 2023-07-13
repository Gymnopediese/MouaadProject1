import { redirect } from "@sveltejs/kit";
import { page } from '$app/stores'

export async function load({ url })
{
	var path = url.searchParams.get('file');
	if (!path)
		throw redirect(302, '/home');
	return ({
		path: path
	})
}