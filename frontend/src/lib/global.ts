import { writable, type Writable } from 'svelte/store';

export const count = writable(0);

const all = {
    user: null as null | any,
	table: writable([]) as Writable<any[]>,
	file: "csv/new.csv" as string
};

export default all;