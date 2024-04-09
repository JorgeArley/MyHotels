import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';

@Pipe({
  name: 'hotelImage'
})
export class HotelImagePipe implements PipeTransform {

  transform(hotel: Hotel): string {
    if (!hotel.url_image) {
      return 'assets/noimage.png';
    }
    return hotel.url_image
  }

}
