// interface IDynamoFuel {
//     getInputItems(): ItemStack[]
//     getInputFluids(): string[]
//     getEnergy(): number

// }

// interface IFuelManager {
//     getFuel(input: ItemStack | string): IDynamoFuel
//     validFuel(input: ItemStack | string): boolean
// }

namespace ItemFuel {
    export type itemFuel = {
        input: ItemStack,
        energy: number
    }
    export let mapFuel: itemFuel[] = []
    let MAX_ENERGY = 20000000;
    let MIN_ENERGY = 1000;

    export function validFuel(input: ItemStack) {
        return getFuel(input) != null;
    }
    export function getFuel(input: ItemStack): itemFuel {
        for (const i in mapFuel) {
            let fuel = mapFuel[i]
            if (fuel.input == input) return fuel
        }
        return;
    }

    export function addFuel(energy: number, inputItems: ItemStack) {

        if (inputItems.isEmpty() || energy <= 0) {
            return null;
        }
        if (energy < MIN_ENERGY || energy > MAX_ENERGY) {
            return null;
        }
        if (inputItems.id) {
            return null;
        }
        mapFuel.push({
            input: inputItems,
            energy: energy
        })
    }

    export function getMinPower() {
        return 10;
    }

    export function getFuelList() {
        let newFuelList = []
        mapFuel.map((fuel) => {
            return newFuelList.push(fuel)
        })
        return newFuelList;
    }
    // endregion
}