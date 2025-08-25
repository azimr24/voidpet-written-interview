import path from "path";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { svgToPathLayers } from "./svgToPathLayers";
import { parse } from "svg-parser";

export const importPets = () => {
  const petPath = path.join(__dirname, "../../assets/svgs/sprites");
  const petSprites = readdirSync(petPath);
  const pathMapLayers: Record<string, Array<any>> = {};
  for (const petSprite of petSprites) {
    const petSpritePath = path.join(petPath, petSprite);
    const petSpriteData = readFileSync(petSpritePath, { encoding: "utf-8" });
    const petSpriteName = petSprite.split(".")[0];
    pathMapLayers[petSpriteName] = svgToPathLayers(petSpriteData);
  }

  writeFileSync(
    path.join(__dirname, "../../sprite_paths/pathMapLayers.ts"),
    `export const pathMapLayers = ${JSON.stringify(pathMapLayers)};
    export const pathRecordLayers: Record<string, Array<any>> = pathMapLayers;`,
  );
};

importPets();
