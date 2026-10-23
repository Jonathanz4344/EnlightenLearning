import { useSyncExternalStore } from "react";

// True when motion may play. It is false for anyone who asks the operating
// system for reduced motion, and for anyone who turned the site's own
// "stop animations" setting on (data-motion="off" on the html element).
//
// Before the component has mounted (and on a server) the hook reports "ok"
// so the first client render matches whatever markup came before it. The
// real value is read synchronously on the client, so nothing ever flashes
// or stays hidden.

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => {
    media.removeEventListener("change", callback);
    observer.disconnect();
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia(QUERY).matches) return false;
  return document.documentElement.getAttribute("data-motion") !== "off";
}

function getServerSnapshot() {
  return true;
}

export default function useMotionOk() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Switch the site's own motion setting. Stored per browser.
export function setMotionSetting(on) {
  try {
    if (on) localStorage.removeItem("el-motion");
    else localStorage.setItem("el-motion", "off");
  } catch {
    /* storage may be blocked */
  }
  if (on) document.documentElement.removeAttribute("data-motion");
  else document.documentElement.setAttribute("data-motion", "off");
}
