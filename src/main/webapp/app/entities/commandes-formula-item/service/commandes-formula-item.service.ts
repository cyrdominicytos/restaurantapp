import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommandesFormulaItem, NewCommandesFormulaItem } from '../commandes-formula-item.model';

export type PartialUpdateCommandesFormulaItem = Partial<ICommandesFormulaItem> & Pick<ICommandesFormulaItem, 'id'>;

export type EntityResponseType = HttpResponse<ICommandesFormulaItem>;
export type EntityArrayResponseType = HttpResponse<ICommandesFormulaItem[]>;

@Injectable({ providedIn: 'root' })
export class CommandesFormulaItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/commandes-formula-items');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(commandesFormulaItem: NewCommandesFormulaItem): Observable<EntityResponseType> {
    return this.http.post<ICommandesFormulaItem>(this.resourceUrl, commandesFormulaItem, { observe: 'response' });
  }

  update(commandesFormulaItem: ICommandesFormulaItem): Observable<EntityResponseType> {
    return this.http.put<ICommandesFormulaItem>(
      `${this.resourceUrl}/${this.getCommandesFormulaItemIdentifier(commandesFormulaItem)}`,
      commandesFormulaItem,
      { observe: 'response' },
    );
  }

  partialUpdate(commandesFormulaItem: PartialUpdateCommandesFormulaItem): Observable<EntityResponseType> {
    return this.http.patch<ICommandesFormulaItem>(
      `${this.resourceUrl}/${this.getCommandesFormulaItemIdentifier(commandesFormulaItem)}`,
      commandesFormulaItem,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommandesFormulaItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommandesFormulaItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommandesFormulaItemIdentifier(commandesFormulaItem: Pick<ICommandesFormulaItem, 'id'>): number {
    return commandesFormulaItem.id;
  }

  compareCommandesFormulaItem(o1: Pick<ICommandesFormulaItem, 'id'> | null, o2: Pick<ICommandesFormulaItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommandesFormulaItemIdentifier(o1) === this.getCommandesFormulaItemIdentifier(o2) : o1 === o2;
  }

  addCommandesFormulaItemToCollectionIfMissing<Type extends Pick<ICommandesFormulaItem, 'id'>>(
    commandesFormulaItemCollection: Type[],
    ...commandesFormulaItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const commandesFormulaItems: Type[] = commandesFormulaItemsToCheck.filter(isPresent);
    if (commandesFormulaItems.length > 0) {
      const commandesFormulaItemCollectionIdentifiers = commandesFormulaItemCollection.map(
        commandesFormulaItemItem => this.getCommandesFormulaItemIdentifier(commandesFormulaItemItem)!,
      );
      const commandesFormulaItemsToAdd = commandesFormulaItems.filter(commandesFormulaItemItem => {
        const commandesFormulaItemIdentifier = this.getCommandesFormulaItemIdentifier(commandesFormulaItemItem);
        if (commandesFormulaItemCollectionIdentifiers.includes(commandesFormulaItemIdentifier)) {
          return false;
        }
        commandesFormulaItemCollectionIdentifiers.push(commandesFormulaItemIdentifier);
        return true;
      });
      return [...commandesFormulaItemsToAdd, ...commandesFormulaItemCollection];
    }
    return commandesFormulaItemCollection;
  }
}
