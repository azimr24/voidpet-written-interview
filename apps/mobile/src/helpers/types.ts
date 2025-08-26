import type { CircleProps, EllipseProps, PathProps } from "react-native-svg";

export type PathLayer = {
  tagName: string;
  props: CircleProps | EllipseProps | PathProps;
};
