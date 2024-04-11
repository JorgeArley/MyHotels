import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return  hotels ', () => {
    const hotelInformation =     [{
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
    }];
    service.getHotels().subscribe((res) => {
      expect(res).toEqual(hotelInformation)
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels');
    req.flush(hotelInformation);
  });

  it('should be return a hotel ', () => {
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
    service.getHotelById('1').subscribe((res) => {
      expect(res).toEqual(hotelInformation)
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels/1');
    req.flush(hotelInformation);
  });

  it('should be return  getSuggestions ', () => {
    const hotelInformation =     [{
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
    }];
    service.getSuggestions('test').subscribe((res) => {
      expect(res).toEqual(hotelInformation)
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels?q=test&_limit=6');
    req.flush(hotelInformation);
  });

  it('should be crate a hotel ', () => {
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
    service.addHotel(hotelInformation).subscribe((res) => {
      expect(res).toEqual(hotelInformation)
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels');
    req.flush(hotelInformation);
  });

  it('should be update a hotel ', () => {
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
    service.updateHotel(hotelInformation).subscribe((res) => {
      expect(res).toEqual(hotelInformation)
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels/1');
    req.flush(hotelInformation);
  });

  it('should be delete a hotel ', () => {
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
    service.deleteHotelById('1').subscribe((res) => {
      expect(res).toBeTrue();
    });
    const req = httpMock.expectOne('http://localhost:3000/hotels/1');
    req.flush(hotelInformation);
  });

});
