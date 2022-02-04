<template>
  <div class="container-single">
    <b-link class="button" @click="goBack"> Go Back </b-link>
    <div class="info">
      <div class="img">
        <img
          :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
          :alt="movie.title"
          class="rounded-0"
          v-if="movie.poster_path"
        />
      </div>
      <div class="content">
        <h4>
          <b-link :href="`${movie.homepage}`">{{ movie.original_name }}</b-link>
        </h4>
        <br />
        <p class="info-text">
          <span>Released:</span>
          {{
            new Date(movie.last_air_date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
        <p class="info-text tagline"><span>Tagline:</span> {{ movie.tagline }}</p>
        <p class="info-text"><span>Language:</span> {{ movie.original_language }}</p>
        <p class="info-text">
          <span>Genres:</span>
          <b v-for="genres in movie.genres" v-bind:key="genres.id">
            {{ genres.name }},
          </b>
        </p>

        <p class="info-text"><span>Overview:</span> {{ movie.overview }}</p>
        <p class="info-text"><span>Popularity:</span> {{ movie.popularity }}</p>
        <p class="info-text">
          <span>Production:</span>
          <b v-for="companies in movie.production_companies" v-bind:key="companies.id">
            {{ companies.name }},
          </b>
        </p>

        <p class="info-text">
          <span>Countries: </span>
          <b v-for="countries in movie.production_countries" v-bind:key="countries.id">
            {{ countries.name }},
          </b>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MoviePage",
  layout: "mainLayout",
  data() {
    return {
      title: "",
    };
  },
  head() {
    return {
      title: "Shows",
      meta: [
        {
          hid: "description",
          name: "Shows",
          content: "My custom Shows",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  computed: {
    movie() {
      return this.$store.getters["multi/tvShow"];
    },
  },
  async created() {
    console.log("this.$route.params.id", this.$route.params.id);
    await this.$store.dispatch("multi/setTv", {
      tvId: this.$route.params.id,
    });
  },
});
</script>

<style lang="scss">
.container-single {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: black;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .info-text {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: normal;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
