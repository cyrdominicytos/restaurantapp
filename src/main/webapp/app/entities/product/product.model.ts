import dayjs from 'dayjs/esm';
import { IProductCategory } from 'app/entities/product-category/product-category.model';
import { ICommandes } from 'app/entities/commandes/commandes.model';
import { IFormula } from 'app/entities/formula/formula.model';
import { ICommandesProductItem } from 'app/entities/commandes-product-item/commandes-product-item.model';

export interface IProduct {
  id: number;
  price?: number | null;
  name?: string | null;
  photo?: string | null;
  photoContentType?: string | null;
  imageType?: string | null;
  description?: string | null;
  isSupplement?: boolean | null;
  createdDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
  category?: IProductCategory | null;
  commandesses?: ICommandes[] | null;
  formula?: IFormula | null;
  commandesProductItem?: ICommandesProductItem | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
