import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CommandesComponent } from './list/commandes.component';
import { CommandesDetailComponent } from './detail/commandes-detail.component';
import { CommandesUpdateComponent } from './update/commandes-update.component';
import CommandesResolve from './route/commandes-routing-resolve.service';

const commandesRoute: Routes = [
  {
    path: '',
    component: CommandesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommandesDetailComponent,
    resolve: {
      commandes: CommandesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommandesUpdateComponent,
    resolve: {
      commandes: CommandesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommandesUpdateComponent,
    resolve: {
      commandes: CommandesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default commandesRoute;
