import dayjs from 'dayjs/esm';

import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 26052,
  firstName: 'Épiphane',
  lastName: 'Morin',
};

export const sampleWithPartialData: IClient = {
  id: 25141,
  firstName: 'Arnaude',
  lastName: 'Rolland',
  createdDate: dayjs('2024-02-01T20:27'),
};

export const sampleWithFullData: IClient = {
  id: 32070,
  firstName: 'André',
  lastName: 'Durand',
  address: 'rassembler insipide tant',
  phoneNumber: 'touriste adversaire',
  createdDate: dayjs('2024-02-01T13:54'),
  updatedDate: dayjs('2024-02-02T00:42'),
};

export const sampleWithNewData: NewClient = {
  firstName: 'Gontran',
  lastName: 'Lemoine',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
