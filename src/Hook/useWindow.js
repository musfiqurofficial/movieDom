import { useEffect } from "react";
import { useState } from "react";

const getWindowInnerWidth = () => {
  let innerWidth = window?.innerWidth;
  return innerWidth < 770 ? true : false;
};

const getDeviceType = () => {
  const ua = navigator?.userAgent;
  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
    getWindowInnerWidth()
  ) {
    return true;
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    ) ||
    getWindowInnerWidth()
  ) {
    return true;
  }
  return false;
};

function useWindow() {
  const [notScrolled, setNotScrolled] = useState(true);
  const [muted, setMuted] = useState(true);
  const [playBanner, setPlayBanner] = useState(true);
  const [notDesktop, setNotDesktop] = useState(getDeviceType());
  const [watching_popup, setWatchingPopup] = useState({ id: "", show: false });
  const handleToggleMuted = () => setMuted((pre) => !pre);
  const handlePlayBanner = (state) =>
    setPlayBanner(state && notScrolled && !watching_popup.show);
  const handleNotScrolled = (state) => setNotScrolled(state);
  const handleWatchingPopup = (state) => setWatchingPopup(state);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const screen_height = 300;
      const scroll_height = window?.scrollY;
      setNotScrolled(screen_height > scroll_height);
    });
    window.addEventListener("resize", () => {
      setNotDesktop(getDeviceType());
    });
  }, []);

  return {
    notScrolled,
    muted,
    playBanner,
    notDesktop,
    watching_popup,
    handleToggleMuted,
    handleNotScrolled,
    handlePlayBanner,
    handleWatchingPopup,
  };
}
export default useWindow;
