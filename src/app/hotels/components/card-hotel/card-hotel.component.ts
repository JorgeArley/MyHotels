import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'hotels-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.css']
})
export class CardHotelComponent implements OnInit {

  @Input() public hotel!:Hotel;

  ngOnInit(): void {
    if (!this.hotel) throw  Error('Hero property is required.');
  }
}
