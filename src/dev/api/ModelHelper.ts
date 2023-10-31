namespace FoundationAPI.ModelHelper {
   export function mapDynamo(x: number, y: number, z: number, id: number, texture: string, isActive: boolean, rotate: number) {
      let render = new ICRender.Model();
      let model = BlockRenderer.createModel();

      if (rotate == 0) { //UP
         model.addBox(0, 0, 0, 1, 0.61, 1, [["dynamo_" + texture, 1], ["dynamo_" + texture, 1], ["dynamo_" + texture, 0], ["dynamo_" + texture, 0], ["dynamo_" + texture, 0]]);
         model.addBox(0.250, 0.62, 0.250, 0.746, 1, 0.746, [["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 0]]);
      } else if (rotate == 1) { //DOWN
         model.addBox(0, 0.39, 0, 1, 1, 1, [["dynamo_" + texture, 1], ["dynamo_" + texture, 1], ["dynamo_" + texture, 2]]);
         model.addBox(0.250, 0, 0.250, 0.746, 0.62, 0.746, [["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 3]]);
      } else if (rotate == 2) { // RIGHT South
         model.addBox(0, 0, 0, 0.625, 1, 1, [["dynamo_" + texture, 3], ["dynamo_" + texture, 3], ["dynamo_" + texture, 3], ["dynamo_" + texture, 3], ["dynamo_" + texture, 1]]);
         model.addBox(0.625, 0.250, 0.250, 1, 0.7, 0.746, [["dynamo_coil_" + isActive, 4], ["dynamo_coil_" + isActive, 4], ["dynamo_coil_" + isActive, 4], ["dynamo_coil_" + isActive, 4], ["dynamo_coil_" + isActive, 1]]);
      } else if (rotate == 3) { // LEFT North
         model.addBox(0.38, 0, 0, 1, 1, 1, [["dynamo_" + texture, 4], ["dynamo_" + texture, 4], ["dynamo_" + texture, 4], ["dynamo_" + texture, 4], ["dynamo_" + texture, 1]]);
         model.addBox(0, 0.250, 0.250, 0.38, 0.7, 0.746, [["dynamo_coil_" + isActive, 5], ["dynamo_coil_" + isActive, 5], ["dynamo_coil_" + isActive, 5], ["dynamo_coil_" + isActive, 5], ["dynamo_coil_" + isActive, 1]]);
      } else if (rotate == 4) { // FRONT East
         model.addBox(0, 0, 0.38, 1, 1, 1, [["dynamo_" + texture, 0], ["dynamo_" + texture, 0], ["dynamo_" + texture, 1], ["dynamo_" + texture, 1], ["dynamo_" + texture, 4]]);
         model.addBox(0.250, 0.250, 0, 0.746, 0.7, 0.40, [["dynamo_coil_" + isActive, 0], ["dynamo_coil_" + isActive, 0], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 5]]);
      } else if (rotate == 5) { // BEHIND West
         model.addBox(0, 0, 0, 1, 1, 0.625, [["dynamo_" + texture, 2], ["dynamo_" + texture, 2], ["dynamo_" + texture, 1], ["dynamo_" + texture, 1], ["dynamo_" + texture, 3]]);
         model.addBox(0.250, 0.250, 0.625, 0.746, 0.7, 1, [["dynamo_coil_" + isActive, 3], ["dynamo_coil_" + isActive, 3], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 1], ["dynamo_coil_" + isActive, 4]]);
      }

      render.addEntry(model);
      BlockRenderer.enableCoordMapping(id, rotate, render);
      BlockRenderer.mapAtCoords(x, y, z, render);
   }
   /**
    * @deprecated
    * Unuse now
    */
   export function mapDynamoStandard(id: string, texture: string) {
      let standardDynamo = new ICRender.Model();
      let model = BlockRenderer.createModel();

      model.addBox(0, 0, 0, 1, 0.61, 1, [["dynamo_" + texture, 1], ["dynamo_" + texture, 1], ["dynamo_" + texture, 0], ["dynamo_" + texture, 0], ["dynamo_" + texture, 0]]);
      model.addBox(0.250, 0.62, 0.250, 0.746, 1, 0.746, [["dynamo_coil_" + "false", 1], ["dynamo_coil_" + "false", 1], ["dynamo_coil_" + "false", 0]]);

      standardDynamo.addEntry(model);
      BlockRenderer.setStaticICRender(BlockID[id], -1, standardDynamo);
   }

}
/*
 * ```js
 * texture: [
 *   ["название1", индекс1], // bottom (Y: -1)
 *   ["название2", индекс2], // top (Y: +1)
 *   ["название3", индекс3], // back (X: -1) West
 *   ["название4", индекс4], // front (X: +1) East
 *   ["название5", индекс5], // left (Z: -1) North
 *   ["название6", индекс6]  // right (Z: +1) South
 * ]
 * ```
  */
// declare enum EBlockSide {
//    DOWN = 0,
//    UP = 1,
//    NORTH = 2,
//    SOUTH = 3,
//    WEST = 4,
//    EAST = 5
// }
