namespace ContainerHelper {
   export function canPutInSlot(item: ItemInstance | ItemStack, slot: ItemContainerSlot): boolean {
      if (!slot.id)
         return true;
      item.count = item.count || 1;
      return slot.id === item.id && slot.data === item.data && Item.getMaxStack(slot.id) - slot.count >= item.count;
   }
   export function putInSlot(item: ItemInstance | ItemStack, slot: ItemContainerSlot): void {
      if (!this.canPutInSlot(item, slot))
         return;

      slot.id = item.id;
      slot.data = item.data || 0;
      slot.count += item.count || 1;
      slot.markDirty();
      return;
   }

   export function extractFromMachine(machine: TileEntity, _side: number): void {
      let machineStorage = StorageInterface.getInterface(machine);
      for (let side = 0; side < 6; side++) {
         if (_side != side)
            continue;
         let storage = StorageInterface.getNeighbourStorage(machine.blockSource, machine, side);
         if (storage)
            StorageInterface.extractItemsFromStorage(storage, machineStorage, side);
      }
   }
   export function extractToMachine(machine: TileEntity, _side: number): void {
      let machineStorage = StorageInterface.getInterface(machine);
      for (let side = 0; side < 6; side++) {
         if (_side != side)
            continue;
         let storage = StorageInterface.getNeighbourStorage(machine.blockSource, machine, side);
         if (storage)
            StorageInterface.extractItemsFromStorage(machineStorage, storage, side);
      }
   }
}