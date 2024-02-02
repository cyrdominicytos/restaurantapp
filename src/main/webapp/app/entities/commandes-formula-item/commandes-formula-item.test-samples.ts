import { ICommandesFormulaItem, NewCommandesFormulaItem } from './commandes-formula-item.model';

export const sampleWithRequiredData: ICommandesFormulaItem = {
  id: 32736,
};

export const sampleWithPartialData: ICommandesFormulaItem = {
  id: 3019,
  quantity: 18083,
};

export const sampleWithFullData: ICommandesFormulaItem = {
  id: 9358,
  quantity: 27287,
};

export const sampleWithNewData: NewCommandesFormulaItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
