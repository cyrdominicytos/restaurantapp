import dayjs from 'dayjs/esm';

export interface IClient {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  createdDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
