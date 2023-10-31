BlockRegistry.createBlock("thermalDynamoStirling", [{
    name: "block.thermal.machine_furnace",
    texture: [["dynamo_stirling", 1], ["dynamo_stirling", 1], ["dynamo_stirling", 0], ["dynamo_stirling", 0], ["dynamo_stirling", 0], ["dynamo_stirling", 0]],
    inCreative: true
}], "machine");

// TileRenderer.setHandAndUiModel(BlockID.thermalDynamoStirling, 0, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
// TileRenderer.setStandardModelWithRotation(BlockID.thermalDynamoStirling, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace", 0], ["thermal_machine", 2], ["thermal_machine", 2]])
// TileRenderer.registerModelWithRotation(BlockID.thermalDynamoStirling, 2, [["thermal_machine", 0], ["thermal_machine", 1], ["thermal_machine", 2], ["thermal_machine_furnace_active", 0], ["thermal_machine", 2], ["thermal_machine", 2]]) // active model

// TileRenderer.setRotationFunction(BlockID.thermalDynamoStirling)
// FoundationAPI.ModelHelper.mapDynamoStandard("thermalDynamoStirling", "stirling");

Callback.addCallback("PreLoaded", function () {
    Recipes.addShaped({id: BlockID.thermalDynamoStirling, count: 1, data: 0}, [
        " c ",
        "igi",
        "yxy"
    ], ["i", VanillaItemID.iron_ingot, -1, "g", ItemID.gearIron, -1, "y", VanillaBlockID.stone, -1, "c", ItemID.rf_coil, -1, "x", VanillaItemID.redstone, -1]);
});