namespace StirlingDynamoManager {

    export let MIN_ENERGY = 1000;

    export function validFuel(input: ItemStack) {
        return getEnergy(input) > 0;
    }

    export function getEnergy(stack: ItemStack) {

        let fuel = ItemFuel.getFuel(stack);
        return fuel != null ? fuel.energy : getEnergyFurnaceFuel(stack);
    }

    export function getEnergyFurnaceFuel(stack: ItemStack) {

        if (stack.isEmpty()) {
            return 0;
        }
        let energy = Recipes.getFuelBurnDuration(stack.id, stack.data) / 4 * Constants.RF_PER_FURNACE_UNIT;
        return energy >= MIN_ENERGY ? energy : 0;
    }
}