import { ICommandes } from 'app/entities/commandes/commandes.model';

export interface ICommandesFormulaItem {
  id: number;
  quantity?: number | null;
  commandes?: ICommandes | null;
}

export type NewCommandesFormulaItem = Omit<ICommandesFormulaItem, 'id'> & { id: null };
