IMPORT("BlockEngine");
IMPORT("StorageInterface");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("TileRender");
IMPORT("BackpackAPI");


const FALSE_PREDICATE = () => false;
const MinecraftColor = EColor;
const Color = android.graphics.Color;
const Canvas = android.graphics.Canvas;
const BufferedOutputStream = java.io.BufferedOutputStream;
const FileOutputStream = java.io.FileOutputStream;
const Bitmap = android.graphics.Bitmap;
const File = java.io.File;
const Paint = android.graphics.Paint;

// @ts-nocheck
const RF = EnergyTypeRegistry.assureEnergyType("RF", 1 / 4);
const COLOR_BG = Color.parseColor("#c5c5c5");
const COLOR_GREY = Color.rgb(77, 77, 77);
const POWER_SCALING = [100, 150, 200, 250, 300, 300];
const FONT_GREY = { size: 25, color: COLOR_GREY };
const FONT_GREY_CENTERED = { size: 25, color: COLOR_GREY, align: 1 };
const FONT_RECIPE_VIEWER = { size: 35, align: 1 };

const RF_WIRE_GROUP = ICRender.getGroup("rf-wire");
const BlockSide = EBlockSide;
// let showers: {
//    [key: string]: any
// } = {};

