<template>
  <div class="container">
    <search-form />
    <SteamingComponent/>
  </div>
</template>

<script>
import Vue from "vue";
import searchForm from "../components/searchForm.vue";
import SteamingComponent from "../components/steamingComponent.vue";

export default Vue.extend({
  name: "IndexPage",
  components: { searchForm, SteamingComponent },
  layout: "mainLayout",

  head() {
    return {
      title: "The movie store",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "The Movie db",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "movies, stream, stremaing",
        },
      ],
    };
  },
  data() {
    return {};
  },
  computed: {
  },
});
</script>
