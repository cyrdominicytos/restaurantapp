import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICommandesProductItem, NewCommandesProductItem } from '../commandes-product-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommandesProductItem for edit and NewCommandesProductItemFormGroupInput for create.
 */
type CommandesProductItemFormGroupInput = ICommandesProductItem | PartialWithRequiredKeyOf<NewCommandesProductItem>;

type CommandesProductItemFormDefaults = Pick<NewCommandesProductItem, 'id'>;

type CommandesProductItemFormGroupContent = {
  id: FormControl<ICommandesProductItem['id'] | NewCommandesProductItem['id']>;
  quantity: FormControl<ICommandesProductItem['quantity']>;
  product: FormControl<ICommandesProductItem['product']>;
  commandes: FormControl<ICommandesProductItem['commandes']>;
};

export type CommandesProductItemFormGroup = FormGroup<CommandesProductItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommandesProductItemFormService {
  createCommandesProductItemFormGroup(
    commandesProductItem: CommandesProductItemFormGroupInput = { id: null },
  ): CommandesProductItemFormGroup {
    const commandesProductItemRawValue = {
      ...this.getFormDefaults(),
      ...commandesProductItem,
    };
    return new FormGroup<CommandesProductItemFormGroupContent>({
      id: new FormControl(
        { value: commandesProductItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      quantity: new FormControl(commandesProductItemRawValue.quantity),
      product: new FormControl(commandesProductItemRawValue.product),
      commandes: new FormControl(commandesProductItemRawValue.commandes),
    });
  }

  getCommandesProductItem(form: CommandesProductItemFormGroup): ICommandesProductItem | NewCommandesProductItem {
    return form.getRawValue() as ICommandesProductItem | NewCommandesProductItem;
  }

  resetForm(form: CommandesProductItemFormGroup, commandesProductItem: CommandesProductItemFormGroupInput): void {
    const commandesProductItemRawValue = { ...this.getFormDefaults(), ...commandesProductItem };
    form.reset(
      {
        ...commandesProductItemRawValue,
        id: { value: commandesProductItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommandesProductItemFormDefaults {
    return {
      id: null,
    };
  }
}
