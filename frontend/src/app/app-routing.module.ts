import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { DetailComponent } from './components/detail/detail.component';
import { PurchaseComponent } from './components/purchase/purchase.component';


const routes: Routes = [
  {
    path: 'concerts',
    component: MenuComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: '',
    redirectTo: '/concerts',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
