import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CommandesFormulaItemComponent } from './list/commandes-formula-item.component';
import { CommandesFormulaItemDetailComponent } from './detail/commandes-formula-item-detail.component';
import { CommandesFormulaItemUpdateComponent } from './update/commandes-formula-item-update.component';
import CommandesFormulaItemResolve from './route/commandes-formula-item-routing-resolve.service';

const commandesFormulaItemRoute: Routes = [
  {
    path: '',
    component: CommandesFormulaItemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommandesFormulaItemDetailComponent,
    resolve: {
      commandesFormulaItem: CommandesFormulaItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommandesFormulaItemUpdateComponent,
    resolve: {
      commandesFormulaItem: CommandesFormulaItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommandesFormulaItemUpdateComponent,
    resolve: {
      commandesFormulaItem: CommandesFormulaItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default commandesFormulaItemRoute;
