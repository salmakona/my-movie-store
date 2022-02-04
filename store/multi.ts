import { ActionTree, GetterTree, MutationTree } from "vuex/types";
import { namespace } from "vuex-class";
import { MultiState } from "./types";
import { API_KEY } from "~/helpers/api.url";

export const state = (): MultiState => ({
  searchText: "",
  results: [],
  movie: {},
  steaming: [],
  title: "",
  movies: [],
  tvs: [],
  peoples: [],
  noResult: false,
});

export const getters: GetterTree<MultiState, MultiState> = {
  search: (state: MultiState): Object => state.results,
  movie: (state: MultiState): Object => state.movie,
  steaming: (state: MultiState): Object => state.steaming,
  title: (state: MultiState): Object => state.title,
  movies: (state: MultiState): Object => state.movies,
  tvs: (state: MultiState): Object => state.tvs,
  peoples: (state: MultiState): Object => state.peoples,
  noResult: (state: MultiState): Object => state.noResult,
};

export const actions: ActionTree<MultiState, MultiState> = {
  async search({ commit, state }, payload) {
    if (!payload) {
      commit("SET_RESULTS", []);
    }
    try {
      const res = await this.$axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${payload}`
      );
      if (res?.data?.results.length > 0) {
        let searchResult: any = [];
        res?.data?.results.forEach((value: any) => {
          switch (value.media_type) {
            case "movie":
              searchResult.push({
                title: value.title,
                image: value.poster_path,
                department: value.media_type,
                popularity: value.popularity,
                release_date: value.release_date,
                vote_average: value.vote_average,
                overview: value.overview,
                original_language: value.original_language,
                id: value.id,
                key: "movie",
              });
              break;
            case "person":
              searchResult.push({
                title: value.name,
                image: value.profile_path,
                department: value.known_for_department,
                popularity: value.popularity,
                known_for: value.known_for,
                key: "person",
              });
              break;
            case "tv":
              searchResult.push({
                title: value.title,
                image: value.poster_path,
                department: value.media_type,
                popularity: value.popularity,
                release_date: value.first_air_date,
                vote_average: value.vote_average,
                origin_country: value.origin_country,
                overview: value.overview,
                original_language: value.original_language,
                key: "tv",
              });
              break;
            default:
              break;
          }
        });
        commit("SET_RESULTS", searchResult);
      } else {
        commit("SET_NO_RESULT", true);
      }
    } catch (err) {
      return err;
    }
  },
  async setMovie({ commit, state }, payload) {
    const res = await this.$axios.get(
      `https://api.themoviedb.org/3/movie/${payload.movieId}?api_key=${API_KEY}`
    );
    commit("SET_TO_MOVIE", res?.data);
  },
  async steamingMovies({ commit, state }) {
    const res = await this.$axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    let steaming: any = [];
    res?.data?.results.forEach((value: any) => {
      steaming.push(value);
    });
    commit("SET_TO_STEAMING", steaming);
  },
  async title({ commit, state }, payload) {
    commit("SET_TITLE", payload);
  },
  async movies({ commit, state }) {
    const res = await this.$axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    let movies: any = [];
    res?.data?.results.forEach((value: any) => {
      movies.push(value);
    });
    commit("SET_TO_MOVIES", movies);
  },
  async tvs({ commit, state }) {
    const res = await this.$axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    let tvs: any = [];
    res?.data?.results.forEach((value: any) => {
      tvs.push(value);
    });
    commit("SET_TO_TVS", tvs);
  },
  async peoples({ commit, state }) {
    const res = await this.$axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`
    );
    let peoples: any = [];
    res?.data?.results.forEach((value: any) => {
      peoples.push(value);
    });
    commit("SET_TO_PEOPLES", peoples);
  },
};

export const mutations: MutationTree<MultiState> = {
  SET_RESULTS(state: MultiState, data) {
    state.results = data;
  },
  SET_TO_MOVIE(state: MultiState, data) {
    state.movie = data;
  },
  SET_TO_STEAMING(state: MultiState, data) {
    state.steaming = data;
  },
  SET_TITLE(state: MultiState, data) {
    state.title = data;
  },
  SET_TO_MOVIES(state: MultiState, data) {
    state.movies = data;
  },
  SET_TO_TVS(state: MultiState, data) {
    state.tvs = data;
  },
  SET_TO_PEOPLES(state: MultiState, data) {
    state.peoples = data;
  },
  SET_NO_RESULT(state: MultiState, data) {
    state.noResult = data;
  },
};

export const multiNamespace = namespace("multi/");
