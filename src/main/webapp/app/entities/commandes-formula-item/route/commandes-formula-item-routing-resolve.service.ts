import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommandesFormulaItem } from '../commandes-formula-item.model';
import { CommandesFormulaItemService } from '../service/commandes-formula-item.service';

export const commandesFormulaItemResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommandesFormulaItem> => {
  const id = route.params['id'];
  if (id) {
    return inject(CommandesFormulaItemService)
      .find(id)
      .pipe(
        mergeMap((commandesFormulaItem: HttpResponse<ICommandesFormulaItem>) => {
          if (commandesFormulaItem.body) {
            return of(commandesFormulaItem.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default commandesFormulaItemResolve;
