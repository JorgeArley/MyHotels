import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewHotelComponent } from './new-hotel.component';
import { HotelService } from '../../services/hotel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HotelImagePipe } from '../../pipes/hotel-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Hotel } from '../../interfaces/hotel.interface';
import { Router } from '@angular/router';

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

let mockHotelService: {
  getHotels: () => Observable<Hotel[]>,
  getHotelById: () => Observable<Hotel | undefined>,
  getSuggestions: () => Observable<Hotel[]>,
  addHotel: () => Observable<Hotel>,
  updateHotel: () => Observable<Hotel>,
  deleteHotelById: () => Observable<boolean>
} = {
  getHotels: () => of([hotelInformation]),
  getHotelById: () => of(hotelInformation),
  getSuggestions: () => of([hotelInformation]),
  addHotel: () => of(hotelInformation),
  updateHotel: () => of(hotelInformation),
  deleteHotelById: () => of(true)
}


describe('NewHotelComponent', () => {
  let component: NewHotelComponent;
  let fixture: ComponentFixture<NewHotelComponent>;
  // let mockHotelService: jasmine.SpyObj<HotelService>;
  let mockActivatedRoute: any;
  let router: Router;

  beforeEach(async () => {
    mockActivatedRoute = { params: of({ id: '123' }) };
    // mockRouter = jasmine.createSpyObj('Router', ['edit']);
    //  mockHotelService = jasmine.createSpyObj('HotelService', ['getHotelById', 'updateHotel', 'addHotel']);

    await TestBed.configureTestingModule({
      declarations: [NewHotelComponent, HotelImagePipe],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
      ],
      providers: [
        { provide: HotelService, useValue: mockHotelService }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.hotelForm.value).toEqual({
      id: '',
      name: '',
      address: '',
      stars: '',
      creation_date: '',
      good_things: '',
      bad_things: '',
      url_image: ''
    });
  });

  it('should call onSubmit() and create a hotel', () => {
    const onSubmitSpy = spyOn(mockHotelService, 'addHotel');
    onSubmitSpy.and.returnValue(of(hotelInformation));

    spyOn(router, 'navigate');
    component.onSubmit();

    expect(mockHotelService.addHotel).toHaveBeenCalled();
  });

  it('should call onSubmit() and updata hotel', () => {
    const onSubmitSpy = spyOn(mockHotelService, 'addHotel');
    onSubmitSpy.and.returnValue(of(hotelInformation));

    component.currentHotel.id = '1';
    component.onSubmit();


  });

  it('should not call getHotelById()', () => {
    const getHotelByIdSpy = spyOn(mockHotelService, 'getHotelById');
    getHotelByIdSpy.and.returnValue(of(hotelInformation));

    spyOn(router, 'navigate');
    component.ngOnInit();

    expect(mockHotelService.getHotelById).not.toHaveBeenCalled();
  });


});
