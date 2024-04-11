import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListHotelsComponent } from './list-hotels.component';
import { Observable, from, of } from 'rxjs';
import { HotelService } from '../../services/hotel.service';

import { Hotel } from '../../interfaces/hotel.interface';
import { CardHotelComponent } from '../../components/card-hotel/card-hotel.component';
import { HotelImagePipe } from '../../pipes/hotel-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

const hotelInformation =     {
  "id": "1",
  "name": "Hilton",
  "address": "Calle 3",
  "stars": "5",
  "creation_date": "6-15-22, 9:03 AM",
  "good_things": [
    "pool",
    "beach"
  ],
  "bad_things": [
    "garbage",
    "toilets"
  ],
  "url_image": ""
};

const mockHotelService: {
  getHotels: () => Observable<Hotel[]>
} = {
  getHotels: () => of([hotelInformation])
}

describe('ListHotelsComponent', () => {

  let component: ListHotelsComponent;
  let fixture: ComponentFixture<ListHotelsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ListHotelsComponent, CardHotelComponent, HotelImagePipe],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: HotelService, useValue: mockHotelService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHotels()', () => {
    const getHotelsSpy = spyOn(mockHotelService, 'getHotels');
    getHotelsSpy.and.returnValue(of([hotelInformation]));

    component.ngOnInit();
    expect(mockHotelService.getHotels).toHaveBeenCalled();
  });

});
