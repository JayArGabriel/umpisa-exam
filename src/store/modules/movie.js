import { getMovies } from "@/api/movie"

const state = {
  search: null,
  movies: []
};

const getters = {
  StateSearch: (state) => state.search,
  StateMovies: (state) => state.movies
};

const actions = {
  async GetMovies({commit}, search) {
    let response = await getMovies(search)
    commit("setSearch", search)
    commit("setMovie", response)
  },
};

const mutations = {
  setSearch(state, search) {
    state.search = search
  },
  setMovie(state, movies) {
    state.movies = movies
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
