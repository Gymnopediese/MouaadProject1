import { redirect } from "@sveltejs/kit";

export async function load({ url })
{
	var path = url.searchParams.get('file');
	console.log(path);
	if (!path)
		throw redirect(302, '/home');
	return ({
		path: path
	})
}