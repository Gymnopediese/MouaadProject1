<script lang="ts"> 
	import Spreadsheet from "./Tables.svelte";
	  
	  const poblationDensity = (females, males, area) => {
	  return (females + males) / area;
	};

  </script>
  
  <main>
	  <Spreadsheet />
  </main>
  