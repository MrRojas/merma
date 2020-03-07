import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'mermas',
    loadChildren: () => import('./pages/mermas/mermas.module').then( m => m.MermasPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },

  {
    path: 'proveedor',
    loadChildren: () => import('./pages/proveedor/proveedor.module').then( m => m.ProveedorPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'get/categories',
    loadChildren: () => import('./pages/list-categories/list-categories.module').then( m => m.ListCategoriesPageModule)
  },
  {
    path: 'get/partner',
    loadChildren: () => import('./pages/list-proveedores/list-proveedores.module').then( m => m.ListProveedoresPageModule)
  },
  {
    path: 'storage/categorie',
    loadChildren: () => import('./pages/edit-categories/edit-categories.module').then( m => m.EditCategoriesPageModule)
  },
  {
    path: 'storage/proveedor',
    loadChildren: () => import('./pages/edit-proveedor/edit-proveedor.module').then( m => m.EditProveedorPageModule)
  },
  {
    path: 'buy/step1',
    loadChildren: () => import('./pages/buy-step1/buy-step1.module').then( m => m.BuyStep1PageModule)
  },
  {
    path: 'buy/step2',
    loadChildren: () => import('./pages/buy-step2/buy-step2.module').then( m => m.BuyStep2PageModule)
  },
  {
    path: 'get/buy',
    loadChildren: () => import('./pages/list-buy/list-buy.module').then( m => m.ListBuyPageModule)
  },
  {
    path: 'buy-step3',
    loadChildren: () => import('./pages/buy-step3/buy-step3.module').then( m => m.BuyStep3PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
