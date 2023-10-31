const stirlingUI = FoundationAPI.MachineUI.createInventoryWindow("Stirling Dynamo", {
    drawing: [
        { type: "bitmap", x: 366, y: 122, bitmap: "bars.machine.flame_empty", scale: 4.5 },
        { type: "bitmap", x: 70, y: 100, bitmap: "bars.rf_empty", scale: 5 }
    ],

    elements: {
        "energyScale": { type: "scale", x: 70, y: 100, direction: 1, bitmap: "bars.rf_full", scale: 5 },
        "speedScale": { type: "scale", x: 260, y: 122, direction: 1, bitmap: "bars.machine.flame_full", scale: 4.5 },

        "slotSource": { type: "slot", x: 161, y: 122, size: 70 }
    }
})
FoundationAPI.MachineUI.createMachineTabWindow("thermalDynamoStirling", "icons.dynamo.stirling")