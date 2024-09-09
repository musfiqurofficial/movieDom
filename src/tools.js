import { MainServerURL, use_tmdb_image } from "./api/MovieDom.js";

export const _HIT_ORIGIN = window?.location?.origin;

export function scrollToTop() {
  try {
    window.scrollTo(0,0);
  } catch(e) {
    console.warn(e);
  }
}

export function getCleanObj(obj) {
  for (var propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
  return obj;
}

export function getMovieTime(preMnt) {
  if (!preMnt) return;
  let { hours, mnt } = { hours: 0, mnt: 0 };
  if (preMnt >= 60) {
    hours = Math.floor(preMnt / 60);
    mnt = preMnt % 60;
  }
  return `${hours}h ${mnt}m`;
}

export function titleRoute(title) {
  return title.toLowerCase().trim().split(" ").join("-");
}

export function getTMDBimgPath(size = "w185", img) {
  return img ? `https://image.tmdb.org/t/p/${size}/${img}` : `/no-poster.jpg`;
}

export function getLogoPath(id) {
  const path = `${MainServerURL}/Admin/main/images/${id}/logo/${id}.png`;
  return path;
}

export function isArray(array) {
  return Array.isArray(array) && array.length > 0;
}

export function getS0E0(num) {
  if (Number(num) < 10) {
    return `0${Number(num)}`;
  } else {
    return `${num}`;
  }
}

export function getCommonObj(obj) {
  const commonObj = {
    title: obj?.MovieTitle || obj?.TVtitle,
    id: obj?.MovieID || obj?.TVID,
    quality: obj?.MovieQuality || obj?.TVquality,
    category: obj?.MovieCategory || obj?.TVcategory,
    trailer: obj?.MovieTrailer || obj?.TVtrailer,
    rating: obj?.MovieRatings || obj?.TVRatings,
    genre: obj?.MovieGenre || obj?.TVgenre,
    lang: obj?.Movielang || obj?.TVlang,
    homepage: obj?.Moviehomepage || obj?.TVhomepage,
    runtime: obj?.MovieRuntime || obj?.TVruntime,
    story: obj?.MovieStory || obj?.TVstory,
    keywords: obj?.MovieKeywords || obj?.TVkeywords,
    watchLink: obj?.MovieWatchLink || obj?.FileLocation,
    year: obj?.MovieYear || obj?.TVrelease,
    subtitle: obj?.MovieSubtitle || obj?.TVsubtitle,
    actors: obj?.MovieActors || obj?.TVactors,
    poster: obj?.poster || obj?.TVposter,
    filesize: obj?.MovieSize || obj?.TVsize,
    backdrop: obj?.backdrops_Poster || obj?.TVbackdrops,
    uploadTime: obj?.uploadTime || obj?.uploadTime,
  };
  return commonObj;
}

export function getTvCategroyName(text = "") {
  const formated = text.trim().toLowerCase();
  switch (formated) {
    case formated.includes("korian"):
      return "korian";
    case formated.includes("english"):
      return "english";
    case formated.includes("hindi"):
      return "hindi";
    case formated.includes("bangla"):
      return "bangla";
    case formated.includes("arabic"):
      return "arabic";
    default:
      return undefined;
  }
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const str_to_arr = (str = "", split_by = "") => {
  const strArr = str.trim().split(split_by);
  return strArr.length ? strArr : [""];
};

export const getFullHeight = () => window?.screen?.availHeight;

export const getServerImgPath = (id, url, imgFor, type, higher) => {
  if (!url) {
    if (type.includes("poster")) {
      return `${_HIT_ORIGIN}/no-poster-img.jpg`;
    } else {
      return `${_HIT_ORIGIN}/no-poster.jpg`;
    }
  }
  if (use_tmdb_image) {
    const root_path = "https://image.tmdb.org/t/p/w300/";
    const path = `${root_path}/${url}`;
    return path;
  }
  if (!imgFor) {
    console.warn("imgFor is updefined in getServerImgPath()");
  } else {
    if (imgFor.includes("movie")) {
      return `${MainServerURL}/Admin/main/images/${id}/${
        type.includes("poster") ? "poster" : "screen"
      }/${type.includes("poster") ? "" : ""}/${url}`;
    } else if (imgFor.includes("tv")) {
      return `${MainServerURL}/Admin/main/TVseries/${id}/${
        type.includes("poster") ? "poster" : "screen"
      }/${url}`;
    }
  }
};

export function getTruthyObject(obj) {
  let newFilter = {};
  for (let item in obj) {
    if (obj[item]) {
      newFilter[item] = obj[item];
    }
  }
  return newFilter;
}

export function get_tv_logo_path(name) {
  if (name) {
    return `${MainServerURL}/Admin/main/Tv_logo/${name}`;
  } else {
    return `${MainServerURL}/no-logo.jpg`;
  }
}

export function img_path(dataObj, isPoster = false) {
  return getServerImgPath(
    dataObj?.MovieID || dataObj?.TVID,
    isPoster
      ? dataObj?.poster || dataObj?.TVposter
      : dataObj?.backdrops_Poster || dataObj?.TVbackdrops,
    dataObj?.MovieID ? "movie" : "tv",
    isPoster ? "poster" : "screen"
  );
}
