import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewHotelComponent } from './new-hotel.component';
import { HotelService } from '../../services/hotel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HotelImagePipe } from '../../pipes/hotel-image.pipe';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import Swal from 'sweetalert2';


describe('NewHotelComponent', () => {
  let component: NewHotelComponent;
  let fixture: ComponentFixture<NewHotelComponent>;
  let mockHotelService: jasmine.SpyObj<HotelService>;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockActivatedRoute = { params: of({ id: '123' }) };
    mockRouter = jasmine.createSpyObj('Router', ['edit']);
    mockHotelService = jasmine.createSpyObj('HotelService', ['getHotelById', 'updateHotel', 'addHotel']);

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

  it('should reset form with hotel data on ngOnInit', fakeAsync(() => {
    const mockHotel =     {
      "id": "",
      "name": "",
      "address": "",
      "stars": "",
      "creation_date": "",
      "good_things": [],
      "bad_things": [],
      "url_image": ""
    };
    mockHotelService.getHotelById.and.returnValue(of(mockHotel));

    component.ngOnInit();
    tick();

    expect(component.hotelForm.get('id')?.value).toBe('');
  }));


});
