import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotelsComponent } from './list-hotels.component';

describe('ListHotelsComponent', () => {
  let component: ListHotelsComponent;
  let fixture: ComponentFixture<ListHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHotelsComponent]
    });
    fixture = TestBed.createComponent(ListHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
