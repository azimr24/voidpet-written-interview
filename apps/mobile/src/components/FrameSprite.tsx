import React from "react";
import { pathRecordLayers } from "../../sprite_paths/pathMapLayers";
import { PathLayerToSVGPrim } from "./SVGPrims";
import Svg from "react-native-svg";

type FrameSpriteProps = {
  frame: string;
};

export const FrameSprite = ({ frame }: FrameSpriteProps) => {
  const framePathLayers = pathRecordLayers[frame];
  return (
    <Svg width="100%" height="100%" viewBox="0 0 200 200">
      {framePathLayers.map((layer, index) => (
        <PathLayerToSVGPrim key={index} {...layer} />
      ))}
    </Svg>
  );
};
