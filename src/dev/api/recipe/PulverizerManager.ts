namespace PulverizerManager {
    export interface IPulverizeraRecipe extends IThermalRecipe {
        ignore_catalyst?: boolean
    }
    export let recipes: IPulverizeraRecipe[] = [];

    export function add(recipe: IPulverizeraRecipe) {
        if (!recipe)
            return;

        let input = recipe.input;
        if (!input || !input.id)
            return;

        input.data = input.data || 0;
        input.count = input.count || 1;
        recipe.energy = recipe.energy || 2000;
        if (typeof recipe.ignore_catalyst == null) recipe.ignore_catalyst = false
        let second = recipe.second;
        if (second && !second.chance) {
            second.chance = 1;// 100%
        }

        recipes.push(recipe)
    }

    export function getRecipeByItem(item: ItemInstance): IPulverizeraRecipe {
        if (!item.id)
            return null;

        for (const i in recipes) {
            let recipe = recipes[i];
            if (item.id == recipe.input.id && item.data == recipe.input.data && item.count >= recipe.input.count) {
                return recipe
            }
        } return null;
    }

    //

    export type CatalystData = {
        primary: number
        secondary: number
        energy: number
        usage: number
    }
    export let ThermalCatalystData: { [key: number]: CatalystData }
    export function addCatalyst(id: number | string, value: CatalystData) {
        if (typeof id == "string") {
            id = VanillaItemID[id] ? VanillaItemID[id] : ItemID[id] as number
        }
        ThermalCatalystData[id] = value
    }

    export function getCatalyst(id: number) {
        return ThermalCatalystData[id]
    }
}