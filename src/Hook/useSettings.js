import { useState, useEffect } from "react";
import axios from "axios";
import { _HIT_ORIGIN } from "../tools";

const useSettings = () => {
  const [settings, setSettings] = useState();
  useEffect(() => {
    axios
      .get(`${_HIT_ORIGIN}/settings.json?timestamp=${new Date().getTime()}`)
      .then((dt) => { setSettings(dt.data) })
      .catch((err) => console.warn(err.message));
  }, []);
  return settings;
};

export default useSettings;
