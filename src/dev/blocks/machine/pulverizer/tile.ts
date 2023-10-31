namespace FoundationAPI.Machine {
    class Pulverizer extends BaseMachine {
        defaultValues = {
            energy: 0,
            progress: 0
        }
        defaultBasePower = 20;

        setupContainer(): void {
            StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
                if (name.startsWith("slotSource")) return !!PulverizerManager.getRecipeByItem(new ItemStack(id, amount, data))
                if (name == "slotEnergy") return ChargeItemRegistry.isValidStorage(id, "Rf", 5);
                if (name.startsWith("slotAugment")) return FoundationAPI.AugmentsAPI.isValidUpgrade(id, this)
                return false;
            });
        }

        // getRecipe(id: number, data: number, count: number): IThermalRecipe | IThermalRecipeNotEnergy {
        //     return PulverizerManager.getRecipeByItem(new ItemStack(id, count, data))
        // };
        getRecipe(input: ItemInstance): PulverizerManager.IPulverizeraRecipe {
            return PulverizerManager.getRecipeByItem(new ItemStack(input))
        }
        resolveOutputs(recipe: PulverizerManager.IPulverizeraRecipe): void {
            for (let i = 1; i <= 4; i++) {
                let slot = this.container.getSlot("slotResult" + i);
                ContainerHelper.putInSlot(recipe.result, slot);
                if (recipe.second) {
                    ContainerHelper.putInSlot(recipe.second, slot);
                }
            }
            return;
        }
        validateOutputs(recipe: PulverizerManager.IPulverizeraRecipe): boolean {
            for (let i = 1; i <= 4; i++) {
                let slot = this.container.getSlot("slotResult" + i);
                if (!slot.id) {
                    return true;
                }
                if (ContainerHelper.canPutInSlot(recipe.result, slot)) {
                    return true;
                }
                if (ContainerHelper.canPutInSlot(recipe.second, slot)) {
                    return true;
                }
            }
            return false
        }
        // resolveOutputs(): void {
        //     let recipe = this.curRecipe;
        //     for (let i = 1; i <= 4; i++) {
        //         let slot = this.container.getSlot("slotResult" + i);
        //         ContainerHelper.putInSlot(recipe.result, slot);
        //         if (recipe.second) {
        //             ContainerHelper.putInSlot(recipe.second, slot);
        //         }
        //     }
        //     return;
        // }
        // validateOutputs(): boolean {
        //     for (let i = 1; i <= 4; i++) {
        //         let slot = this.container.getSlot("slotResult" + i);
        //         if (!slot.id) {
        //             return true;
        //         }
        //         if (ContainerHelper.canPutInSlot(this.curRecipe.result, slot)) {
        //             return true;
        //         }
        //         if (ContainerHelper.canPutInSlot(this.curRecipe.second, slot)) {
        //             return true;
        //         }
        //     }
        //     return false
        // }

        getScreenByName(screenName: string, container: ItemContainer): UI.IWindow {
            return pulverizerUI
        }

    }
    FoundationAPI.MachineRegistry.registerPrototype(BlockID.thermalMachinePulverizer, new Pulverizer());
    FoundationAPI.MachineRegistry.setStoragePlaceFunction("thermalMachinePulverizer", true)
}