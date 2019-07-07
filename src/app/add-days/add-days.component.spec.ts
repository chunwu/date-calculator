import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaysComponent, ActionType, DayType } from './add-days.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import * as moment from 'moment';

describe('AddDaysComponent', () => {
  let component: AddDaysComponent;
  let fixture: ComponentFixture<AddDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule, MatSelectModule ],
      declarations: [ AddDaysComponent ],
      providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should have default values", function() {
    expect(component.actionOptions[0].label).toEqual('(+) Add');
    expect(component.actionOptions[1].label).toEqual('(-) Subtract');
    expect(component.addDaysForm.controls.dayType.value).toEqual('Calendar');
    expect(component.addDaysForm.controls.start.value).toEqual('');
    expect(component.addDaysForm.controls.action.value).toEqual('Add');
    expect(component.addDaysForm.controls.years.value).toEqual('');
    expect(component.addDaysForm.controls.weeks.value).toEqual('');
    expect(component.addDaysForm.controls.days.value).toEqual('');
    expect(component.result).toBeFalsy();
  });

  it("should add/subtract calendar days", function() {
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Add, 0, 0, 3, 'Tue Jun 04 2019');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Add, 0, 2, 0, 'Sat Jun 15 2019');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Add, 1, 0, 0, 'Mon Jun 01 2020');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Add, 1, 2, 3, 'Thu Jun 18 2020');

    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Subtract, 0, 0, 3, 'Wed May 29 2019');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Subtract, 0, 2, 0, 'Sat May 18 2019');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Subtract, 1, 0, 0, 'Fri Jun 01 2018');
    doTestAddOrSubtractCalendarDays(newDate('2019-06-01'), ActionType.Subtract, 1, 2, 3, 'Tue May 15 2018');
  });

  it("should add/subtract business days", function() {
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 1, 'Mon Jun 03 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 2, 'Tue Jun 04 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 3, 'Wed Jun 05 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 4, 'Thu Jun 06 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 5, 'Fri Jun 07 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 6, 'Mon Jun 10 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Add, 7, 'Tue Jun 11 2019');

    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 1, 'Fri May 31 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 2, 'Thu May 30 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 3, 'Wed May 29 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 4, 'Tue May 28 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 5, 'Mon May 27 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 6, 'Fri May 24 2019');
    doTestAddOrSubtractBusinessDays(newDate('2019-06-01'), ActionType.Subtract, 7, 'Thu May 23 2019');
  });

  function newDate(dateStr: string) {
    return moment(dateStr, 'YYYY-MM-DD')
  }

  function doTestAddOrSubtractCalendarDays(
      startDate,
      action: ActionType, 
      years: number, 
      weeks: number, 
      days: number,
      expectedResult: string) {
    component.addDaysForm.controls.dayType.value = DayType.Calendar;
    component.addDaysForm.controls.start.value = startDate;
    component.addDaysForm.controls.action.value = action;
    component.addDaysForm.controls.years.value = years;
    component.addDaysForm.controls.weeks.value = weeks;
    component.addDaysForm.controls.days.value = days;
    component.calculate()
    expect(component.result).toEqual(expectedResult);
  };

  function doTestAddOrSubtractBusinessDays(
      startDate, 
      action: ActionType, 
      days: number, 
      expectedResult) {
    component.addDaysForm.controls.dayType.value = DayType.Business;
    component.addDaysForm.controls.start.value = startDate;
    component.addDaysForm.controls.action.value = action;
    component.addDaysForm.controls.days.value = days;
    component.calculate()
    expect(component.result).toEqual(expectedResult);
  };
});

