namespace FoundationAPI.Machine {
   export abstract class ConfigurableMachine extends ProgressingMachine {
      defaultValues = {
         energy: 0
      }

      canRotate(side: number): boolean {
         return side > 1;
      }
   }
}