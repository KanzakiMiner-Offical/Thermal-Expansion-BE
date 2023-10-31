namespace FoundationAPI.MachineUI {
   export let EnergyUI = new UI.Window({
      drawing: [
         { type: "background", color: Color.rgb(255, 98, 0) },
         { type: "text", text: "Energy Status", x: 200, y: -0.5, font: FONT_GREY },
   ],

      elements: (() => {
         const elems = ({
            "textUse": { type: "text", text: "Energy Use: 0 RF/tick", x: 300, y: 100, font: { size: 25, color: Color.WHITE, shadow: 0.6 } },
            "textMax": { type: "text", text: "Max Use: 0 RF/tick", x: 300, y: 150, font: { size: 25, color: Color.WHITE, shadow: 0.6 } },
            "textEff": { type: "text", text: "Efficiency: 0 %", x: 300, y: 200, font: { size: 25, color: Color.WHITE, shadow: 0.6 } }
         }) as UI.ElementSet;
         return elems;
      })()
   });
   EnergyUI.setInventoryNeeded(false);
   EnergyUI.setCloseOnBackPressed(true);
   export let Augment4UI = new UI.Window({
      drawing: [
         { type: "background", color: Color.rgb(0, 255, 0) },
         { type: "text", text: "Augmentation", x: 500, y: 57.5, font: FONT_GREY }, ],
      elements: (() => {
         const elems = ({
            slotAugment1: { type: "slot", x: 120, y: 0, size: 40 },
            slotAugment2: { type: "slot", x: 160, y: 0, size: 40 },
            slotAugment3: { type: "slot", x: 120, y: 40, size: 40 },
            slotAugment4: { type: "slot", x: 160, y: 40, size: 40 }
         }) as UI.ElementSet;
         return elems;
      })()
   });
   Augment4UI.setInventoryNeeded(false);
   Augment4UI.setCloseOnBackPressed(true);

   export function createMachineTabWindow(id: string, bitmap: string, option: MachineUI.UIOption = {
      disableVanillaSlots: true,
      disableInventory: false,
      disableJeiMobile: false,
      disableInfomation: false,
      disableAugment: false,
      disableConfig: false
   }, info ? : any) {
      let ConfigUI = new UI.Window({
         drawing: [
            { type: "background", color: Color.rgb(7, 79, 130) }, ],
         elements: (() => {
            const elems = ({
               right: {
                  type: "image",
                  x: 100,
                  y: 40,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.SOUTH })
                     }
                  }
               },
               left: {
                  type: "image",
                  x: 180,
                  y: 40,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.NORTH })
                     }
                  }
               },
               front: {
                  type: "image",
                  x: 140,
                  y: 40,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.EAST })
                     }
                  }
               },
               behind: {
                  type: "image",
                  x: 140,
                  y: 80,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.WEST })
                     }
                  }
               },
               up: {
                  type: "image",
                  x: 140,
                  y: 0,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.UP })
                     }
                  }
               },
               down: {
                  type: "image",
                  x: 140,
                  y: 80,
                  scale: 1.6,
                  bitmap: `icons.${bitmap}`,
                  overlay: "",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("config", { side: BlockSide.DOWN })
                     }
                  }
               },
               autoPush: {
                  type: "button",
                  x: 25,
                  y: 80,
                  scale: 2,
                  bitmap: "ui.energyCell.output",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("enable_auto", { type: "push" })
                     }
                  }
               },
               autoPull: {
                  type: "button",
                  x: 25,
                  y: 200,
                  scale: 2,
                  bitmap: "ui.energyCell.input",
                  clicker: {
                     onClick: function(_, container: ItemContainer) {
                        container.sendEvent("enable_auto", { type: "pull" })
                     }
                  }
               },
            }) as UI.ElementSet;
            return elems;
         })()
      });
      ModAPI.addAPICallback("ClassicUI", function(api: any) {
         let tab_ui_config = {
            right: [
               { // main
                  id: 1,
                  icon: {
                     id: BlockID[id]
                  },
                  onClick(default_window, config, theme, id) {
                     return api.buildMain(default_window, id, config)
                  }
            }, ],
            left: []
         }
         if (!option.disableInfomation) {
            tab_ui_config.left.push({ // info
               id: 2,
               icon: {
                  id: ItemID.tf_information
               },
               onClick(default_window, config, theme, id) {
                  return FoundationAPI.MachineUI.InformationUI;
               }
            })
         }
         if (!option.disableAugment) {
            tab_ui_config.right.push({ // auguments
               id: 2,
               icon: {
                  id: ItemID.tf_augments,
               },
               onClick(default_window, config, theme, id) {
                  return Augment4UI;
               }
            })
         }
         if (!option.disableConfig) {
            tab_ui_config.right.push({ // config
               id: 3,
               icon: {
                  id: ItemID.tf_config,
               },
               onClick(default_window, config, theme, id) {
                  return ConfigUI;
               }
            })
         }

         tab_ui_config.left.push({
            id: 3,
            icon: {
               id: ItemID.tf_energy
            },
            onClick(default_window, config, theme, id) {
               return EnergyUI;
            }
         });

         api.setBlockFunctions(BlockID[id], {
            disableVanillaSlots: option.disableVanillaSlots,
            disableInventory: option.disableInventory,
            disableJeiMobile: option.disableJeiMobile,
            tabs: tab_ui_config
         });
      });
   }

}