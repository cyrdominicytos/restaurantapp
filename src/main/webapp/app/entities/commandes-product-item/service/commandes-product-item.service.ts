import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommandesProductItem, NewCommandesProductItem } from '../commandes-product-item.model';

export type PartialUpdateCommandesProductItem = Partial<ICommandesProductItem> & Pick<ICommandesProductItem, 'id'>;

export type EntityResponseType = HttpResponse<ICommandesProductItem>;
export type EntityArrayResponseType = HttpResponse<ICommandesProductItem[]>;

@Injectable({ providedIn: 'root' })
export class CommandesProductItemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/commandes-product-items');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(commandesProductItem: NewCommandesProductItem): Observable<EntityResponseType> {
    return this.http.post<ICommandesProductItem>(this.resourceUrl, commandesProductItem, { observe: 'response' });
  }

  update(commandesProductItem: ICommandesProductItem): Observable<EntityResponseType> {
    return this.http.put<ICommandesProductItem>(
      `${this.resourceUrl}/${this.getCommandesProductItemIdentifier(commandesProductItem)}`,
      commandesProductItem,
      { observe: 'response' },
    );
  }

  partialUpdate(commandesProductItem: PartialUpdateCommandesProductItem): Observable<EntityResponseType> {
    return this.http.patch<ICommandesProductItem>(
      `${this.resourceUrl}/${this.getCommandesProductItemIdentifier(commandesProductItem)}`,
      commandesProductItem,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommandesProductItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommandesProductItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommandesProductItemIdentifier(commandesProductItem: Pick<ICommandesProductItem, 'id'>): number {
    return commandesProductItem.id;
  }

  compareCommandesProductItem(o1: Pick<ICommandesProductItem, 'id'> | null, o2: Pick<ICommandesProductItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommandesProductItemIdentifier(o1) === this.getCommandesProductItemIdentifier(o2) : o1 === o2;
  }

  addCommandesProductItemToCollectionIfMissing<Type extends Pick<ICommandesProductItem, 'id'>>(
    commandesProductItemCollection: Type[],
    ...commandesProductItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const commandesProductItems: Type[] = commandesProductItemsToCheck.filter(isPresent);
    if (commandesProductItems.length > 0) {
      const commandesProductItemCollectionIdentifiers = commandesProductItemCollection.map(
        commandesProductItemItem => this.getCommandesProductItemIdentifier(commandesProductItemItem)!,
      );
      const commandesProductItemsToAdd = commandesProductItems.filter(commandesProductItemItem => {
        const commandesProductItemIdentifier = this.getCommandesProductItemIdentifier(commandesProductItemItem);
        if (commandesProductItemCollectionIdentifiers.includes(commandesProductItemIdentifier)) {
          return false;
        }
        commandesProductItemCollectionIdentifiers.push(commandesProductItemIdentifier);
        return true;
      });
      return [...commandesProductItemsToAdd, ...commandesProductItemCollection];
    }
    return commandesProductItemCollection;
  }
}
