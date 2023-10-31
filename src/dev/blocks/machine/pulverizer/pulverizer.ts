BlockRegistry.createBlock("thermalMachinePulverizer", [{
    name: "block.thermal.machine_pulverizer",
    texture: [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_pulverizer", 0], ["thermal_machine", 2], ["thermal_machine", 2]],
    inCreative: true
   }], "machine");
 
 TileRenderer.setHandAndUiModel(BlockID.thermalMachinePulverizer, 0, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_pulverizer", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
 TileRenderer.setStandardModelWithRotation(BlockID.thermalMachinePulverizer, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_pulverizer", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
 TileRenderer.registerModelWithRotation(BlockID.thermalMachinePulverizer, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_pulverizer_active", 0], ["thermal_machine", 2], ["thermal_machine", 2]]) // active model
 
 TileRenderer.setRotationFunction(BlockID.thermalMachinePulverizer)
 
 Item.addCreativeGroup("thermal_expansion_machines", Translation.translate("Machines"), [
     BlockID.thermalMachinePulverizer
 ]);
 
 Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: BlockID.thermalMachinePulverizer, count: 1, data: 0 }, [
         " a ",
         "x#x",
         "cbc"
     ], ['#', BlockID.frameMachine, -1, 'x', VanillaItemID.flint, -1, 'a', VanillaBlockID.piston -1, "c", ItemID.gearCopper, -1, 'b', ItemID.rf_coil, -1]);
 });