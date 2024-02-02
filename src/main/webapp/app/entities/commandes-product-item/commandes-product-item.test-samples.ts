import { ICommandesProductItem, NewCommandesProductItem } from './commandes-product-item.model';

export const sampleWithRequiredData: ICommandesProductItem = {
  id: 31129,
};

export const sampleWithPartialData: ICommandesProductItem = {
  id: 29343,
  quantity: 31647,
};

export const sampleWithFullData: ICommandesProductItem = {
  id: 10495,
  quantity: 19253,
};

export const sampleWithNewData: NewCommandesProductItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
