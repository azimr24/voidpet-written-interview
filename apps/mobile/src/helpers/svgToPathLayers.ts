import { parse, Node, ElementNode } from "svg-parser";
import { PathLayer } from "./types";

export const svgToPathLayers = (svgData: string): PathLayer[] => {
  const parsedSVGData = parse(svgData);
  // fix type error this way
  const svgChildren = parsedSVGData.children[0] as ElementNode;
  const childrenNodes = svgChildren.children as Node[];
  const pathLayers: PathLayer[] = [];
  for (const childNode of childrenNodes) {
    if (
      childNode.type !== "element" ||
      !childNode.tagName ||
      !childNode.properties
    ) {
      continue;
    }
    pathLayers.push({
      tagName: childNode.tagName,
      props: childNode.properties,
    });
  }
  return pathLayers;
};
