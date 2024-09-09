import axios from "axios";
import { useEffect, useState } from "react";
import { _HIT_ORIGIN } from "../tools";

const usePublicMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    axios
      .get(`${_HIT_ORIGIN}/menu.json?timestamp=${new Date().getTime()}`)
      .then((dt) => {setMenu(dt.data)})
      .catch((err) =>console.warn(err.message));
  }, []);
  return menu;
};

export default usePublicMenu;
