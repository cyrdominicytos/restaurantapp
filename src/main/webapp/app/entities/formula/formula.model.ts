import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';
import { ICommandes } from 'app/entities/commandes/commandes.model';

export interface IFormula {
  id: number;
  price?: number | null;
  name?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
  imageType?: string | null;
  description?: string | null;
  createdDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
  products?: IProduct[] | null;
  commandesses?: ICommandes[] | null;
}

export type NewFormula = Omit<IFormula, 'id'> & { id: null };
