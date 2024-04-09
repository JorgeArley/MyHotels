import { Component } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { FormControl } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.css']
})
export class SearchHotelComponent {
  public searchInput = new FormControl('');
  public hoteles: Hotel[] = [];
  public selectedHotel?: Hotel;

  constructor( private hotelService: HotelService ){}

  searchHotel() {
    const value: string = this.searchInput.value || '';

    this.hotelService.getSuggestions( value )
      .subscribe( hoteles => this.hoteles = hoteles );
  }

  //envent to return a name return
  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHotel = undefined;
      return;
    }

    const hotel: Hotel = event.option.value;
    this.searchInput.setValue( hotel.name );

    this.selectedHotel = hotel;

  }

}
