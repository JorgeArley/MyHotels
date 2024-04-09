import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Hotel } from '../interfaces/hotel.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getHotels():Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${ this.baseUrl }/hotels`);
  }

  getHotelById( id: string ): Observable<Hotel|undefined> {
    return this.http.get<Hotel>(`${ this.baseUrl }/hotels/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${ this.baseUrl }/hotels?q=${ query }&_limit=6`);
  }

  addHotel( hotel: Hotel ): Observable<Hotel> {
    return this.http.post<Hotel>(`${ this.baseUrl }/hotels`, hotel );
  }

  updateHotel( hotel: Hotel ): Observable<Hotel> {
    if ( !hotel.id ) throw Error('Hotel id is required');
    return this.http.patch<Hotel>(`${ this.baseUrl }/hotels/${ hotel.id }`, hotel );
  }

  deleteHotelById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/hotels/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}
