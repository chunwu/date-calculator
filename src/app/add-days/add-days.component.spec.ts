import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaysComponent } from './add-days.component';

describe('AddDaysComponent', () => {
  let component: AddDaysComponent;
  let fixture: ComponentFixture<AddDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
