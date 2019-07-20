import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  addDays(baseDate: Date, days: number): Date {
    let result : Date = new Date(baseDate.getTime()); // Do not change baseDate
    result.setDate(baseDate.getDate() + days);
    return result;
  };
}
