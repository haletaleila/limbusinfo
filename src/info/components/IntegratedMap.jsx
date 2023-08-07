import { ColorMap } from "./ColorMap";
import { ImageMap } from "./ImageMap";
import { ToolTipMap } from "./ToolTipMap";

export const IntegratedMap = {};

for (let key of [
  ...Object.keys(ColorMap),
  ...Object.keys(ImageMap),
  ...Object.keys(ToolTipMap),
]) {
  IntegratedMap[key] = {
    color: ColorMap[key],
    image: ImageMap[key],
    tooltip: ToolTipMap[key],
  };
}
