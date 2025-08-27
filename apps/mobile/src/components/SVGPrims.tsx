import Svg, { Path, Circle, Ellipse } from "react-native-svg";
import { PathLayer } from "../utils/types";

export const PathLayerToSVGPrim = (layer: PathLayer) => {
  const { tagName, props } = layer;
  switch (tagName) {
    case "circle":
      return <Circle {...props} />;
    case "ellipse":
      return <Ellipse {...props} />;
    case "path":
      return <Path {...props} />;
    default:
      return null;
  }
};
