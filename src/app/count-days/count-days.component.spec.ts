import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDaysComponent } from './count-days.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';

import * as moment from 'moment';

describe('CountDaysComponentTest', () => {
  let component: CountDaysComponent;
  let fixture: ComponentFixture<CountDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, ReactiveFormsModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule ],
      declarations: [ CountDaysComponent ],
      providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should have default values", function() {
    expect(component.durationForm.controls.start.value).toEqual('');
    expect(component.durationForm.controls.end.value).toEqual('');
    expect(component.durationForm.controls.includeStart.value).toEqual(true);
    expect(component.durationForm.controls.includeEnd.value).toEqual(false);
    
    expect(component.resultDays).toBeFalsy();
    expect(component.resultWeekdays).toBeFalsy();
    expect(component.resultWeeksAndDays).toBeFalsy();
  });

  it("should count calendar days", function() {
    const today: string = '2019-07-07';
    doTestCalculateDays(today, today, true, false, '0 days');
    doTestCalculateDays(today, today, false, true, '0 days');
    doTestCalculateDays(today, today, true, true, '1 day');
    doTestCalculateDays(today, today, false, false, '0 days');

    doTestCalculateDays('2013-10-14', '2013-10-15', true, false, '1 day');
    doTestCalculateDays('2013-10-14', '2013-10-15', false, true, '1 day');
    doTestCalculateDays('2013-10-14', '2013-10-15', true, true, '2 days');
    doTestCalculateDays('2013-10-14', '2013-10-15', false, false, '0 days');
    
    doTestCalculateDays('2013-10-14', '2013-10-16', true, false, '2 days');
    doTestCalculateDays('2013-10-14', '2013-10-16', false, true, '2 days');
    doTestCalculateDays('2013-10-14', '2013-10-16', true, true, '3 days');
    doTestCalculateDays('2013-10-14', '2013-10-16', false, false, '1 day');
  });

  it("should count weekdays", function() {
    // Across the AUS day light savings  
    doTestCalculateWeekdays('2013-10-04', '2013-10-07', true, false, '1 weekday');
    doTestCalculateWeekdays('2013-10-04', '2013-10-07', false, true, '1 weekday');
    doTestCalculateWeekdays('2013-10-04', '2013-10-07', true, true, '2 weekdays');
    doTestCalculateWeekdays('2013-10-04', '2013-10-07', false, false, '0 weekdays');
    
    doTestCalculateWeekdays('2013-10-05', '2013-10-08', true, false, '1 weekday');
    doTestCalculateWeekdays('2013-10-05', '2013-10-08', false, true, '2 weekdays');
    doTestCalculateWeekdays('2013-10-05', '2013-10-08', true, true, '2 weekdays');
    doTestCalculateWeekdays('2013-10-05', '2013-10-08', false, false, '1 weekday');
    
    doTestCalculateWeekdays('2013-10-07', '2013-10-15', true, false, '6 weekdays');
    doTestCalculateWeekdays('2013-10-07', '2013-10-15', false, true, '6 weekdays');
    doTestCalculateWeekdays('2013-10-07', '2013-10-15', true, true, '7 weekdays');
    doTestCalculateWeekdays('2013-10-07', '2013-10-15', false, false, '5 weekdays');
  });

  function doTestCalculateDays(
      startStr: string, 
      endStr: string, 
      includeStart: boolean, 
      includeEnd: boolean, 
      expectResult: string) {
    doTestCalculate(startStr, endStr, includeStart, includeEnd, 'resultDays', expectResult);
  }

  function doTestCalculateWeekdays(
      startStr: string, 
      endStr: string, 
      includeStart: boolean, 
      includeEnd: boolean, 
      expectResult: string) {
    doTestCalculate(startStr, endStr, includeStart, includeEnd, 'resultWeekdays', expectResult);
  }

  function doTestCalculateWeeksAndDays(
      startStr: string, 
      endStr: string, 
      includeStart: boolean, 
      includeEnd: boolean, 
      expectResult: string) {
    doTestCalculate(startStr, endStr, includeStart, includeEnd, 'resultWeeksAndDays', expectResult);
  }

  function doTestCalculate(
      startStr: string, 
      endStr: string, 
      includeStart: boolean, 
      includeEnd: boolean, 
      resultProperty: string,
      expectResult: string) {
    component.durationForm.controls.start.value = newDate(startStr);
    component.durationForm.controls.end.value = newDate(endStr);
    component.durationForm.controls.includeStart.value = includeStart;
    component.durationForm.controls.includeEnd.value = includeEnd;
    component.calculate();
    expect(component[resultProperty]).toEqual(expectResult);
  }

  function newDate(dateStr: string) {
    return moment(dateStr, 'YYYY-MM-DD')
  }
});

