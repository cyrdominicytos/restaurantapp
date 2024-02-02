import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICommandes, NewCommandes } from '../commandes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommandes for edit and NewCommandesFormGroupInput for create.
 */
type CommandesFormGroupInput = ICommandes | PartialWithRequiredKeyOf<NewCommandes>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICommandes | NewCommandes> = Omit<T, 'createdDate' | 'recoveryDate' | 'updatedDate'> & {
  createdDate?: string | null;
  recoveryDate?: string | null;
  updatedDate?: string | null;
};

type CommandesFormRawValue = FormValueOf<ICommandes>;

type NewCommandesFormRawValue = FormValueOf<NewCommandes>;

type CommandesFormDefaults = Pick<NewCommandes, 'id' | 'createdDate' | 'recoveryDate' | 'updatedDate' | 'products' | 'formulas'>;

type CommandesFormGroupContent = {
  id: FormControl<CommandesFormRawValue['id'] | NewCommandes['id']>;
  amount: FormControl<CommandesFormRawValue['amount']>;
  createdDate: FormControl<CommandesFormRawValue['createdDate']>;
  recoveryDate: FormControl<CommandesFormRawValue['recoveryDate']>;
  updatedDate: FormControl<CommandesFormRawValue['updatedDate']>;
  user: FormControl<CommandesFormRawValue['user']>;
  products: FormControl<CommandesFormRawValue['products']>;
  formulas: FormControl<CommandesFormRawValue['formulas']>;
};

export type CommandesFormGroup = FormGroup<CommandesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommandesFormService {
  createCommandesFormGroup(commandes: CommandesFormGroupInput = { id: null }): CommandesFormGroup {
    const commandesRawValue = this.convertCommandesToCommandesRawValue({
      ...this.getFormDefaults(),
      ...commandes,
    });
    return new FormGroup<CommandesFormGroupContent>({
      id: new FormControl(
        { value: commandesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      amount: new FormControl(commandesRawValue.amount, {
        validators: [Validators.required],
      }),
      createdDate: new FormControl(commandesRawValue.createdDate),
      recoveryDate: new FormControl(commandesRawValue.recoveryDate),
      updatedDate: new FormControl(commandesRawValue.updatedDate),
      user: new FormControl(commandesRawValue.user),
      products: new FormControl(commandesRawValue.products ?? []),
      formulas: new FormControl(commandesRawValue.formulas ?? []),
    });
  }

  getCommandes(form: CommandesFormGroup): ICommandes | NewCommandes {
    return this.convertCommandesRawValueToCommandes(form.getRawValue() as CommandesFormRawValue | NewCommandesFormRawValue);
  }

  resetForm(form: CommandesFormGroup, commandes: CommandesFormGroupInput): void {
    const commandesRawValue = this.convertCommandesToCommandesRawValue({ ...this.getFormDefaults(), ...commandes });
    form.reset(
      {
        ...commandesRawValue,
        id: { value: commandesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommandesFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      recoveryDate: currentTime,
      updatedDate: currentTime,
      products: [],
      formulas: [],
    };
  }

  private convertCommandesRawValueToCommandes(rawCommandes: CommandesFormRawValue | NewCommandesFormRawValue): ICommandes | NewCommandes {
    return {
      ...rawCommandes,
      createdDate: dayjs(rawCommandes.createdDate, DATE_TIME_FORMAT),
      recoveryDate: dayjs(rawCommandes.recoveryDate, DATE_TIME_FORMAT),
      updatedDate: dayjs(rawCommandes.updatedDate, DATE_TIME_FORMAT),
    };
  }

  private convertCommandesToCommandesRawValue(
    commandes: ICommandes | (Partial<NewCommandes> & CommandesFormDefaults),
  ): CommandesFormRawValue | PartialWithRequiredKeyOf<NewCommandesFormRawValue> {
    return {
      ...commandes,
      createdDate: commandes.createdDate ? commandes.createdDate.format(DATE_TIME_FORMAT) : undefined,
      recoveryDate: commandes.recoveryDate ? commandes.recoveryDate.format(DATE_TIME_FORMAT) : undefined,
      updatedDate: commandes.updatedDate ? commandes.updatedDate.format(DATE_TIME_FORMAT) : undefined,
      products: commandes.products ?? [],
      formulas: commandes.formulas ?? [],
    };
  }
}
