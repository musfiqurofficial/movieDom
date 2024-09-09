/** --> Movie Object..
 * MovieID : string,
 * Time : string,
 */

import { update_all_watching_item } from "./continue_watching_combination";

//==> GET LOCAL_STORAGE_DATA.

export const MOVIE_STORE = "continue_watching_movie";

export function get_continuous_movies() {
  return JSON.parse(localStorage.getItem(MOVIE_STORE));
}

export function update_continuous_movies(movieData = {}, remaining_time) {
  const previous_continuous_movies = get_continuous_movies();
  // ls_movie_obj
  const ls_movie = movieData;

  if (previous_continuous_movies) {
    if (remaining_time <= 15) {
      const other_continuous_movies = previous_continuous_movies?.filter(
        (item) => item.MovieID !== movieData.MovieID
      );
      localStorage.setItem(
        MOVIE_STORE,
        JSON.stringify(other_continuous_movies)
      );
    } else {
      const wasWatching = previous_continuous_movies.find(
        (item) => item.MovieID === movieData?.MovieID
      );

      if (wasWatching) {
        const update_this_movie = {
          ...wasWatching,
          time: movieData.time,
        };

        const otherMovieList = previous_continuous_movies.filter(
          (item) => item.MovieID !== movieData?.MovieID
        );

        const updated_continuous_movies = [
          update_this_movie,
          ...otherMovieList,
        ];

        localStorage.setItem(
          MOVIE_STORE,
          JSON.stringify(updated_continuous_movies)
        );
      } else {
        const new_continuous_movies = [ls_movie, ...previous_continuous_movies];
        localStorage.setItem(
          MOVIE_STORE,
          JSON.stringify(new_continuous_movies)
        );
      }
    }
  } else {
    localStorage.setItem(MOVIE_STORE, JSON.stringify([ls_movie]));
  }
  update_all_watching_item({ payload: movieData, type: "movie", remaining_time });
}
