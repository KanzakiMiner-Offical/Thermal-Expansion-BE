namespace FoundationAPI.Machine {
   export abstract class BaseMachine extends ConfigurableMachine {
      defaultValues = {
         energy: 0,
         progress: 0,
      }
      progressMax: number; // Progress Max
      defaultBasePower = 20; // BASE_PROCESS_TICK
      power = 0;
      upgrades = ["upgrade", "efficiency", "speed"];
      basePower: number;
      // for upgrade
      energyMultiplier: number;
      powerMultiplier: number;
      speedMultiplier: number

      // region Container
      setupContainer(): void {
         StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
            if (name.startsWith("slotSource")) return !!this.getRecipe(new ItemStack(id, data, amount));
            if (name == "slotEnergy") return ChargeItemRegistry.isValidStorage(id, "Rf", 5);
            if (name.startsWith("slotAugment")) return FoundationAPI.AugmentsAPI.isValidUpgrade(id, this)
            return false;
         });
      }

      getEnergyStorage(): number {
         return 50000;
      }

      useUpgrade(): FoundationAPI.AugmentsAPI.AugmentSet {
         let upgrades = FoundationAPI.AugmentsAPI.useUpgrade(this);
         this.basePower = upgrades.getBaseValue(this.defaultBasePower);
         this.energyMultiplier = upgrades.getProgressEnergy(1);
         this.powerMultiplier = upgrades.getProgressPower(1);
         this.speedMultiplier = upgrades.getSpeed(1)
         return upgrades;
      }

      onTick(): void {
         this.useUpgrade();
         StorageInterface.checkHoppers(this);
         this.power = this.calcEnergy(this.basePower, this.data.energy); // cập nhật power

         let source = this.getSource();
         let recipe = this.getRecipe(source)
         if (!!recipe && this.validateOutputs(recipe)) {
            this.setProgressMax(recipe);
            if (this.canStart()) {
               this.progressTick();
               if (this.data.progress >= this.progressMax) {
                  this.resolveOutputs(recipe);
                  this.resolveInputs(recipe);
                  this.container.validateAll();
                  this.data.progress = this.progressMax = 0;
                  this.setActive(false);
               }
            } else this.setActive(false);
         } else {
            this.data.progress = 0;
            this.setActive(false);
         }

         this.dischargeSlot("slotEnergy");
         this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
         this.container.setScale("progressScale", this.data.progress / this.progressMax);
         this.container.setScale("speedScale", (this.power / this.basePower) || 0);

         // cập nhật Energy Info
         let MachineEfficiency = this.power / this.basePower * 100 * this.powerMultiplier
         let power = this.power * this.energyMultiplier
         this.container.setText("textUse", "Energy Use: " + power ? power.toFixed(3) : 0 + " RF/tick");
         this.container.setText("textMax", "Max Use: " + this.basePower + " RF/tick");
         this.container.setText("textEff", "Efficiency: " + MachineEfficiency ? MachineEfficiency.toFixed(3) : 0 + " %");
         this.container.sendChanges();
      }
      // region Helper
      resolveInputs(recipe: IThermalRecipe | IThermalRecipeNotEnergy): void {
         let source = this.container.getSlot("slotSource");
         source.count -= recipe.input.count || 1;
         source.validate();
         source.markDirty();
         return;
      }
      resolveOutputs(recipe: IThermalRecipe | IThermalRecipeNotEnergy): void {
         ContainerHelper.putInSlot(recipe.result, this.container.getSlot("slotResult"));
         return;
      }

      getSource() {
         return this.container.getSlot("slotSource");
      }
      validateOutputs(recipe: IThermalRecipe | IThermalRecipeNotEnergy): boolean { // only for 1 slot output
         if (!this.container.getSlot("slotResult").id) {
            return true;
         }
         if (ContainerHelper.canPutInSlot(recipe.result, this.container.getSlot("slotResult"))) {
            return true;
         }
         return false
      }      
      canStart(): boolean {
         return this.data.energy >= this.basePower
      }
      progressTick(): number {
         if (this.data.progress >= this.progressMax) {
            return 0
         }
         this.data.energy -= this.power * this.energyMultiplier
         this.data.progress += this.power * this.powerMultiplier * this.speedMultiplier;
         this.setActive(true);
         return this.power
      }
      abstract getRecipe(input: ItemInstance): IThermalRecipe | IThermalRecipeNotEnergy
      // need
      setProgressMax(recipe?: any): void {
         this.progressMax = recipe.energy || 2000
      }


      getRelativeEnergy(): number {
         return this.data.energy / this.getEnergyStorage();
      }
   }
}