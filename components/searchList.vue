<template>
  <div class="container-movies" v-if="loading">
    <div v-if="items.length > 0">
      <h1 class="h1">{{ title }}</h1>
      <div class="movies-grid">
        <div class="movie" v-for="item in items" v-bind:key="item.id">
          <div class="movie-img">
            <img
              v-if="item.image"
              :src="`https://image.tmdb.org/t/p/w500/${item.image}`"
              alt="item.title"
            />
            <img v-else src="~static/header-img.jpg" alt="item.title" class="dummy-img" />

            <p class="review" :v-if="item.key == 'movie' && 'tv'">
              {{ item.vote_average }}
            </p>
            <p class="review" :v-if="item.key == 'person'">
              {{ item.popularity }}
            </p>
            <p class="overview" :v-if="item.key == 'movie' && 'tv'">
              {{ item.overview }}
            </p>
          </div>
          <div class="info">
            <p class="title">
              <span>{{ item.title }}</span>
            </p>
            <span class="department">{{ item.department }}</span>
            <b-link
              class="button button-light"
              :v-if="item.key == 'person'"
              v-for="known_for in item.known_for"
              v-bind:key="known_for.id"
            >
              <span @click="tomovie(known_for)">
                {{ known_for.original_title }}
              </span>
            </b-link>
            <br />
            <b-link
              class="button button-light"
              :v-if="item.key == 'movie'"
              @click="tomovie(item)"
            >
              Read more
            </b-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="items.length==0 && noResult">
      <h1 class="h1">No results found</h1>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AppLoading from "./Helper/AppLoading.vue";
export default {
  components: { AppLoading },
  props: {
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.getters["multi/search"];
    },
    title() {
      return this.$store.getters["multi/title"];
    },
    noResult() {
      return this.$store.getters["multi/noResult"];
    },
  },
  methods: {
    async tomovie(value) {
      const movieId = value.id;
      await this.$router.push("/movie/" + movieId);
    },
  },
  created() {
    this.items;
  },
  mounted() {},
};
</script>

<style lang="scss">
.container-movies {
  padding: 32px 16px;
  .h1 {
    text-align: center;
  }
  .movies-grid {
    display: grid;
    column-gap: 32px;
    row-gap: 64px;
    grid-template-columns: 1fr;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 750px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1100px) {
      grid-template-columns: repeat(4, 1fr);
    }
    .movie {
      position: relative;
      display: flex;
      flex-direction: column;

      .movie-img {
        position: relative;
        overflow: hidden;

        &:hover {
          .overview {
            transform: translateY(0);
          }
        }

        img {
          display: block;
          width: 100%;
          height: 350px !important;
        }
        .dummy-img {
          height: 350px !important;
          display: block;
          width: 100%;
        }

        .review {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: black;
          color: red;
          border-radius: 0 0 16px 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .overview {
          line-height: 1.5;
          position: absolute;
          bottom: 0;
          background-color: rgba(201, 38, 2, 0.9);
          padding: 12px;
          color: black;
          transform: translateY(100%);
          transition: 0.3s ease-in-out all;
        }
      }
      .department {
        text-transform: uppercase;
      }

      .info {
        margin-top: auto;
        .title {
          margin-top: 8px;
          color: black;
          font-size: 20px;
        }

        .release {
          margin-top: 8px;
          color: black;
        }

        .button {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
