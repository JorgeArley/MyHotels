import { Component } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent {

  public hotels: Hotel[] = [];

  constructor( private hotelService: HotelService ) {}

  ngOnInit(): void {
    this.hotelService.getHotels()
      .subscribe( hotels => this.hotels = hotels);
  }
}
