import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    data: { pageTitle: 'restaurantappApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  {
    path: 'client',
    data: { pageTitle: 'restaurantappApp.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  {
    path: 'product-category',
    data: { pageTitle: 'restaurantappApp.productCategory.home.title' },
    loadChildren: () => import('./product-category/product-category.routes'),
  },
  {
    path: 'formula',
    data: { pageTitle: 'restaurantappApp.formula.home.title' },
    loadChildren: () => import('./formula/formula.routes'),
  },
  {
    path: 'commandes',
    data: { pageTitle: 'restaurantappApp.commandes.home.title' },
    loadChildren: () => import('./commandes/commandes.routes'),
  },
  {
    path: 'commandes-formula-item',
    data: { pageTitle: 'restaurantappApp.commandesFormulaItem.home.title' },
    loadChildren: () => import('./commandes-formula-item/commandes-formula-item.routes'),
  },
  {
    path: 'commandes-product-item',
    data: { pageTitle: 'restaurantappApp.commandesProductItem.home.title' },
    loadChildren: () => import('./commandes-product-item/commandes-product-item.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
