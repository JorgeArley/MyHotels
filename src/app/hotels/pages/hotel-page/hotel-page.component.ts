import { Component } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { HotelService } from '../../services/hotel.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent {
  public hotel?: Hotel;

  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.hotelService.getHotelById( id )),
      )
      .subscribe( hotel => {
        if ( !hotel ) return this.router.navigate([ '/hotels/list' ]);
        this.hotel = hotel;
        console.log(hotel)
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('hotels/list');
  }
}
