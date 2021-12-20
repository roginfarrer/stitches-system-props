import type * as Stitches from "@stitches/react";
import { config } from "../stitches.config";

type Config = typeof config;
type CSS = Stitches.CSS<typeof config>;

type Media = keyof typeof config.media;
type AtMedia = `@${Media}`;
type ResponsiveObject<T> = Partial<Record<"@initial" | AtMedia, T>>;
type PropertyValuesOf<T extends keyof Stitches.CSSProperties> =
  Stitches.PropertyValue<T, Config>;

export function createSystemProp(
  propName: keyof Stitches.CSSProperties,
  propValue: unknown
): CSS {
  if (!propValue) {
    return {};
  }
  // Value is a string or number, ie not responsive
  if (typeof propValue === "string" || typeof propValue === "number") {
    return { [propName]: propValue };
  }

  const bps = propValue as ResponsiveObject<string | number>;

  // If no entries, exit gracefully
  if (bps && Object.keys(bps).length < 1) {
    return {};
  }

  const { "@initial": initial, ...breakpoints } = bps;

  const mediaQueries = Object.entries(breakpoints).reduce(
    (acc: CSS, [bp, value]) => {
      const m = bp.slice(1) as Media
      acc[`@media ${config.media[m]}`] = {
        [propName]: value,
      };
      return acc;
    },
    {}
  );



  return {
    [propName]: initial,
    ...mediaQueries,
  };
}

export type SystemProp<Property extends keyof Stitches.CSSProperties> =
  | PropertyValuesOf<Property>
  | ResponsiveObject<PropertyValuesOf<Property>>;
