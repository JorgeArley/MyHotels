import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HotelService } from '../../services/hotel.service';
import { SearchHotelComponent } from './search-hotel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hotel } from '../../interfaces/hotel.interface';
import { of } from 'rxjs';

describe('SearchHotelComponent', () => {
  let component: SearchHotelComponent;
  let fixture: ComponentFixture<SearchHotelComponent>;
  let mockHotelService: jasmine.SpyObj<HotelService>;

  const hotel = {
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
  beforeEach(async () => {
    mockHotelService = jasmine.createSpyObj('HotelService', ['getSuggestions']);

    await TestBed.configureTestingModule({
      declarations: [SearchHotelComponent],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        FormsModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: HotelService, useValue: mockHotelService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call hotelService.getSuggestions when calling searchHotel', () => {
    const mockHotels: Hotel[] = [hotel, hotel];
    mockHotelService.getSuggestions.and.returnValue(of(mockHotels));

    component.searchInput.setValue('Hilton');
    component.searchHotel();

    expect(mockHotelService.getSuggestions).toHaveBeenCalledWith('Hilton');
    expect(component.hoteles).toEqual(mockHotels);
  });

  it('should set selectedHotel and searchInput value when calling onSelectedOption', () => {
    const mockEvent: MatAutocompleteSelectedEvent = { option: { value: hotel } } as any;

    component.onSelectedOption(mockEvent);

    expect(component.selectedHotel).toEqual(hotel);
    expect(component.searchInput.value).toEqual('Hilton');
  });

  it('should reset selectedHotel to undefined when onSelectedOption receives empty event', () => {
    const mockEvent: MatAutocompleteSelectedEvent = { option: { value: null } } as any;

    component.selectedHotel = hotel;
    component.onSelectedOption(mockEvent);

    expect(component.selectedHotel).toBeUndefined();
    expect(component.searchInput.value).toEqual('');
  });
});
