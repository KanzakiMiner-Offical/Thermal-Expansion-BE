namespace FoundationAPI.Machine {
   class RedstoneFurnace extends BaseMachine {
      defaultValues = {
         energy: 0,
         progress: 0,
      }
      defaultBasePower = 20;

      getRecipe(input: ItemInstance): IThermalRecipeNotEnergy {
         if (!input.id) return null
         if (Recipes.getFurnaceRecipeResult(input.id, input.data, "iron")) {
            return {
               input: { id: input.id, count: input.count, data: input.data, extra: null },
               result: Recipes.getFurnaceRecipeResult(input.id, input.data, "iron")
            }
         }
         return null
      }

      setProgressMax(recipe?: any): void {
         this.progressMax = 2000
      }

      getScreenByName(screenName: string, container: ItemContainer): UI.IWindow {
         return furnaceUI
      }

   }
   FoundationAPI.MachineRegistry.registerPrototype(BlockID.thermalMachineFurnace, new RedstoneFurnace());
   FoundationAPI.MachineRegistry.setStoragePlaceFunction("thermalMachineFurnace", true)
}