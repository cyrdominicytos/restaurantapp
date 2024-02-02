import { IProductCategory, NewProductCategory } from './product-category.model';

export const sampleWithRequiredData: IProductCategory = {
  id: 14781,
  name: 'impromptu responsable de la part de',
};

export const sampleWithPartialData: IProductCategory = {
  id: 898,
  name: 'parmi vétuste de manière à ce que',
  ordre: 22696,
};

export const sampleWithFullData: IProductCategory = {
  id: 21762,
  name: 'dense vétuste frayer',
  ordre: 32566,
};

export const sampleWithNewData: NewProductCategory = {
  name: 'aussitôt que',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
