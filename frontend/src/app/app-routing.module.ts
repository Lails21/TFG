import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { DetailComponent } from './components/detail/detail.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ConcertsComponent } from './components/concerts/concerts.component';


const routes: Routes = [
  {
    path: 'concerts',
    component: MenuComponent
  },
  {
    path: 'detail/:idConcert',
    component: DetailComponent
  },
  {
    path: 'userConcert',
    component: ConcertsComponent
  },
  {
    path: 'purchase/:idConcert',
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
