import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewHotelComponent } from './pages/new-hotel/new-hotel.component';
import { SearchHotelComponent } from './pages/search-hotel/search-hotel.component';
import { ListHotelsComponent } from './pages/list-hotels/list-hotels.component';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';

//localhost:4200/hotels/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hotel', component: NewHotelComponent },
      { path: 'search', component: SearchHotelComponent },
      { path: 'edit/:id', component: NewHotelComponent },
      { path: 'list', component: ListHotelsComponent },
      { path: ':id', component: HotelPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
