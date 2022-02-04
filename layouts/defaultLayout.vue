<template>
  <div>
    <header-background />
    <b-container fluid class="pt-4">
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import headerBackground from "../components/headerBackground.vue";
export default Vue.extend({
  components: { headerBackground },
  name: "defultLayout",
  data() {
    return {};
  },
  methods: {},
});
</script>
