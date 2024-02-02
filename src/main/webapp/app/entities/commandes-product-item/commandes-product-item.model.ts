import { IProduct } from 'app/entities/product/product.model';
import { ICommandes } from 'app/entities/commandes/commandes.model';

export interface ICommandesProductItem {
  id: number;
  quantity?: number | null;
  product?: IProduct | null;
  commandes?: ICommandes | null;
}

export type NewCommandesProductItem = Omit<ICommandesProductItem, 'id'> & { id: null };
