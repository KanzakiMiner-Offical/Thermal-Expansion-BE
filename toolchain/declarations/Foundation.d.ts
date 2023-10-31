/// <reference path="./core-engine.d.ts" />
/// <reference path="./BlockEngine.d.ts" />
/// <reference path="./energy-net.d.ts" />
/// <reference path="./StorageInterface.d.ts" />

declare namespace FoundationAPI {
    export namespace UniqueGen {
        type paramsGenerator = {
            veinCounts: number;
            minY?: number;
            maxY?: number;
            size: number;
        };
        function randomCoords(random: java.util.Random, chunkX: number, chunkZ: number, minHeight: number, maxHeight: number): {
            x: number;
            y: number;
            z: number;
        };
        function generateOre(id: number, data: number, chunkX: number, chunkZ: number, random: java.util.Random, params: paramsGenerator): void;
        function generateSandOre(id: number, data: number, chunkX: number, chunkZ: number, random: java.util.Random, params: paramsGenerator): void;
    }
    interface IAugments {
        type: string;
        getExtraEnergyCapacity?(item: ItemInstance, machine: TileEntity): number;
        getExtraEnergyTranfer?(item: ItemInstance, machine: TileEntity): number;
        getBaseValueMultiplier?(item: ItemInstance, machine: TileEntity): number;
        getEnergyMultiplier?(item: ItemInstance, machine: TileEntity): number;
        getPowerMultiplier?(item: ItemInstance, machine: TileEntity): number;
        onTick?(item: ItemInstance, machine: TileEntity): void;
    }
    export namespace AugmentsAPI {
        function getUpgrade(id: number): IAugments;
        function isUpgrade(id: number): boolean;
        function isValidUpgrade(id: number, machine: TileEntity): boolean;
        function registerUpgrade(id: number, upgrade: IAugments): void;
        function useUpgrade(machine: TileEntity): AugmentSet;
        class AugmentSet {
            protected tileEntity: TileEntity;
            progressEnergyMultiplier: number;
            progressPowerMultiplier: number;
            extraEnergyCapacity: number;
            baseValueMultiplier: number;
            extraEnergyTranfer: number;
            speedModifier: number;
            constructor(tileEntity: TileEntity);
            resetRates(): void;
            useUpgrade(): void;
            isValidUpgrade(upgrade: IAugments): boolean;
            executeUprade(upgrade: IAugments, stack: ItemInstance): void;
            getBaseValue(defaultBaseValue: number): number;
            getProgressEnergy(defaultEnergy: number): number;
            getProgressPower(defaultPower: number): number;
            getEnergyCapacity(defaultEnergyCapacity: number): number;
            getEnergyTranfer(defaultEnergyTranfer: number): number;
            getSpeed(defaultSpeed: number): number;
        }
    }
    export namespace Machine {
        interface IWrench extends TileEntity {
            canRotate(side: number): boolean;
            getFacing(): number;
            setFacing(side: number): boolean;
            getDefaultDrop(): number;
            adjustDrop(item: ItemInstance): ItemInstance;
            destroyWithWrench(coords: Vector, player: number): void;
        }
    }
    export namespace Machine {
        let ClientSide: typeof BlockEngine.Decorators.ClientSide, NetworkEvent: typeof BlockEngine.Decorators.NetworkEvent, ContainerEvent: typeof BlockEngine.Decorators.ContainerEvent;
        abstract class MachineBase extends TileEntityBase implements IWrench {
            upgrades?: string[];
            defaultDrop?: number;
            onInit(): void;
            setupContainer(): void;
            addLiquidTank(name: string, limit: number, liquids?: string[]): BlockEngine.LiquidTank;
            canRotate(side: number): boolean;
            onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean;
            setActive(isActive: boolean): void;
            renderModel(): void;
            clientLoad(): void;
            clientUnload(): void;
            getFacing(): number;
            setFacing(side: number): boolean;
            decreaseSlot(slot: ItemContainerSlot, count: number): void;
            destroyBlock(coords: Callback.ItemUseCoordinates, player: number): void;
            getDefaultDrop(): number;
            adjustDrop(item: ItemInstance): ItemInstance;
            destroyWithWrench(coords: Vector, player: number): void;
        }
    }
    export namespace Machine {
        abstract class DeviceMachine extends MachineBase {
            defaultValues: {};
            upgrades: ["upgrade"];
            data: this["defaultValues"];
            defaultBaseMod: number;
            baseMod: number;
            setupContainer(): void;
            useUpgrade(): AugmentsAPI.AugmentSet;
            canRotate(side: number): boolean;
            onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean;
        }
    }
    export namespace ThermalFluid {
        let fluid_data: any[];
        function registerLiquid(id: string, name: string, isBucket?: boolean): void;
    }
    export namespace MachineUI {
        type UIOption = {
            disableVanillaSlots: boolean;
            disableInventory: boolean;
            disableJeiMobile: boolean;
            disableInfomation: boolean;
            disableAugment: boolean;
            disableConfig: boolean;
        };
        let InformationUI: UI.Window;
        let AugmentUI: UI.Window;
        function createInventoryWindow(header: string, uiDescriptor: {
            drawing?: UI.DrawingSet;
            elements: UI.ElementSet;
        }): UI.StandardWindow;
        function createTabWindow(id: string, option?: UIOption, config_ui?: UI.Window): void;
    }
    export namespace MachineRegistry {
        function isMachine(id: number): boolean;
        function registerPrototype(id: number, Prototype: TileEntity.TileEntityPrototype): void;
        function createStorageInterface(blockID: number, descriptor: StorageDescriptor): void;
        function createMachineStorageInterface(blockID: number, descriptor: StorageDescriptor): void;
        function setStoragePlaceFunction(blockID: string | number, hasVerticalRotation?: boolean): void;
        function getThermalMachineID(): any[];
        function setMachineDrop(blockID: string | number, dropID?: number): void;
        function fillTankOnClick(tank: BlockEngine.LiquidTank, item: ItemInstance, playerUid: number): boolean;
        /** @deprecated */
        function isValidRFItem(id: number, count: number, data: number, container: UI.Container): boolean;
        /** @deprecated */
        function isValidRFStorage(id: number, count: number, data: number, container: UI.Container): boolean;
        function updateGuiHeader(gui: any, text: string): void;
    }
    export namespace MaterialRegistry {
        let oreName: any[];
        let ingotData: any[];
        let gearHearts: number[];
        function registerIngot(id: string): void;
        function registerNugget(id: string, notRecipe?: boolean): void;
        function registerDust(id: string): void;
        function registerCoin(id: string): void;
        function registerPlate(id: string): void;
        function registerGear(id: string, prefix?: string): void;
        function registerRaw(id: string): void;
        function registerOther(id: string): void;
        function registerOre(id: string, time: number, level: number): void;
        function registerStorage(id: string, time: number, level: number): void;
        function registerOtherResource(id: string, level: number, time: number, isOnlyDust?: boolean, notRecipe?: boolean): void;
        function registerResource(id: string, level: number, time: number): void;
        function registerAloy(id: string, level: number, time: number): void;
    }
    export namespace MathHelper {
        function randomInt(min: number, max: number): number;
        function clamp(value: number, minValue: number, maxValue: number): number;
    }
    export let randomInt: typeof MathHelper.randomInt;
    export namespace ModelHelper {
        function mapEnergyCell(x: any, y: any, z: any, id: any, heartIndex: any): void;
    }
    export namespace Machine {
        abstract class ProgressingMachine extends MachineBase implements EnergyTile {
            energyNode: EnergyTileNode;
            energyTypes: object;
            basePower: number;
            defaultValues: {
                energy: number;
            };
            data: this["defaultValues"];
            getTier(): number;
            getEnergyStorage(): number;
            chargeSlot(slotName: string): void;
            dischargeSlot(slotName: string): void;
            onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, player: number): boolean;
            energyTick(type: string, src: EnergyTileNode): void;
            energyReceive(type: string, amount: number, voltage: number): number;
            canReceiveEnergy(side: number, type: string): boolean;
            canExtractEnergy(side: number, type: string): boolean;
            rebuildGrid(): void;
            calcEnergy(basePower: number, energy: number): number;
            isConductor(type: string): boolean;
            destroyBlock(coords: Callback.ItemUseCoordinates, player: number): void;
            destroyWithWrench(coords: Vector, player: number): void;
        }
    }
    export namespace ThermalConfig {
        type ore_config = {
            enabled: boolean;
            size: number;
            inChunk?: number;
            minY?: number;
            maxY?: number;
            chance?: number;
        };
        type gen_config = {
            [key: string]: ore_config;
        };
        let gen: gen_config;
    }
    interface IWrech {
        isUseable(item: ItemInstance, damage: number): boolean;
        useItem?(item: ItemStack, damage: number, player: number): void;
    }
    export namespace ThermalTool {
        function registerWrench(id: number, properties: IWrech): void;
        function getWrenchData(id: number): IWrech;
        function isWrench(id: number): boolean;
        function isUseableWrench(item: ItemInstance, damage?: number): boolean;
        function useWrench(item: ItemStack, damage: number, player: number): void;
        function rotateMachine(tileEntity: TileEntity, side: number, item: ItemStack, player: number): void;
        function addRecipe(result: ItemInstance, data: {
            id: number;
            data: number;
        }[], tool: number): void;
        function dischargeItem(item: ItemInstance, consume: number, player: number): boolean;
        function useElectricItem(item: ItemInstance, consume: number, player: number): boolean;
    }
    export let TF_OTHER_ORES: string[];
    export namespace MaterialRegistry {
        function registerVanillaDust(id: string): void;
        function registerVanillaNugget(id: string, suffix?: string): void;
        function registerVanillaPlate(id: string): void;
        function registerVanillaGear(id: string, suffix?: string): void;
        function registerVanillaCoin(id: string): void;
        function registerForVanillaMetal(id: string): void;
        function registerForVanillaOtherMaterial(id: string, suffix?: string, coin?: boolean): void;
    }

    export namespace MaterialRegistry {
        function registerDropMob(id: any): void;
    }
    export namespace MaterialRegistry {
        function addBlockRecipe(): void;
        function addOtherBlockRecipe(id: any): void;
    }
    export namespace MaterialRegistry {
        function addOreDrop(id: string, oreLevel: number): void;
    }
    export namespace MaterialRegistry {
        function addAllFurnace(): void;
        function addOtherFurnace(id: any): void;
    }
}
