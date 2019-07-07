import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

export interface ActionOption {
  value: string;
  label: string;
}

export enum DayType {
  Calendar = "Calendar",
  Business = "Business",
}

export enum ActionType {
  Add = "Add",
  Subtract = "Subtract",
}

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const DAYS_PER_WEEK = 7;
const WEEKDAYS_PER_WEEK = 5;

@Component({
  selector: 'app-add-days',
  templateUrl: './add-days.component.html',
  styleUrls: ['./add-days.component.css']
})
export class AddDaysComponent implements OnInit {
  addDaysForm;
  actionOptions: ActionOption[] = [
    {value: "Add", label: "(+) Add"},
    {value: "Subtract", label: "(-) Subtract"}
  ];
  result: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.addDaysForm = this.formBuilder.group({
      dayType: DayType.Calendar,
      start: '',
      action: ActionType.Add,
      years: '',
      weeks: '',
      days: ''
    });
  }

  ngOnInit() {
    this.addDaysForm.valueChanges.subscribe(() => this.calculate());
  }

  calculate() {
    this.result = "";

    const dayType: string = this.addDaysForm.controls.dayType.value;
    const start = this.addDaysForm.controls.start.value;   // a momentJs object
    const action: string = this.addDaysForm.controls.action.value;
    const years: number = this.addDaysForm.controls.years.value;
    const weeks: number = this.addDaysForm.controls.weeks.value;
    const days: number = this.addDaysForm.controls.days.value;

    if (start && (years || weeks || days)) {
      const actionType: ActionType = ActionType[action];
      const startDate: Date = start.toDate();
      if (dayType === DayType.Calendar) {
        this.result = this.doCalendarDays(startDate, years, weeks, days, actionType);
      } else if (dayType === DayType.Business) {
        this.result = this.doWeekdays(startDate, days, actionType);
      }
    }
  };

  doCalendarDays(start: Date, years: number, weeks: number, days: number, action: ActionType) {
    let endDate: Date = new Date(start.getTime());
    if (action == ActionType.Subtract) years = -years;
    if (years) endDate = this.addYears(endDate, years);
    
    var ds = 0; // Total days including days converted from weeks param and days param.
    if (action == ActionType.Add) {
        if (weeks) ds += weeks * DAYS_PER_WEEK;
        if (days) ds += days;
    } else if (action == ActionType.Subtract) {
        if (weeks) ds -= weeks * DAYS_PER_WEEK;
        if (days) ds -= days;
    }
    endDate = this.addDays(endDate, ds);
    
    return endDate.toDateString();
  };

  // TODO: common functions shared by count-days
  addYears(baseDate: Date, years: number): Date {
    let endDate: Date = new Date(baseDate.getTime());
    endDate.setFullYear(endDate.getFullYear() + years);
    return endDate;
  };

  addDays(baseDate: Date, days: number): Date {
    let result : Date = new Date(baseDate.getTime()); // Do not change baseDate
    result.setDate(baseDate.getDate() + days);
    return result;
  };

  doWeekdays(startDate: Date, weekdays: number, action: ActionType) {
    if (action == ActionType.Add) return this.addWeekdays(startDate, weekdays);
    if (action == ActionType.Subtract) return this.subtractWeekdays(startDate, weekdays);
  };

  addWeekdays(startDate: Date, weekdays: number) {
    let inclusiveStartWeekday: Date = this.addDays(startDate, 1);
    if (inclusiveStartWeekday.getDay() == 6) inclusiveStartWeekday = this.addDays(inclusiveStartWeekday, 2);
    if (inclusiveStartWeekday.getDay() == 0) inclusiveStartWeekday = this.addDays(inclusiveStartWeekday, 1);
    
    let weeks: number = (weekdays - weekdays % WEEKDAYS_PER_WEEK) / WEEKDAYS_PER_WEEK;
    let remainingDays: number = weekdays % WEEKDAYS_PER_WEEK;
    
    let afterWeeksWeekday: Date = this.addDays(inclusiveStartWeekday, weeks * DAYS_PER_WEEK); // Still a weekday
    if (afterWeeksWeekday.getDay() + remainingDays >= 6) remainingDays += 2; // 6 represents Saturday
    let endDate: Date = this.addDays(afterWeeksWeekday, remainingDays - 1);
    if (endDate.getDay() == 0) endDate = this.addDays(endDate, -2);
    
    return endDate.toDateString();
  };

  subtractWeekdays(startDate: Date, weekdays: number) {
    let inclusiveStartWeekday: Date = this.addDays(startDate, -1);
    if (inclusiveStartWeekday.getDay() == 6) inclusiveStartWeekday = this.addDays(inclusiveStartWeekday, -1);
    if (inclusiveStartWeekday.getDay() == 0) inclusiveStartWeekday = this.addDays(inclusiveStartWeekday, -2);
    
    let weeks: number = (weekdays - weekdays % WEEKDAYS_PER_WEEK) / WEEKDAYS_PER_WEEK;
    let remainingDays: number = weekdays % WEEKDAYS_PER_WEEK;
    
    let weeksAgoWeekday: Date = this.addDays(inclusiveStartWeekday, -weeks * DAYS_PER_WEEK); // Still a weekday
    if (weeksAgoWeekday.getDay() - remainingDays <= 0) remainingDays += 2; // 0 represents Sunday
    let endDate: Date = this.addDays(weeksAgoWeekday, -remainingDays + 1);
    if (endDate.getDay() == 6) endDate = this.addDays(endDate, 2);
    
    return endDate.toDateString();
  };
}
