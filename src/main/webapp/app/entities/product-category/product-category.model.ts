export interface IProductCategory {
  id: number;
  name?: string | null;
  ordre?: number | null;
}

export type NewProductCategory = Omit<IProductCategory, 'id'> & { id: null };
