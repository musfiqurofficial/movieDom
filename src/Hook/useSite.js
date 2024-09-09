import { useEffect, useState } from "react";
import MovieDom, {
  MainServerURL,
  _OTHER_LOCATION,
  _accessable_addr,
  domain,
  logo_width
} from "../api/MovieDom";
import { _HIT_ORIGIN } from "../tools";

const _default_site = {
  appName: MovieDom.appName,
  ip: MainServerURL,
  domain,
  logo:'/logo.png',
  logo_width,
};
export default function useSite() {
  const [site, setSite] = useState(_default_site);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (_OTHER_LOCATION.length !== 0 || _OTHER_LOCATION) {
      for (let item of _accessable_addr) {
        if (item?.includes(_HIT_ORIGIN)) {
          setBlocked(false);
          break;
        }
        setBlocked(true);
      }
      for (let _other of _OTHER_LOCATION) {
        if (
          _other?.ip?.includes(_HIT_ORIGIN) ||
          _other?.origin?.includes(_HIT_ORIGIN)
        ) {
          setSite(_other);
        }
      }
    }
  }, []);

  return {...site,blocked};
}
