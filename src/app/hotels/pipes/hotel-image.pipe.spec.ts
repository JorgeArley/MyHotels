import { HotelImagePipe } from './hotel-image.pipe';

const hotel =     {
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

describe('HotelImagePipe', () => {
  it('create an instance', () => {
    const pipe = new HotelImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "assets/noimage.png"', () => {
    const pipe = new HotelImagePipe();
    const result = pipe.transform(hotel);
    expect(result).toBe('assets/noimage.png');
  });
});
