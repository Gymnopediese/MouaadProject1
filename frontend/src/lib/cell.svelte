<script lang="ts">
    import all from '$lib/global';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
  
	const dispatch = createEventDispatcher();
  
	export let mode = 'lock';
	export let text = '';
	export let x: number;
	export let y: number;


	let inputValue = '';
  
	function handleClick() {
	  if (mode === 'lock') {
		dispatch('edit');
	  }
	}
  
	function handleInput(event) {
	  inputValue = event.target.value;
	}
  
	function handleSelect() {
	//   const selectedIndex = event.target.selectedIndex;
	//   const selectedOption = options[selectedIndex];
	//   dispatch('select', selectedOption);
		console.log(text)
		all.table.update((val) => {
			val.splice(y, 1);
			return val;
		});
	}
  
	onMount(() => {
	  inputValue = text;
	});


	var years = [
		'2022',
		'2023',
		'2024',
		'2025',
		'2026'
	]

	var status = [
		'Partner',
		'Leader',
	]

	var niveau = [
		'1',
		'2',
		'3',
		'HG',
	]

	var region = [
		'Paris',
		'Atlantique',
		'Hawaii',
		'Bahamas',
	]

	var modes = {
		years,
		status,
		niveau,
		region,
	}
  </script>
  
  <div class="grid-cell">
	{#if mode === 'lock'}
	  <span>{text}</span>
	{:else if  mode === 'header'}
	  <button on:click={handleSelect}>{text}</button>
	{:else if mode === 'input'}
	  <input type="text" bind:value={text} on:input={handleInput} />
	{:else}
	  <select bind:value={text} >
		{#each modes[mode] as option}
		  <option value={option}>{option}</option>
		{/each}
	  </select>
	{/if}
  </div>
  
  <style>
	.grid-cell {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  padding: 8px;
	  border: 1px solid #ccc;
	  cursor: pointer;
	  width:  10vmax;
	}
  </style>