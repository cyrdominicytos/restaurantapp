import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICommandesFormulaItem, NewCommandesFormulaItem } from '../commandes-formula-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommandesFormulaItem for edit and NewCommandesFormulaItemFormGroupInput for create.
 */
type CommandesFormulaItemFormGroupInput = ICommandesFormulaItem | PartialWithRequiredKeyOf<NewCommandesFormulaItem>;

type CommandesFormulaItemFormDefaults = Pick<NewCommandesFormulaItem, 'id'>;

type CommandesFormulaItemFormGroupContent = {
  id: FormControl<ICommandesFormulaItem['id'] | NewCommandesFormulaItem['id']>;
  quantity: FormControl<ICommandesFormulaItem['quantity']>;
  commandes: FormControl<ICommandesFormulaItem['commandes']>;
};

export type CommandesFormulaItemFormGroup = FormGroup<CommandesFormulaItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommandesFormulaItemFormService {
  createCommandesFormulaItemFormGroup(
    commandesFormulaItem: CommandesFormulaItemFormGroupInput = { id: null },
  ): CommandesFormulaItemFormGroup {
    const commandesFormulaItemRawValue = {
      ...this.getFormDefaults(),
      ...commandesFormulaItem,
    };
    return new FormGroup<CommandesFormulaItemFormGroupContent>({
      id: new FormControl(
        { value: commandesFormulaItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      quantity: new FormControl(commandesFormulaItemRawValue.quantity),
      commandes: new FormControl(commandesFormulaItemRawValue.commandes),
    });
  }

  getCommandesFormulaItem(form: CommandesFormulaItemFormGroup): ICommandesFormulaItem | NewCommandesFormulaItem {
    return form.getRawValue() as ICommandesFormulaItem | NewCommandesFormulaItem;
  }

  resetForm(form: CommandesFormulaItemFormGroup, commandesFormulaItem: CommandesFormulaItemFormGroupInput): void {
    const commandesFormulaItemRawValue = { ...this.getFormDefaults(), ...commandesFormulaItem };
    form.reset(
      {
        ...commandesFormulaItemRawValue,
        id: { value: commandesFormulaItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommandesFormulaItemFormDefaults {
    return {
      id: null,
    };
  }
}
