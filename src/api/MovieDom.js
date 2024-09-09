import axios from "axios";
import bdm_logo from "../BDM.png";
import cinemahall_logo from "../cinemahall.png";
import ctgshow_logo from "../ctgshow.png";
import movies_wala from "../movieswala.png";
import shopnopuri_logo from "../shopnopuri.png";
import tufanonline_logo from "../tufanonline.png";
export { default as logo } from "../netflix.png";

export function isArrayTrue(array) {
  return Array.isArray(array) && array.length > 0;
}

export const _OTHER_LOCATION = [
  {
    appName: "Shopnopuri",
    logo: shopnopuri_logo,
    origin: "http://203.0.113.232/",
    logo_width: "120px",
    disable: true,
  },
  {
    appName: "Tufan Online",
    logo: tufanonline_logo,
    origin: "http://ftp.tufanonline.com.bd/",
    logo_width: "160px",
    disable: false,
  },
  {
    appName: "Best Online",
    logo: "http://movie.bestonlinebroadband.com/static/media/best-online.png",
    origin: "http://movie.bestonlinebroadband.com/",
    logo_width: "120px",
    disable: false,
  },
  {
    appName: "CinemaHall",
    logo: cinemahall_logo,
    origin: "http://cinemahall.net/",
    logo_width: "160px",
    disable: false,
  },
  {
    appName: "CTG Show",
    logo: ctgshow_logo,
    origin: "http://ctgshow.net/",
    logo_width: "80px",
    disable: false,
  },
  {
    appName: "BDM Internet",
    logo: bdm_logo,
    origin: "http://live.bdminternet.com/",
    logo_width: "140px",
    disable: true,
  },
  {
    appName: "Movieswala",
    logo: movies_wala,
    origin: "http://movieswala.net/",
    logo_width: "160px",
    disable: false,
  },
];
const sub_site_origins =
  _OTHER_LOCATION.filter((item) => !item.disable).map((ele) => ele.origin) ||
  [];

// Change Ip here------------------------------------
export const MainServerURL = "http://103.112.150.230/"; //'http://202.4.96.202/'
const other_origins = [
  window.location.origin + "/",
  // MOJALAW
  // 'http://mojalaw.com/',
  // "http://cinemahall.net/"
  // dflix (Dot internet)
  // "http://59.153.100.177/",
  // "http://play.dflix.live/",
  // "https://play.dflix.live/",
  // "https://dflix.live/",
  // "http://dflix.live/",
  // "https://www.dflix.live/",
  // Binodon mela
  // "http://binodonmela.net/","http://www.binodonmela.net/","http://202.4.96.202/"
  // Media Mela
  // "http://mediamela.xyz/",
  // "http://www.mediamela.xyz/",
  // "https://mediamela.xyz/",
  // "https://www.mediamela.xyz/",

  //CINEMAHALLBD
  // "http://www.cinemahallbd.net/",
  // "http://cinemahallbd.net/",
  // "https://cinemahallbd.net/",
  // "https://www.cinemahallbd.net/",

  // "http://103.200.93.146/"
  //AMAR MOVIES
  // "http://103.49.200.26/",
  // "http://amarmovie.natflix.work/",
  // "http://172.16.30.251/",
  //BD CINEMA
  // "http://bdcinema.net/",
  // "http://www.bdcinema.net/",
  // "https://bdcinema.net/",
  // "https://www.bdcinema.net/",

  // --------MFI
  // "http://10.10.10.3/",
  // "http://ftp.mfi.com.bd/",
  // "http://www.ctgshow.net/",
  // "http://movies.fnfonlinebd.com/",
  // "http://reelbox.accessinternet.net/",
  // "http://www.movieswala.net/",
  // "http://59.153.201.80:8234/",
  // "http://203.0.113.234/",
  // "http://59.153.203.202/",
  //---------JHAKKAS
  // "http://vod.nms-bd.com/",
  // "https://vod.nms-bd.com/",
  // "https://www.vod.nms-bd.com/",
  // "http://www.vod.nms-bd.com/",
  // "http://1.2.3.4/",
  // ____TIME NAI
  // "http://103.199.155.150/",
  // "http://timenai.com/",
  // "http://www.timenai.com/",
  // "https://timenai.com/",
  // "https://www.timenai.com/",
];
const dev_origins = ["http://localhost:3000/", "http://localhost:3001/"];
export const domain = "";
export const redirect_to_domain = false; //! important
export const _accessable_addr = [
  MainServerURL,
  ...other_origins,
  ...dev_origins,
  ...sub_site_origins,
  domain,
].filter((e) => !!e);

