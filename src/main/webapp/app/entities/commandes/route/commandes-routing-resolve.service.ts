import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommandes } from '../commandes.model';
import { CommandesService } from '../service/commandes.service';

export const commandesResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommandes> => {
  const id = route.params['id'];
  if (id) {
    return inject(CommandesService)
      .find(id)
      .pipe(
        mergeMap((commandes: HttpResponse<ICommandes>) => {
          if (commandes.body) {
            return of(commandes.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default commandesResolve;
