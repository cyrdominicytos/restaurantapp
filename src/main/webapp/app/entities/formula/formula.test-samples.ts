import dayjs from 'dayjs/esm';

import { IFormula, NewFormula } from './formula.model';

export const sampleWithRequiredData: IFormula = {
  id: 42,
  price: 28966.32,
};

export const sampleWithPartialData: IFormula = {
  id: 28893,
  price: 13702.03,
  name: 'diplomate intrépide présidence',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  description: 'du côté de',
};

export const sampleWithFullData: IFormula = {
  id: 2060,
  price: 17514.47,
  name: 'collègue aïe de façon à',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  imageType: 'rectangulaire',
  description: 'de façon à ce que',
  createdDate: dayjs('2024-02-01T17:57'),
  updatedDate: dayjs('2024-02-02T01:12'),
};

export const sampleWithNewData: NewFormula = {
  price: 10842.85,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
