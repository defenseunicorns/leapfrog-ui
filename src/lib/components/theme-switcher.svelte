<script lang="ts">
  import { setTheme } from "$lib/theme";
  import { SunSolid, SunOutline } from "flowbite-svelte-icons";

  const toggle = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    switch (theme) {
      case "business":
        setTheme("wireframe");
        break;
      case "wireframe":
        setTheme("business");
        break;
      default:
        setTheme("business");
    }
  };
</script>

<label class="swap swap-rotate">
  <input on:change={toggle} type="checkbox" class="invisible" />
  <SunSolid class="swap-on" />
  <SunOutline class="swap-off" />
</label>
