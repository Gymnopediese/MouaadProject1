
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t\t<!-- <meta name=\"viewport\" content=\"width=device-width\" /> -->\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n\n<style>\n\t*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  font-family: 'Jost Variable';\n}\n\ninput, textarea {\n  padding: 10px;\n  border: 1px solid black;\n  outline: none;\n}\n\n.material-icons {\n  font-family: 'Material Icons';\n}\n\n:root {\n  --darker: #18181f;\n  --dark: #22222c;\n  --bright: #fffcf3;\n  --brighter: #ffffff;\n  \n  --butt_on: #f1eee5;\n  --button: #fff0b5;\n  /*--button: #b7ff8d;*/\n\n  --back1: var(--darker);\n  --back2: var(--dark);\n  --front: var(--bright);\n\n  --hover: #333341;\n  --shover: #424255;\n  --text: #656581;\n}\n.darkmode {\n  --back1: var(--bright);\n  --back2: var(--bright);\n  --front: var(--dark);\n  background-color: var(--back1);\n  color: var(--front);\n  \n  --hover: #e7e4db;\n  --shover: #cecbc4;\n  --text: #a3a09b;\n  --button: #8598f0;\n  --butt_on: #444448;\n}\n\n.outlined {\n  border: 2px solid var(--front);\n  border-radius: 20px;\n}\n\n.inverted {\n  color: var(--back1);\n  background-color: var(--front);\n}\n\nbutton {\n  background-color: var(--butt_on);\n  color: var(--back1);\n  /*border: 2px solid var(--front);*/\n  border-radius: 20px;\n  border: none;\n  outline: none;\n}\n\nhtml, body {\n  max-height: 100%;\n  background-color: var(--back1);\n  color: var(--front);\n}\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\ninput, button, textarea, select {\n  font: inherit;\n}\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n\nh1 {\n  font-size: 2.8rem;\n  font-weight: bold;\n}\n\np {\n  font-size: 1.1rem;\n}\n\na {\n  font-size: 1.3rem;\n}\n\nbutton {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.3rem;\n  padding: 10px 20px;\n}\n\na {\n  text-decoration: none;\n  font-weight: 400;\n  transition: font-weight 0.3s ease;\n}\n\na:hover {\n  font-weight: 600;\n\n}\n\na:link, a:visited {\n  color: inherit;\n}\n\ninput:focus:invalid {\n  border: 2px solid red;\n}\n</style>\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1ab7f3q"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
