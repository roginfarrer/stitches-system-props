import { createSystemProp, SystemProp } from "./createSystemProp";
import type * as Stitches from "@stitches/react";
import { config } from "../stitches.config";

type SPACE_PROP_NAMES =
  | "margin"
  | "marginTop"
  | "marginLeft"
  | "marginRight"
  | "marginBottom"
  | "padding"
  | "paddingTop"
  | "paddingLeft"
  | "paddingRight"
  | "paddingBottom";

// enum SPACEPROPS {
//   "margin",
//   "marginTop",
//   "marginLeft",
//   "marginRight",
//   "marginBottom",
//   "padding",
//   "paddingTop",
//   "paddingLeft",
//   "paddingRight",
//   "paddingBottom",
// }

// type SpaceProps = {
//   [k in keyof Stitches.CSSProperties]: SPACE_PROP_NAMES[k] extends k ? k : never;
// };

// enum SPACEPROPS {
//   "margin",
//   "marginTop",
//   "marginLeft",
//   "marginRight",
//   "marginBottom",
//   "padding",
//   "paddingTop",
//   "paddingLeft",
//   "paddingRight",
//   "paddingBottom",
// }

export function useSpaceProps(
  obj: Required<Record<SPACE_PROP_NAMES, unknown>>
) {
  let result = {};
  for (const prop in obj) {
    const p = prop as string & keyof Stitches.CSSProperties
    result = {
      ...result,
      // @ts-ignore
      ...createSystemProp(p, obj[prop]),
    };
  }
  return result;
}

export type SpaceProps = {
  [k in SPACE_PROP_NAMES]: SystemProp<k>
}
