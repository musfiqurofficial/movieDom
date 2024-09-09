import { MainServerURL } from "../api/MovieDom";
import { getS0E0 } from "../tools";

export function getThumbnail(type, itemid, filename, highres = false) {
  if (type === "movie") {
    return `${MainServerURL}/Admin/main/images/${itemid}/${itemid}.json`;
  }
  if (type === "tv") {
    return `${MainServerURL}/Admin/main/TVseries/${itemid}/screen/${filename}`;
  }
}

export function getEpisodImg(id,season,episode,imgPath){
  if(imgPath)
    return `${MainServerURL}/Admin/main/TVseries/${id}/${getS0E0(season)}/${getS0E0(episode)}/${imgPath}`;
  else 
    return `/no-poster.jpg`;
}

export function getPoster(type, itemid, filename, highres = false) {
  if (type === "movie") {
    return `${MainServerURL}/Admin/main/images/${itemid}/screen/${
      highres ? "original/" : ""
    }${filename}`;
  }
  if (type === "tv") {
    return `${MainServerURL}/Admin/main/TVseries/${itemid}/screen/${filename}`;
  }
}