export const logo_width = "200px";
export const apply_membership = true;
export const basic_slider = false; // show basic slider in home page Banner;
export const card_hover_delay = 600;
export const show_card_bottom_elm = false;
export const light_theme = false;
export const options = {
  has_mobile_app: true,
};
export const use_tmdb_image = false;

export const USE_MOBILE_THEME_ONLY = {
  name: "USE MOBILE THEME ONLY",
  value: false,
};
// Change Ip here------------------------------------
class MovieDom {
  // app name --------------------------------------
  appName = "MovieDom";
  baseUrl = `${MainServerURL}/api/v1`;
  async getGenres(type) {
    const route = `/${type}genre.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then((genre) => (isArrayTrue(genre) ? genre : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getCategories(type) {
    const route = `/${type}category.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then((categories) => (isArrayTrue(categories) ? categories : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getYears(type, params = { category: "all" }) {
    const route = `/${type}yearbycat.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((categories) => (isArrayTrue(categories) ? categories : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getMovies(params) {
    const route = `/movies.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getTVShows(params) {
    const route = `/tvshows.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async updateTotalHit(params = {}) {
    const route = `/insertpageviews.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getItemsByCast(type, name) {
    const route = `/${type}bycast.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: { name: name },
      })
      .then((response) => {
        return response.data;
      })
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getTVEpisodes(params) {
    const route = `/tvepisodes.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getSecret() {
    const route = `/apihandshake.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then(({ secret }) => (secret ? secret : ""))
      .catch((error) => {
        console.warn(error);
        return "";
      });
    return data;
  }
  async searchItems(params) {
    const route = `/search.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return false;
      });
    return data;
  }

  async getMenu(parent) {
    const route = `/menu.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          parent: parent,
        },
      })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getSingleItem(params) {
    const route = `/byid.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getSortedItems(params, type = "") {
    if (!type) {
      console.warn("Type is mission is /getSortedItems()/");
      return;
    } else {
      let route = type.includes("movie") ? `/sorting.php` : "/tvsorting.php";
      const url = `${this.baseUrl}${route}`;
      const data = await axios
        .get(url, { params })
        .then((response) => {
          return response.data;
        })
        .then((results) => {
          return isArrayTrue(results) ? results : [];
        })
        .catch((error) => {
          console.warn(error);
          return [];
        });
      return data;
    }
  }

  async sendRequestData(params) {
    const route = "/insertreq.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        return isArrayTrue(res) ? res : [];
      })
      .catch((err) => {
        console.warn(err);
        return [];
      });
    return data;
  }

  async getThisUserRequest(params) {
    const route = "/fetchreq.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => {
        return response.data;
      })
      .then((results) => {
        return isArrayTrue(results) ? results : [];
      })
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }

  async getLiveTV(params) {
    const route = "/livetv.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => {
        return response.data;
      })
      .then((results) => {
        return isArrayTrue(results) ? results : [];
      })
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }

  async getSoftware(params) {
    const route = "/software.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => {
        return response.data;
      })
      .then((results) => {
        return isArrayTrue(results) ? results : [];
      })
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getGames(params) {
    const route = "/games.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => {
        return response.data;
      })
      .then((results) => {
        return isArrayTrue(results) ? results : [];
      })
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
}
export default new MovieDom();
