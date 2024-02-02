import dayjs from 'dayjs/esm';

import { ICommandes, NewCommandes } from './commandes.model';

export const sampleWithRequiredData: ICommandes = {
  id: 18056,
  amount: 27322.87,
};

export const sampleWithPartialData: ICommandes = {
  id: 16574,
  amount: 25607.23,
};

export const sampleWithFullData: ICommandes = {
  id: 19285,
  amount: 10258.25,
  createdDate: dayjs('2024-02-01T16:00'),
  recoveryDate: dayjs('2024-02-01T22:35'),
  updatedDate: dayjs('2024-02-01T21:11'),
};

export const sampleWithNewData: NewCommandes = {
  amount: 26474.88,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
