import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 29180,
  price: 3010.52,
  name: 'ça',
};

export const sampleWithPartialData: IProduct = {
  id: 20030,
  price: 27890.25,
  name: 'brusque',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  imageType: 'généraliser toc-toc membre à vie',
  description: 'vorace proche',
  isSupplement: false,
  createdDate: dayjs('2024-02-01T18:20'),
  updatedDate: dayjs('2024-02-01T12:45'),
};

export const sampleWithFullData: IProduct = {
  id: 17254,
  price: 3393.83,
  name: 'ailleurs spécialiste commis de cuisine',
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  imageType: 'membre à vie de façon à gestionnaire',
  description: 'vraisemblablement du côté de',
  isSupplement: true,
  createdDate: dayjs('2024-02-01T18:57'),
  updatedDate: dayjs('2024-02-01T15:06'),
};

export const sampleWithNewData: NewProduct = {
  price: 25749.2,
  name: 'candide',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
