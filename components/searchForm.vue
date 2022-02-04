<template>
  <div class="search-container">
    <b-form @submit.stop.prevent="onSubmit">
      <div class="input-group mb-3">
        <b-form-input
          type="text"
          class="form-control from-input"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="searchText"
          :state="validation"
          id="feedback-user"
          placeholder="Search for a movie, tv show, person......"
          required
        />
        <button
          class="btn from-input"
          id="button-addon2"
          :disabled="!searchText.length"
          type="submit"
          variant="seceonday"
        >
          Search
        </button>

        <button
          class="btn from-input"
          type="submit"
          variant="danger"
          v-if="!showBtn"
          @click="clearSearch"
        >
          Clear Search
        </button>
      </div>
    </b-form>
    <searchList :loading="loading" />
  </div>
</template>

<script>
import Vue from "vue";
export default {
  components: {},
  data() {
    return {
      searchText: "",
      loading: false,
      showBtn: true,
      error: "",
      showError: false,
    };
  },

  computed: {
    validation() {
      return this.searchText.length > 0;
    },
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("multi/search", this.searchText);
      await this.$store.dispatch("multi/title", "Search Results");
      this.showBtn = false;
      this.loading = true;
    },
    async clearSearch() {
      this.searchText = "";
      this.showBtn = true;
      await this.$store.dispatch("multi/title", "");
      await this.$store.dispatch("multi/search", this.searchText);
      this.loading = false;
    },
  },
};
</script>

<style lang="css" scoped>
.from-input {
  border: 0.1rem solid black;
  padding-top: 5px;
}
.search-container {
  padding: 32px 16px;
}
</style>
