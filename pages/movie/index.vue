<template>
  <div class="steaming-container">
    <div class="container movies">
      <h1 class="h1">Popular Movies</h1>
      <div id="movie-grid" class="movies-grid">
        <div class="movie" v-for="(movie, index) in movies" :key="index">
          <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <b-link class="title" @click="toMovie(movie)">
              {{ movie.title.slice(0, 20)
              }}<span v-if="movie.title.length > 15">...</span>
            </b-link>
            <p class="release">
              {{
                new Date(movie.release_date).toLocaleString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }}
            </p>
            <span class="overview">{{ movie.overview.slice(0, 100) }}</span>
            <br />
            <b-link class="button button-light" @click="toMovie(movie)">
              Read more
            </b-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "MovieHomePage",
  layout: "mainLayout",

  data() {
    return {};
  },
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
  methods: {
    async toMovie(value) {
      const movieId = value.id;
      await this.$router.push("/movie/" + movieId);
    },
  },
  computed: {
    movies() {
      return this.$store.getters["multi/movies"];
    },
  },
  created() {
    this.$store.dispatch("multi/movies");
  }
});
</script>
<style lang="scss">
.steaming-container {
  .h1 {
    text-align: center;
  }
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

  .search {
    display: flex;
    padding: 32px 16px;

    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .movies {
    padding: 32px 16px;
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
            height: 100%;
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
}
</style>
