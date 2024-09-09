import { get_continuous_movies } from "./Api/continue_watching_movie";
import { get_continuous_tv_series } from "./Api/continue_watching_tv_show";

export function currentTime(ref) {
  return new Date(ref.current.getCurrentTime() * 1000).getTime();
}
export function duration(ref) {
  return new Date(ref.current.getDuration() * 1000).getTime();
}

export function playBarPercentage(ref) {
  return (currentTime(ref) / duration(ref)) * 100;
}

export function getDuration(ref) {
  const duration = ref.current.getDuration() * 1000;
  if (duration) {
    return new Date(duration).toISOString().substr(11, 8);
  } else {
    return;
  }
}

export function getCurrentTime(ref) {
  return new Date(ref.current.getCurrentTime() * 1000)
    .toISOString()
    .substr(11, 8);
}

export function getremainingTime(ref) {
  const timer = ref?.current?.getDuration() - ref?.current?.getCurrentTime();
  if (timer) {
    return new Date(timer * 1000)?.toISOString()?.substr(11, 8);
  } else {
    return;
  }
}

// Forward--
export function playerForward(ref) {
  const currentTime = ref.current.getCurrentTime();
  ref && ref?.current?.seekTo(currentTime + 10);
}
// Backward--
export function playerBackward(ref) {
  const currentTime = ref?.current?.getCurrentTime();
  ref && ref?.current?.seekTo(currentTime - 10);
}

export function setCurrentTime(ref, time) {
  if (ref && time) {
    ref?.current?.seekTo(time / 100);
  } else {
    console.warn(`'setCurrentTime(ref,time)' needs both params.`);
  }
}
// SetCurrentTime--
export function setPlayTime(ref, barParcent = 0) {
  const duration = ref?.current?.getDuration();
  const seekingTime = duration * (barParcent / 100);
  ref && ref?.current?.seekTo(seekingTime);
}

// get common obj
export function playerCommonObj(data) {
  return {
    id: data?.MovieID || data?.TVID,
    title: data?.MovieTitle || data?.name,
    story: data?.MovieStory || data?.overview,
    video: data?.MovieWatchLink || data?.watchlink,
    subtitle: data?.MovieSubtitle || data?.subtitle,
    backdrop: data?.backdrops_Poster || data?.still_path,
    e: 0 || data?.episode_number,
    s: 0 || data?.season_number,
    epiId: data?.EPIID || null,
  };
}

export function continueWatching({ playerData, updateCurrentTime }) {
  let timer;

  if (timer) {
    clearTimeout(timer);
  }

  timer = () => {
    if (playerData.isMovie) {
      const watching_movie = get_continuous_movies();
      const this_watching_movie = watching_movie?.find(
        (item) => item.MovieID === playerData?.activeItem?.id
      );
      this_watching_movie
        ? updateCurrentTime(this_watching_movie?.time)
        : updateCurrentTime(0);
    } else {
      const watching_tv_shows = get_continuous_tv_series();
      const this_watching_tv_show = watching_tv_shows?.find(
        (item) => item?.TVID === playerData?.tvShow?.TVID
      );
      if (this_watching_tv_show) {
        const this_epi = this_watching_tv_show?.list?.find(
          (item) => item?.epiId === playerData?.activeItem?.epiId
        );
        this_epi ? updateCurrentTime(this_epi?.time) : updateCurrentTime(0);
      }
    }
  };
  setTimeout(timer, 0);
}

export function updateEpiTimeByEPIID({ TVID, epiId }, updateCurrentTime) {
  const all_watching_tv_series = get_continuous_tv_series();
  const this_tv_series = all_watching_tv_series?.find(
    (item) => item.TVID === TVID
  );
  const this_epi = this_tv_series?.list?.find((item) => item.epiId === epiId);
  updateCurrentTime(this_epi ? this_epi.time : 0);
}
