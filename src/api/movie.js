import request from "@/utils/request";

const api = {
  movies: (data) => `/search/shows?q=${data}`,
};

export function getMovies(data) {
  return request({
    url: api.movies(data),
    method: "get",
  });
}
