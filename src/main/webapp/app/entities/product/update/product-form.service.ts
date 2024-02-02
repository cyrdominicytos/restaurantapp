import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProduct | NewProduct> = Omit<T, 'createdDate' | 'updatedDate'> & {
  createdDate?: string | null;
  updatedDate?: string | null;
};

type ProductFormRawValue = FormValueOf<IProduct>;

type NewProductFormRawValue = FormValueOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id' | 'isSupplement' | 'createdDate' | 'updatedDate'>;

type ProductFormGroupContent = {
  id: FormControl<ProductFormRawValue['id'] | NewProduct['id']>;
  price: FormControl<ProductFormRawValue['price']>;
  name: FormControl<ProductFormRawValue['name']>;
  photo: FormControl<ProductFormRawValue['photo']>;
  photoContentType: FormControl<ProductFormRawValue['photoContentType']>;
  imageType: FormControl<ProductFormRawValue['imageType']>;
  description: FormControl<ProductFormRawValue['description']>;
  isSupplement: FormControl<ProductFormRawValue['isSupplement']>;
  createdDate: FormControl<ProductFormRawValue['createdDate']>;
  updatedDate: FormControl<ProductFormRawValue['updatedDate']>;
  category: FormControl<ProductFormRawValue['category']>;
  formula: FormControl<ProductFormRawValue['formula']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: null }): ProductFormGroup {
    const productRawValue = this.convertProductToProductRawValue({
      ...this.getFormDefaults(),
      ...product,
    });
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      price: new FormControl(productRawValue.price, {
        validators: [Validators.required],
      }),
      name: new FormControl(productRawValue.name, {
        validators: [Validators.required],
      }),
      photo: new FormControl(productRawValue.photo),
      photoContentType: new FormControl(productRawValue.photoContentType),
      imageType: new FormControl(productRawValue.imageType),
      description: new FormControl(productRawValue.description),
      isSupplement: new FormControl(productRawValue.isSupplement),
      createdDate: new FormControl(productRawValue.createdDate),
      updatedDate: new FormControl(productRawValue.updatedDate),
      category: new FormControl(productRawValue.category),
      formula: new FormControl(productRawValue.formula),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return this.convertProductRawValueToProduct(form.getRawValue() as ProductFormRawValue | NewProductFormRawValue);
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = this.convertProductToProductRawValue({ ...this.getFormDefaults(), ...product });
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isSupplement: false,
      createdDate: currentTime,
      updatedDate: currentTime,
    };
  }

  private convertProductRawValueToProduct(rawProduct: ProductFormRawValue | NewProductFormRawValue): IProduct | NewProduct {
    return {
      ...rawProduct,
      createdDate: dayjs(rawProduct.createdDate, DATE_TIME_FORMAT),
      updatedDate: dayjs(rawProduct.updatedDate, DATE_TIME_FORMAT),
    };
  }

  private convertProductToProductRawValue(
    product: IProduct | (Partial<NewProduct> & ProductFormDefaults),
  ): ProductFormRawValue | PartialWithRequiredKeyOf<NewProductFormRawValue> {
    return {
      ...product,
      createdDate: product.createdDate ? product.createdDate.format(DATE_TIME_FORMAT) : undefined,
      updatedDate: product.updatedDate ? product.updatedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
