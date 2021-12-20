import React from "react";
import { styled, config } from "../stitches.config";
import { useSpaceProps, SpaceProps } from "./space";
import type * as Stitches from '@stitches/react'

const BareBox = styled("div", {});

interface Props extends Partial<SpaceProps> {
  children?: React.ReactNode;
  css?: Stitches.CSS<typeof config>;
}

export const Box = ({
  children,
  margin,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  padding,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  css
}: Props) => {
  const spaceProps = useSpaceProps({
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    padding,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
  });
  return <BareBox css={{...spaceProps, ...css}}>{children}</BareBox>;
};
