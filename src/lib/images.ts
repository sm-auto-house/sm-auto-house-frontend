/**
 * Every id below was verified to resolve on Unsplash's CDN before being used.
 * `img()` keeps the crop/format params in one place so cards stay consistent.
 */
const BASE = "https://images.unsplash.com/photo-";

type Crop = { w: number; h: number };

export function img(id: string, { w, h }: Crop) {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const photo = {
  // Cinematic vehicles
  redMuscleHangar: "1626668893632-6f3a4466d22f",
  yellowCoupeShowroom: "1568844293986-8d0400bd4745",
  blackCoupeIndustrial: "1607603750909-408e193868c7",
  blueSupercarDark: "1580654712603-eb43273aff33",
  darkGarageLineup: "1492144534655-ae79c964c9d7",
  blackMuscleFront: "1494976388531-d1058494cdd8",
  redSportsNight: "1517672651691-24622a91b550",
  openRoadSunset: "1568605117036-5fe5e7bab0b7",
  motorcycleRoad: "1558981806-ec527fa84c39",

  // Components & workshop
  engineBelts: "1486262715619-67b85e0b08d3",
  engineBayRed: "1606577924006-27d39b132ae2",
  wrenchingEngine: "1619642751034-765dfdf7c58e",
  mechanicToolbox: "1487754180451-c456f719a1fc",
  mechanicCloseUp: "1615906655593-ad0386982a0f",
  mechanicHoodOpen: "1625047509252-ab38fb5c7343",
  precisionTool: "1558618666-fcd25c85cd64",
  wiringLoom: "1599256872237-5dcc0fbe9668",
  circuitBoard: "1581092918056-0c4c3acd3789",
  tyreStack: "1578844251758-2f71da64c96f",
  frontEndDetail: "1550355291-bbee04a92027",

  // Facility & care
  partsShopShelves: "1530046339160-ce3e530c7d2f",
  warehouseAisles: "1553413077-190dd305871c",
  assemblyLine: "1567789884554-0b844b597180",
  foamWash: "1607860108855-64acf2078ed9",
  waterSprayDetail: "1520340356584-f9917d1eea6f",
  evCharging: "1593941707882-a5bba14938c7",

  // People
  avatarA: "1507003211169-0a1dd7228f2d",
  avatarB: "1494790108377-be9c29b29330",
  avatarC: "1500648767791-00dcc994a43e",
  avatarD: "1438761681033-6461ffad8d80",
} as const;
