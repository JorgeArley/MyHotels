import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewHotelComponent } from './pages/new-hotel/new-hotel.component';
import { ListHotelsComponent } from './pages/list-hotels/list-hotels.component';
import { SearchHotelComponent } from './pages/search-hotel/search-hotel.component';
import { MaterialModule } from '../material/material.module';
import { CardHotelComponent } from './components/card-hotel/card-hotel.component';
import { HotelImagePipe } from './pipes/hotel-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HotelPageComponent,
    LayoutPageComponent,
    NewHotelComponent,
    ListHotelsComponent,
    SearchHotelComponent,
    CardHotelComponent,
    HotelImagePipe
  ],
  imports: [
    CommonModule,
    HotelsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HotelsModule { }
