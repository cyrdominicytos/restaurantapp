import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommandes, NewCommandes } from '../commandes.model';

export type PartialUpdateCommandes = Partial<ICommandes> & Pick<ICommandes, 'id'>;

type RestOf<T extends ICommandes | NewCommandes> = Omit<T, 'createdDate' | 'recoveryDate' | 'updatedDate'> & {
  createdDate?: string | null;
  recoveryDate?: string | null;
  updatedDate?: string | null;
};

export type RestCommandes = RestOf<ICommandes>;

export type NewRestCommandes = RestOf<NewCommandes>;

export type PartialUpdateRestCommandes = RestOf<PartialUpdateCommandes>;

export type EntityResponseType = HttpResponse<ICommandes>;
export type EntityArrayResponseType = HttpResponse<ICommandes[]>;

@Injectable({ providedIn: 'root' })
export class CommandesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/commandes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(commandes: NewCommandes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commandes);
    return this.http
      .post<RestCommandes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(commandes: ICommandes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commandes);
    return this.http
      .put<RestCommandes>(`${this.resourceUrl}/${this.getCommandesIdentifier(commandes)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(commandes: PartialUpdateCommandes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commandes);
    return this.http
      .patch<RestCommandes>(`${this.resourceUrl}/${this.getCommandesIdentifier(commandes)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCommandes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCommandes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommandesIdentifier(commandes: Pick<ICommandes, 'id'>): number {
    return commandes.id;
  }

  compareCommandes(o1: Pick<ICommandes, 'id'> | null, o2: Pick<ICommandes, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommandesIdentifier(o1) === this.getCommandesIdentifier(o2) : o1 === o2;
  }

  addCommandesToCollectionIfMissing<Type extends Pick<ICommandes, 'id'>>(
    commandesCollection: Type[],
    ...commandesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const commandes: Type[] = commandesToCheck.filter(isPresent);
    if (commandes.length > 0) {
      const commandesCollectionIdentifiers = commandesCollection.map(commandesItem => this.getCommandesIdentifier(commandesItem)!);
      const commandesToAdd = commandes.filter(commandesItem => {
        const commandesIdentifier = this.getCommandesIdentifier(commandesItem);
        if (commandesCollectionIdentifiers.includes(commandesIdentifier)) {
          return false;
        }
        commandesCollectionIdentifiers.push(commandesIdentifier);
        return true;
      });
      return [...commandesToAdd, ...commandesCollection];
    }
    return commandesCollection;
  }

  protected convertDateFromClient<T extends ICommandes | NewCommandes | PartialUpdateCommandes>(commandes: T): RestOf<T> {
    return {
      ...commandes,
      createdDate: commandes.createdDate?.toJSON() ?? null,
      recoveryDate: commandes.recoveryDate?.toJSON() ?? null,
      updatedDate: commandes.updatedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCommandes: RestCommandes): ICommandes {
    return {
      ...restCommandes,
      createdDate: restCommandes.createdDate ? dayjs(restCommandes.createdDate) : undefined,
      recoveryDate: restCommandes.recoveryDate ? dayjs(restCommandes.recoveryDate) : undefined,
      updatedDate: restCommandes.updatedDate ? dayjs(restCommandes.updatedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCommandes>): HttpResponse<ICommandes> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCommandes[]>): HttpResponse<ICommandes[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
