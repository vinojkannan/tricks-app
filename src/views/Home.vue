<template>
  <div class="home">
    <tricks></tricks>
  </div>
</template>

<script>
// @ is an alias to /src
import Tricks from "@/components/Tricks";

export default {
  name: "Home",
  components: {
    Tricks
  }
};
</script>
