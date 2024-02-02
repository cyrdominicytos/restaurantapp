import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommandesProductItem } from '../commandes-product-item.model';
import { CommandesProductItemService } from '../service/commandes-product-item.service';

export const commandesProductItemResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommandesProductItem> => {
  const id = route.params['id'];
  if (id) {
    return inject(CommandesProductItemService)
      .find(id)
      .pipe(
        mergeMap((commandesProductItem: HttpResponse<ICommandesProductItem>) => {
          if (commandesProductItem.body) {
            return of(commandesProductItem.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default commandesProductItemResolve;
