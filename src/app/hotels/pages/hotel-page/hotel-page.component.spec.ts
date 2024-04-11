import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPageComponent } from './hotel-page.component';
import { HotelService } from '../../services/hotel.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hotel } from '../../interfaces/hotel.interface';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { HotelImagePipe } from '../../pipes/hotel-image.pipe';

const hotelInformation = {
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
  getHotelById: () => Observable<Hotel | undefined>
} = {
  getHotelById: () => of(hotelInformation)
}

describe('HotelPageComponent', () => {
  let component: HotelPageComponent;
  let fixture: ComponentFixture<HotelPageComponent>;
  let router: Router;
  let activateRoute: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [HotelPageComponent, HotelImagePipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
      ],
      providers: [
        { provide: HotelService, useValue: mockHotelService }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    activateRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHotelById()', () => {

    const getHotelByIdSpy = spyOn(mockHotelService, 'getHotelById');
    getHotelByIdSpy.and.returnValue(of(hotelInformation));
    component.ngOnInit();
    expect(mockHotelService.getHotelById).toHaveBeenCalled();
  });


});
