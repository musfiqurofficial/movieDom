/** --> Movie Object..
 * TVID : string,
 * list: [
    {
        
    }
],
 */

import { update_all_watching_item } from "./continue_watching_combination";

//==> GET LOCAL_STORAGE_DATA.

const TV_SERIES_STORE = "continue_watching_tv_show";

export function get_continuous_tv_series() {
  return JSON.parse(localStorage.getItem(TV_SERIES_STORE));
}

export function update_continuous_tv_show(tv_show_all_data = {}, time) {
  /**
   {
     active_item:{},
     tv_episodes:[{},{}],
     tvShow:{}
   } 
   */

  const previous_continuous_tv_show = get_continuous_tv_series();

  const tv_show_episode = {
    epiId: tv_show_all_data?.activeItem?.epiId,
    s: tv_show_all_data?.activeItem?.s,
    e: tv_show_all_data?.activeItem?.e,
    time: time,
  };

  // ls_movie_obj
  const ls_tv_show = {
    TVID: tv_show_all_data?.tvShow?.TVID,
    tv_show: tv_show_all_data?.tvShow,
    list: [tv_show_episode],
  };

  if (previous_continuous_tv_show) {
    const watching_tv_show = previous_continuous_tv_show.find(
      (item) => item.TVID === tv_show_all_data?.tvShow?.TVID
    );

    const watching_tv_episode = watching_tv_show?.list?.find(
      (item) => item?.epiId === tv_show_all_data?.activeItem?.epiId
    );

    const other_episodes = watching_tv_show?.list?.filter(
      (item) => item?.epiId !== tv_show_all_data?.activeItem?.epiId
    );

    if (watching_tv_show) {
      if (watching_tv_episode) {
        const updated_tv_show = {
          ...watching_tv_show,
          list: [
            {
              ...watching_tv_episode,
              time: time >= 99.9 ? 0 : time,
            },
            ...other_episodes,
          ],
        };

        const other_wathcing_tv_show = previous_continuous_tv_show.filter(
          (item) => item.TVID !== tv_show_all_data?.tvShow?.TVID
        );

        const new_watching_tv_show = [
          updated_tv_show,
          ...other_wathcing_tv_show,
        ];

        localStorage.setItem(
          TV_SERIES_STORE,
          JSON.stringify(new_watching_tv_show)
        );
      } else {
        const updated_tv_show = {
          ...watching_tv_show,
          list: [tv_show_episode, ...watching_tv_show?.list],
        };

        const other_wathcing_tv_show = previous_continuous_tv_show.filter(
          (item) => item.TVID !== tv_show_all_data?.tvShow?.TVID
        );

        const new_watching_tv_show = [
          updated_tv_show,
          ...other_wathcing_tv_show,
        ];

        localStorage.setItem(
          TV_SERIES_STORE,
          JSON.stringify(new_watching_tv_show)
        );
      }
    } else {
      const new_continuous_movies = [
        ls_tv_show,
        ...previous_continuous_tv_show,
      ];
      localStorage.setItem(
        TV_SERIES_STORE,
        JSON.stringify(new_continuous_movies)
      );
    }
  } else {
    localStorage.setItem(TV_SERIES_STORE, JSON.stringify([ls_tv_show]));
  }
  const tv_watching_list = get_continuous_tv_series();
  update_all_watching_item(
    {
      payload: tv_watching_list[0],
      type: "tv",
    });
}
