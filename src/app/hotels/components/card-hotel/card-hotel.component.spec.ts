import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hotel } from '../../interfaces/hotel.interface';
import { CardHotelComponent } from './card-hotel.component';
import { HotelImagePipe } from '../../pipes/hotel-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

const mockHotel = {
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
}

describe('CardHotelComponent', () => {

  let component: CardHotelComponent;
  let fixture: ComponentFixture<CardHotelComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [CardHotelComponent, HotelImagePipe],
      imports: [
        RouterTestingModule,
        MatIconModule,

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHotelComponent);
    component = fixture.componentInstance;
    component.hotel = mockHotel;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.hotel.address).toBe('Calle 3')
  });
});
