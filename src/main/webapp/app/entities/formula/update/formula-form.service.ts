import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFormula, NewFormula } from '../formula.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFormula for edit and NewFormulaFormGroupInput for create.
 */
type FormulaFormGroupInput = IFormula | PartialWithRequiredKeyOf<NewFormula>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFormula | NewFormula> = Omit<T, 'createdDate' | 'updatedDate'> & {
  createdDate?: string | null;
  updatedDate?: string | null;
};

type FormulaFormRawValue = FormValueOf<IFormula>;

type NewFormulaFormRawValue = FormValueOf<NewFormula>;

type FormulaFormDefaults = Pick<NewFormula, 'id' | 'createdDate' | 'updatedDate'>;

type FormulaFormGroupContent = {
  id: FormControl<FormulaFormRawValue['id'] | NewFormula['id']>;
  price: FormControl<FormulaFormRawValue['price']>;
  name: FormControl<FormulaFormRawValue['name']>;
  photo: FormControl<FormulaFormRawValue['photo']>;
  photoContentType: FormControl<FormulaFormRawValue['photoContentType']>;
  imageType: FormControl<FormulaFormRawValue['imageType']>;
  description: FormControl<FormulaFormRawValue['description']>;
  createdDate: FormControl<FormulaFormRawValue['createdDate']>;
  updatedDate: FormControl<FormulaFormRawValue['updatedDate']>;
};

export type FormulaFormGroup = FormGroup<FormulaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FormulaFormService {
  createFormulaFormGroup(formula: FormulaFormGroupInput = { id: null }): FormulaFormGroup {
    const formulaRawValue = this.convertFormulaToFormulaRawValue({
      ...this.getFormDefaults(),
      ...formula,
    });
    return new FormGroup<FormulaFormGroupContent>({
      id: new FormControl(
        { value: formulaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      price: new FormControl(formulaRawValue.price, {
        validators: [Validators.required],
      }),
      name: new FormControl(formulaRawValue.name),
      photo: new FormControl(formulaRawValue.photo),
      photoContentType: new FormControl(formulaRawValue.photoContentType),
      imageType: new FormControl(formulaRawValue.imageType),
      description: new FormControl(formulaRawValue.description),
      createdDate: new FormControl(formulaRawValue.createdDate),
      updatedDate: new FormControl(formulaRawValue.updatedDate),
    });
  }

  getFormula(form: FormulaFormGroup): IFormula | NewFormula {
    return this.convertFormulaRawValueToFormula(form.getRawValue() as FormulaFormRawValue | NewFormulaFormRawValue);
  }

  resetForm(form: FormulaFormGroup, formula: FormulaFormGroupInput): void {
    const formulaRawValue = this.convertFormulaToFormulaRawValue({ ...this.getFormDefaults(), ...formula });
    form.reset(
      {
        ...formulaRawValue,
        id: { value: formulaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FormulaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      updatedDate: currentTime,
    };
  }

  private convertFormulaRawValueToFormula(rawFormula: FormulaFormRawValue | NewFormulaFormRawValue): IFormula | NewFormula {
    return {
      ...rawFormula,
      createdDate: dayjs(rawFormula.createdDate, DATE_TIME_FORMAT),
      updatedDate: dayjs(rawFormula.updatedDate, DATE_TIME_FORMAT),
    };
  }

  private convertFormulaToFormulaRawValue(
    formula: IFormula | (Partial<NewFormula> & FormulaFormDefaults),
  ): FormulaFormRawValue | PartialWithRequiredKeyOf<NewFormulaFormRawValue> {
    return {
      ...formula,
      createdDate: formula.createdDate ? formula.createdDate.format(DATE_TIME_FORMAT) : undefined,
      updatedDate: formula.updatedDate ? formula.updatedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
