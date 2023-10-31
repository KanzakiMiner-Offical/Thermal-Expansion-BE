// namespace FoundationAPI.Machine {
//     export abstract class BaseMachine extends ConfigurableMachine {
//        defaultValues: { energy: number, progress: number, curRecipe: IThermalRecipe | IThermalRecipeNotEnergy } = {
//           energy: 0,
//           progress: 0,
//           curRecipe: null
//        }
//        progressMax: number; // Progress Max
//        defaultBasePower = 20; // BASE_PROCESS_TICK
//        power = 0;
//        upgrades = ["upgrade", "efficiency", "speed"];
//        basePower: number;
//        // for upgrade
//        energyMultiplier: number;
//        powerMultiplier: number;
//        speedMultiplier: number
 
//        // region Container
//        setupContainer(): void {
//           StorageInterface.setGlobalValidatePolicy(this.container, (name, id, amount, data) => {
//              if (name.startsWith("slotSource")) return !!this.getRecipe(id, data, amount);
//              if (name == "slotEnergy") return ChargeItemRegistry.isValidStorage(id, "Rf", 5);
//              if (name.startsWith("slotAugment")) return FoundationAPI.AugmentsAPI.isValidUpgrade(id, this)
//              return false;
//           });
//        }
 
//        getEnergyStorage(): number {
//           return 50000;
//        }
 
//        useUpgrade(): FoundationAPI.AugmentsAPI.AugmentSet {
//           let upgrades = FoundationAPI.AugmentsAPI.useUpgrade(this);
//           this.basePower = upgrades.getBaseValue(this.defaultBasePower);
//           this.energyMultiplier = upgrades.getProgressEnergy(1);
//           this.powerMultiplier = upgrades.getProgressPower(1);
//           this.speedMultiplier = upgrades.getSpeed(1)
//           return upgrades;
//        }
 
//        preTick(): void { };
//        postTick(): void { };
 
//        onTick(): void {
//           this.useUpgrade();
//           StorageInterface.checkHoppers(this);
 
//           this.preTick();
//           this.power = this.calcEnergy(this.basePower, this.data.energy); // cập nhật power
//            //
//           if (this.isActive()) { //kiểm tra máy có hoạt động ko
//              this.processTick(); //cộng thêm tiến độ vào data progress
//              if (this.canProgressFinish()) { //nếu có thể hoàn thành công việc
//                 this.processFinish(); //kết thúc công việc
//                 if (this.canProcessStart()) { //nếu có thể bắt đầu lại công việc
//                    this.progressStart(); //bắt đầu công việc
//                 } else { // còn không thể
//                    this.processOff(); // tắt máy, reset dữ liệu
//                 }
//              } else if (this.data.energy < this.basePower) { //nếu điện nhỏ hơn mức cần thiết(mặc định 20 rf)
//                 this.processOff(); // tắt máy, reset dữ liệu 
//                 // } else { // nếu chx hoàn thành và còn điện
//                 //    this.power = this.calcEnergy(this.basePower, this.data.energy); // cập nhật power
//              }
//           } else if (!this.isActive() && this.canProcessStart()) { // nếu máy chx chạy và có thể bắt đầu
//              // this.power = this.calcEnergy(this.basePower, this.data.energy); // cập nhật power 
//              this.progressStart(); // bắt đầu công việc
//              this.processTick(); // thêm tiến độ vào data Progress
//           }
 
//           this.dischargeSlot("slotEnergy");
//           this.postTick();
//           this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
//           this.container.setScale("progressScale", this.data.progress / this.progressMax);
//           this.container.setScale("speedScale", (this.power / this.basePower) || 0);
 
//           // cập nhật Energy Info
//           let MachineEfficiency = this.power / this.basePower * 100 * this.powerMultiplier
//           let power = this.power * this.energyMultiplier
//           this.container.setText("textUse", "Energy Use: " + power ? power.toFixed(3) : 0 + " RF/tick");
//           this.container.setText("textMax", "Max Use: " + this.basePower + " RF/tick");
//           this.container.setText("textEff", "Efficiency: " + MachineEfficiency ? MachineEfficiency.toFixed(3) : 0 + " %");
//           this.container.sendChanges();
//        }
 
//        getRecipe(id: number, data: number, count: number): IThermalRecipe | IThermalRecipeNotEnergy {
//           return null
//        }
 
//        // region Progress
 
//        isActive(): boolean {
//           if (!this.canProcessStart()) {
//              this.setActive(false);
//           }
//           return !!this.networkData.getBoolean("active")
//        }
//        canProcessStart(): boolean {
//           // kiểm tra điện có đủ hay không(:
//           if (this.getEnergyStorage() < this.basePower) {
//              return false;
//           }
//           if (!this.validateInputs()) {
//              return false;
//           }
//           return this.validateOutputs();
//        }
//        canProgressFinish(): boolean {
//           // mod gốc: progress <= 0;
//           return this.data.progress >= this.progressMax;
//        }
//        processOff(): void {
//           this.data.progress = this.progressMax = this.power = 0;
//           this.setActive(false);
//           this.data.curRecipe = null;
//        }
//        processTick(): number {
//           if (this.data.progress >= this.progressMax) {
//              return 0
//           }
//           this.data.energy -= this.power * this.energyMultiplier
//           this.data.progress += this.power * this.powerMultiplier * this.speedMultiplier;
//           this.setActive(true);
//           return this.power;
//        }
//        progressStart(): void {
//           this.data.progress = 0;
//           this.progressMax = 2000;
//        }
//        processFinish(): void {
//           if (!this.validateInputs()) {
//              this.processOff();
//              return;
//           }
//           this.resolveOutputs();
//           this.resolveInputs();
//           //this.setActive(false);
 
//        }
 
//        // region Helper
//        resolveInputs(): void {
//           let recipe = this.data.curRecipe;
//           let source = this.container.getSlot("slotSource");
//           source.count -= recipe.input.count || 1;
//           source.validate();
//           source.markDirty();
//           return;
//        }
//        resolveOutputs(): void {
//           let recipe = this.data.curRecipe;
//           ContainerHelper.putInSlot(recipe.result, this.container.getSlot("slotResult"));
//           return;
//        }
//        validateInputs(): boolean {
//           let source = this.container.getSlot("slotSource");
//           if (!source.id) {
//              this.data.curRecipe = null;
//              return false;
//           }
//           if (!!this.getRecipe(source.id, source.data, source.count)) {
//              this.data.curRecipe = this.getRecipe(source.id, source.data, source.count);
//              return true;
//           }
//           return false;
//        }
//        validateOutputs(): boolean { // only for 1 slot output
//           if (!this.container.getSlot("slotResult").id) {
//              return true;
//           }
//           if (ContainerHelper.canPutInSlot(this.data.curRecipe.result, this.container.getSlot("slotResult"))) {
//              return true;
//           }
//           return false
//        }
//        getRelativeEnergy(): number {
//           return this.data.energy / this.getEnergyStorage();
//        }
//     }
//  }