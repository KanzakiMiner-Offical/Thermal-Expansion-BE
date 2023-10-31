interface ItemInstanceWithChance extends ItemInstance {
   chance: number
}

interface IThermalRecipeNotEnergy {
   input: ItemInstance,
   result: ItemInstance,

}

interface IThermalRecipe extends IThermalRecipeNotEnergy {
   energy: number,
   second ? : ItemInstanceWithChance
}