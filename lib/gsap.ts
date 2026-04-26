"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let pluginRegistered = false;

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const gsapMediaQueries = {
  motionSafe: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)"
} as const;

export function initGSAP() {
  if (!pluginRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });
    ScrollTrigger.config({ ignoreMobileResize: true });
    pluginRegistered = true;
  }
}

export function createGSAPMatchMedia() {
  initGSAP();
  return gsap.matchMedia();
}

export { gsap, ScrollTrigger };
