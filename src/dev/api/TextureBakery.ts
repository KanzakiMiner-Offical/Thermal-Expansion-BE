namespace TextureBakery {
   export let RES_CRUCIBLE: string = "/res/terrain-atlas/expansion/machines/crucible/machine_crucible_active_";
   export let RES_BOTTLER: string = "/res/terrain-atlas/expansion/machines/bottler/machine_bottler_active_";
   export let OVERLAY_CRUCIBLE: android.graphics.Bitmap = FileTools.ReadImage(__dir__ + "/overlays/crucible.png");
   export let OVERLAY_BOTTLER: android.graphics.Bitmap = FileTools.ReadImage(__dir__ + "/overlays/bottler.png");


   // export function bake() {
   //    let crucibleRecipes = MagmaCrucibleRecipes.recipes;
   //    for (let i in crucibleRecipes) {
   //       let recipe = crucibleRecipes[i];
   //       bakeForMagmaCrucible(recipe.fluid);
   //    }
   // };

   // export function bakeForMagmaCrucible(liquid) {
   //    let file = new File(__dir__ + RES_CRUCIBLE + liquid + ".png");

   //    if (!file.exists()) {
   //       file.createNewFile();

   //       let bitmap = OVERLAY_CRUCIBLE.copy(OVERLAY_CRUCIBLE.getConfig(), true);
   //       let canvas = new Canvas(bitmap);
   //       canvas.drawBitmap(LiquidRegistry.getLiquidUIBitmap(liquid, 4, 8), 6, 4, new Paint(Paint.FILTER_BITMAP_FLAG));

   //       let os = new BufferedOutputStream(new FileOutputStream(file));
   //       bitmap.compress(Bitmap.CompressFormat.PNG, 100, os);
   //       os.close();
   //    }
   // }
}
/*
Callback.addCallback("PreLoaded", function () {
    TextureBakery.bake();
});*/