<script lang="ts">
    import { Indicator } from "flowbite-svelte";

    export let active = false;
</script>

<span class="flex items-center ml-2">
    <Indicator color={active ? "green" : "red"} size="sm" />
</span>
