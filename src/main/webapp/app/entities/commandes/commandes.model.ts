import dayjs from 'dayjs/esm';
import { ICommandesFormulaItem } from 'app/entities/commandes-formula-item/commandes-formula-item.model';
import { ICommandesProductItem } from 'app/entities/commandes-product-item/commandes-product-item.model';
import { IClient } from 'app/entities/client/client.model';
import { IProduct } from 'app/entities/product/product.model';
import { IFormula } from 'app/entities/formula/formula.model';

export interface ICommandes {
  id: number;
  amount?: number | null;
  createdDate?: dayjs.Dayjs | null;
  recoveryDate?: dayjs.Dayjs | null;
  updatedDate?: dayjs.Dayjs | null;
  commandesFormulaItems?: ICommandesFormulaItem[] | null;
  commandesProductItems?: ICommandesProductItem[] | null;
  user?: IClient | null;
  products?: IProduct[] | null;
  formulas?: IFormula[] | null;
}

export type NewCommandes = Omit<ICommandes, 'id'> & { id: null };
