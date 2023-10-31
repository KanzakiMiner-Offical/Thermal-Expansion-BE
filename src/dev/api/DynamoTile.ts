namespace FoundationAPI.Machine {
   export abstract class DynamoTile extends ConfigurableMachine {
      defaultValues = {
         energy: 0,
         burn: 0,
         burnMax: 0,
         rotate: 0
      }
      defaultBasePower = 20; // BASE_PROCESS_TICK
      power = 0;
      upgrades = ["upgrade"]; // "dynamo"
      basePower: number;
      minProcessTick = 20 / 10;
      energyMod = 1;
      // for upgrade
      energyMultiplier: number;
      powerMultiplier: number;

      // region Container
      setupContainer(): void { }

      getEnergyStorage(): number {
         return this.basePower * 1000;
      }

      useUpgrade(): FoundationAPI.AugmentsAPI.AugmentSet {
         let upgrades = FoundationAPI.AugmentsAPI.useUpgrade(this);
         this.basePower = upgrades.getBaseValue(this.defaultBasePower);
         return upgrades;
      }

      onTick(): void {
         this.useUpgrade();
         StorageInterface.checkHoppers(this);
         this.data.rotate = this.networkData.getInt("facing");

         if (this.isActive()) {
            this.processTick();
            if (this.canProcessFinish()) {
               this.processFinish();
               if (/*redstone signal missing? */ !this.canProcessStart()) {
                  this.setActive(false);
               } else {
                  this.processStart();
               }
            }
         } else if (World.getThreadTime() / 5) {
            if (/*redstone signal missing? */this.canProcessStart()) {
               this.processStart();
               this.processTick();
               this.setActive(true);
            } else {
               this.modify(-this.minProcessTick);
            }
         }
         this.renderModel();

         // cập nhật Energy Info
         let MachineEfficiency = this.power / this.basePower * 100 * this.powerMultiplier || 0;
         let power = this.power * this.energyMultiplier || 0;
         this.container.setText("textUse", "Energy Produce: " + power.toFixed(3) + " RF/tick");
         this.container.setText("textMax", "Max Produce: " + this.basePower + " RF/tick");
         this.container.setText("textEff", "Efficiency: " + MachineEfficiency.toFixed(3) + " %");
         this.container.sendChanges();
      }

      getRecipe(id: number, data: number, count: number): IThermalRecipe | IThermalRecipeNotEnergy {
         return null
      }

      @ClientSide
      renderModel(): void {
         const blockId = Network.serverToLocalId(this.networkData.getInt("blockId"));
         FoundationAPI.ModelHelper.mapDynamo(this.x, this.y, this.z, blockId, "", this.networkData.getBoolean("active"), this.networkData.getInt("facing"));
      }

      setFacing(side: number): boolean {
         if (this.getFacing() != side) {
            this.blockSource.setBlock(this.x, this.y, this.z, this.blockID, side);
            this.networkData.putInt("blockData", side);
            this.networkData.putInt("facing", this.blockSource.getBlockData(this.x, this.y, this.z));
            this.networkData.sendChanges();
            return true;
         }
         return false;
      }

      // region PROCESS

      isActive(): boolean {
         return !!this.networkData.getBoolean("active")
      }

      abstract canProcessStart(): boolean;

      canProcessFinish(): boolean {
         return this.data.burn <= 0;
      }

      abstract processStart(): void;

      processFinish(): void { }

      processTick(): number {
         if (this.data.burn <= 0) {
            return 0;
         }
         let energy = this.calcEnergy();
         this.modify(energy);
         this.data.burn -= energy;
         return energy;
      }

      calcEnergy(): number {
         return FoundationAPI.MathHelper.clamp(this.minProcessTick + Math.floor((this.basePower * (1 - this.getRelativeEnergy()))), 0, this.basePower);
      }

      // region UI HELPER

      getRelativeEnergy(): number {
         return this.data.energy / this.getEnergyStorage();
      }

      // region ?

      modify(amount: number): void {
         this.data.energy += amount;
         if (this.data.energy > this.getEnergyStorage()) {
            this.data.energy = this.getEnergyStorage();
         } else if (this.data.energy < 0) {
            this.data.energy = 0;
         }
      }

      // region Tranfer 
      energyTick(type: string, src: EnergyTileNode): void {
         let output = Math.min(this.data.energy, this.basePower);
         this.data.energy += src.add(output) - output;
      }

      canReceiveEnergy(side: number, type: string): boolean {
         return false;
      }
      canExtractEnergy(side: number, type: string): boolean {
         return true;
      }
   }
}