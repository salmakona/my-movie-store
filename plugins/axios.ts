/***
 * Axios global interceptor
 */
import { Context } from "@nuxt/types";
import Vue from "vue";

export default function({ $axios, store, redirect }: Context) {
  $axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function(error) {
      const code = error.response ? error.response.status : 200;
      return Promise.reject(error);
    }
  );
}
