import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { Hotel } from '../../interfaces/hotel.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hotel',
  templateUrl: './new-hotel.component.html',
  styleUrls: ['./new-hotel.component.css']
})
export class NewHotelComponent {

  public stars = [
    { amount: '1' },
    { amount: '2' },
    { amount: '3' },
    { amount: '4' },
    { amount: '5' },
  ];
  constructor(
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  public hotelForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(1)]],
    address: ['', [Validators.required, Validators.minLength(1)]],
    stars: ['', [Validators.required, Validators.maxLength(1)]],
    creation_date: [''],
    good_things: ['', [Validators.required, Validators.minLength(1)]],
    bad_things: ['', [Validators.required, Validators.minLength(1)]],
    url_image: [''],
  });



  get currentHotel(): Hotel {
    const hotel = this.hotelForm.value as Hotel;
    return hotel;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.hotelService.getHotelById(id)),
      ).subscribe(hotel => {

        if (!hotel) {
          return this.router.navigateByUrl('/');
        }

        this.hotelForm.reset(hotel);
        return;
      });
  }



  onSubmit(): void {
    let date = new Date();
    this.dateFormat(date)
    if (typeof this.currentHotel.bad_things === 'string') {
      let bad_things = this.hotelForm.get('bad_things')?.value as unknown as string;
      this.currentHotel.bad_things = bad_things.split(',');
    }

    if (typeof this.currentHotel.good_things === 'string') {
      let good_things = this.hotelForm.get('good_things')?.value as unknown as string;
      this.currentHotel.good_things = good_things.split(',');
    }

    if ( this.currentHotel.id ) {
      this.hotelService.updateHotel( this.currentHotel )
        .subscribe( hotel => {
          Swal.fire({
            title: "Good job!",
            text: `Hotel "${this.currentHotel.name}" Updated!!!`,
            icon: "success"
          });
        });

      return;
    }

    this.currentHotel.creation_date = this.dateFormat(new Date);
    this.hotelService.addHotel(this.currentHotel)
      .subscribe(hotel => {
        this.router.navigate(['/hotels/edit', hotel.id]);
        Swal.fire({
          title: "Good job!!",
          text: `Hotel "${this.currentHotel.name}" Created!!!`,
          icon: "success"
        });
      });
  }

  onDeleteHotel() {
    if (!this.currentHotel.id) throw Error('Hotel id is required');

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.deleteHotelById(this.currentHotel.id)
          .subscribe(() => {
            Swal.fire({
              title: "Deleted!",
              text: `The hotel "${this.currentHotel.name}" has been deleted.`,
              icon: "success"
            });
            this.router.navigate(['/hotels']);
          })
      }
    });
  }

  dateFormat(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const am_pm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    var formato_date = `${month}-${day}-${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${am_pm}`;
    return formato_date
  }

  inputValidate(nameInpt: string): boolean | undefined {
    return this.hotelForm.get(nameInpt)?.invalid && this.hotelForm.get(nameInpt)?.touched;
  }

}
