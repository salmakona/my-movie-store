<template>
  <div class="container-fluid">
    <header-background />
    <Nuxt />
    <footer>
      <p>Copyright © the movie store.</p>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import headerBackground from "../components/headerBackground.vue";

export default Vue.extend({
  name: "MainLayout",
  components: { headerBackground },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.navbar {
  background: black;
  padding: 0;
  height: 4.5rem;
}

footer {
  text-align: center;
  background: black;
  padding: 1rem 0;
  color: white;
}
.container-fluid{
  padding: 0 !important;
}
</style>
