import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const DAYS_PER_WEEK = 7;

@Component({
  selector: 'app-count-days',
  templateUrl: './count-days.component.html',
  styleUrls: ['./count-days.component.css']
})
export class CountDaysComponent implements OnInit {
  durationForm;
  resultDays: string;
  resultWeekdays: string;
  resultWeeksAndDays: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.durationForm = this.formBuilder.group({
      start: '',
      end: '',
      includeStart: true,
      includeEnd: false
    });
  }

  calculateDuration() {
    let start: string = this.durationForm.controls.start.value;
    let end: string = this.durationForm.controls.end.value;
    let includeStart: boolean = this.durationForm.controls.includeStart.value;
    let includeEnd: boolean = this.durationForm.controls.includeEnd.value;
    if (start && end) {
      const startDate: Date = new Date(start);
      const endDate: Date = new Date(end);
      let days: number = this.daysBetween(startDate, endDate, includeStart, includeEnd);
      let unit: string = (days === 1 ? 'day' : 'days');
      
      this.resultDays = (days + ' ' + unit);
      this.resultWeekdays = this.weekdaysBetween(startDate, endDate, includeStart, includeEnd);
      this.resultWeeksAndDays = this.toWeeksAndDays(days);
    }
  }

  daysBetween(firstDate: Date, secondDate: Date, includeFirstDate: boolean, includeSecondDate: boolean): number {
    let result: number = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (DAY_IN_MILLISECONDS)));
    if (result === 0) {
        if (includeFirstDate && includeSecondDate) result++;
    } else {
      result--;
      if (includeFirstDate) result++;
      if (includeSecondDate) result++;
    }
    return result;
  }

  weekdaysBetween(firstDate: Date, secondDate: Date, includeFirstDate: boolean, includeSecondDate: boolean): string {
    if (firstDate.getTime() > secondDate.getTime()) {
        return this.weekdaysBetween(secondDate, firstDate, includeSecondDate, includeFirstDate);
    }
    
    let firstInclusiveWeekDay: Date = (includeFirstDate ? firstDate : this.addDays(firstDate, 1));
    if (firstInclusiveWeekDay.getDay() == 6) {
        firstInclusiveWeekDay = this.addDays(firstInclusiveWeekDay, 2);
    } else if (firstInclusiveWeekDay.getDay() == 0) {
        firstInclusiveWeekDay = this.addDays(firstInclusiveWeekDay, 1);
    }
    
    let secondInclusiveWeekDay: Date = (includeSecondDate ? secondDate : this.addDays(secondDate, -1));
    if (secondInclusiveWeekDay.getDay() == 6) {
        secondInclusiveWeekDay = this.addDays(secondInclusiveWeekDay, -1);
    } else if (secondInclusiveWeekDay.getDay() == 0) {
        secondInclusiveWeekDay = this.addDays(secondInclusiveWeekDay, -2);
    }
    
    let weekdays: number = 0;
    if (firstInclusiveWeekDay <= secondInclusiveWeekDay) {
        var days = this.daysBetween(firstInclusiveWeekDay, secondInclusiveWeekDay, true, true);
        var weeks = (days - (days % DAYS_PER_WEEK)) / DAYS_PER_WEEK;
        var weekends = (firstInclusiveWeekDay.getDay() - 1 > secondInclusiveWeekDay.getDay() ? weeks + 1 : weeks);
        weekdays = days - weekends * 2;
    }
    let weekdayUnit: string = (weekdays === 1 ? 'weekday' : 'weekdays');
    
    return weekdays + ' ' + weekdayUnit;
  };

  toWeeksAndDays(days: number): string {
    let daysInWeek : number = days % 7;
    let dayUnit : string = (daysInWeek === 1 ? 'day' : 'days');
    
    let weeks : number = (days - daysInWeek) / 7;
    let weekUnit : string = (weeks === 1 ? 'week' : 'weeks');
    
    return weeks + ' ' + weekUnit + ' ' + daysInWeek + ' ' + dayUnit;
  }

  addDays(baseDate: Date, days: number): Date {
    return new Date(baseDate.getTime() + DAY_IN_MILLISECONDS * days);
  };

  ngOnInit() {
    this.durationForm.valueChanges.subscribe(() => this.calculateDuration());
  }
}