import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CommandesProductItemComponent } from './list/commandes-product-item.component';
import { CommandesProductItemDetailComponent } from './detail/commandes-product-item-detail.component';
import { CommandesProductItemUpdateComponent } from './update/commandes-product-item-update.component';
import CommandesProductItemResolve from './route/commandes-product-item-routing-resolve.service';

const commandesProductItemRoute: Routes = [
  {
    path: '',
    component: CommandesProductItemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommandesProductItemDetailComponent,
    resolve: {
      commandesProductItem: CommandesProductItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommandesProductItemUpdateComponent,
    resolve: {
      commandesProductItem: CommandesProductItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommandesProductItemUpdateComponent,
    resolve: {
      commandesProductItem: CommandesProductItemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default commandesProductItemRoute;
