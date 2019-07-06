import { TestBed, async } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AddDaysComponent } from './add-days/add-days.component';
import { AppComponent } from './app.component';
import { CountDaysComponent } from './count-days/count-days.component';
import { TopBarComponent } from './top-bar/top-bar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddDaysComponent, AppComponent, CountDaysComponent, TopBarComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatTabsModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
          { path: '', component: AppComponent },
        ])
      ],
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-au'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the correct title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Date Calculator');
  });

  it('should render the top bar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-top-bar').textContent).toContain('');
  });
});
