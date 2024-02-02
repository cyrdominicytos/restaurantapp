import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormula, NewFormula } from '../formula.model';

export type PartialUpdateFormula = Partial<IFormula> & Pick<IFormula, 'id'>;

type RestOf<T extends IFormula | NewFormula> = Omit<T, 'createdDate' | 'updatedDate'> & {
  createdDate?: string | null;
  updatedDate?: string | null;
};

export type RestFormula = RestOf<IFormula>;

export type NewRestFormula = RestOf<NewFormula>;

export type PartialUpdateRestFormula = RestOf<PartialUpdateFormula>;

export type EntityResponseType = HttpResponse<IFormula>;
export type EntityArrayResponseType = HttpResponse<IFormula[]>;

@Injectable({ providedIn: 'root' })
export class FormulaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formulas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(formula: NewFormula): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formula);
    return this.http
      .post<RestFormula>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(formula: IFormula): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formula);
    return this.http
      .put<RestFormula>(`${this.resourceUrl}/${this.getFormulaIdentifier(formula)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(formula: PartialUpdateFormula): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formula);
    return this.http
      .patch<RestFormula>(`${this.resourceUrl}/${this.getFormulaIdentifier(formula)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFormula>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFormula[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFormulaIdentifier(formula: Pick<IFormula, 'id'>): number {
    return formula.id;
  }

  compareFormula(o1: Pick<IFormula, 'id'> | null, o2: Pick<IFormula, 'id'> | null): boolean {
    return o1 && o2 ? this.getFormulaIdentifier(o1) === this.getFormulaIdentifier(o2) : o1 === o2;
  }

  addFormulaToCollectionIfMissing<Type extends Pick<IFormula, 'id'>>(
    formulaCollection: Type[],
    ...formulasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const formulas: Type[] = formulasToCheck.filter(isPresent);
    if (formulas.length > 0) {
      const formulaCollectionIdentifiers = formulaCollection.map(formulaItem => this.getFormulaIdentifier(formulaItem)!);
      const formulasToAdd = formulas.filter(formulaItem => {
        const formulaIdentifier = this.getFormulaIdentifier(formulaItem);
        if (formulaCollectionIdentifiers.includes(formulaIdentifier)) {
          return false;
        }
        formulaCollectionIdentifiers.push(formulaIdentifier);
        return true;
      });
      return [...formulasToAdd, ...formulaCollection];
    }
    return formulaCollection;
  }

  protected convertDateFromClient<T extends IFormula | NewFormula | PartialUpdateFormula>(formula: T): RestOf<T> {
    return {
      ...formula,
      createdDate: formula.createdDate?.toJSON() ?? null,
      updatedDate: formula.updatedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFormula: RestFormula): IFormula {
    return {
      ...restFormula,
      createdDate: restFormula.createdDate ? dayjs(restFormula.createdDate) : undefined,
      updatedDate: restFormula.updatedDate ? dayjs(restFormula.updatedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFormula>): HttpResponse<IFormula> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFormula[]>): HttpResponse<IFormula[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
