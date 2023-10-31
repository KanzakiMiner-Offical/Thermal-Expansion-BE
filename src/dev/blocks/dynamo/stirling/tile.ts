namespace FoundationAPI.Machine {
    class StirlingDynamo extends DynamoTile {
        defaultValues = {
            energy: 0,
            burn: 0,
            burnMax: 0,
            rotate: 0
        }
        defaultBasePower = 20; // BASE_PROCESS_TICK
        energyMod = 1;

        canProcessStart(): boolean {
            let fuelSlot = this.container.getSlot("slotSource");
            return StirlingDynamoManager.getEnergy(new ItemStack(fuelSlot.id, fuelSlot.count, fuelSlot.data, fuelSlot.extra)) > 0;
        }

        processStart(): void {
            let fuelSlot = this.container.getSlot("slotSource");
            this.data.burn += this.data.burnMax = Math.round(StirlingDynamoManager.getEnergy(new ItemStack(fuelSlot.id, fuelSlot.count, fuelSlot.data, fuelSlot.extra)) * this.energyMod);
            fuelSlot.count--
            fuelSlot.validate();
            fuelSlot.markDirty();
        }

        getScreenByName(screenName: string, container: ItemContainer): UI.IWindow {
            return stirlingUI;
        }

        @ClientSide
        renderModel(): void {
            let blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
            FoundationAPI.ModelHelper.mapDynamo(this.x, this.y, this.z, blockId, "stirling", this.networkData.getBoolean("active"), this.networkData.getInt("facing"));
        }


    }
    FoundationAPI.MachineRegistry.registerPrototype(BlockID.thermalDynamoStirling, new StirlingDynamo());
}