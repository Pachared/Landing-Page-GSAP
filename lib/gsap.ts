"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let pluginRegistered = false;

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function initGSAP() {
  if (!pluginRegistered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
  }
}

export { gsap, ScrollTrigger };
