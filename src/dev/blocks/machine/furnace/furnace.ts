BlockRegistry.createBlock("thermalMachineFurnace", [{
   name: "block.thermal.machine_furnace",
   texture: [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace", 0], ["thermal_machine", 2], ["thermal_machine", 2]],
   inCreative: true
  }], "machine");

TileRenderer.setHandAndUiModel(BlockID.thermalMachineFurnace, 0, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
TileRenderer.setStandardModelWithRotation(BlockID.thermalMachineFurnace, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
TileRenderer.registerModelWithRotation(BlockID.thermalMachineFurnace, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace_active", 0], ["thermal_machine", 2], ["thermal_machine", 2]]) // active model

TileRenderer.setRotationFunction(BlockID.thermalMachineFurnace)

Item.addCreativeGroup("thermal_expansion_machines", Translation.translate("Machines"), [
    BlockID.thermalMachineFurnace
]);

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.thermalMachineFurnace, count: 1, data: 0 }, [
        " a ",
        "x#x",
        "cbc"
    ], ['#', BlockID.frameMachine, -1, 'x', 45, -1, 'a', 331, -1, "c", ItemID.gearCopper, -1, 'b', ItemID.rf_coil, -1]);
});