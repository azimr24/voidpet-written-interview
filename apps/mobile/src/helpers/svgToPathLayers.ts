import { parse, Node, ElementNode } from "svg-parser";

export const svgToPathLayers = (svgData: string): Array<any> => {
  const parsedSVGData = parse(svgData);
  // fix type error this way
  const svgChildren = parsedSVGData.children[0] as ElementNode;
  const childrenNodes = svgChildren.children as Node[];
  const pathLayers: Array<any> = [];
  for (const childNode of childrenNodes) {
    if (childNode.type !== "element") {
      continue;
    }
    pathLayers.push({
      tagName: childNode.tagName,
      properties: childNode.properties,
    });
  }
  return pathLayers;
};
