import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CommonServiceStubModule } from '../../../testing/common-service-stub/common-service-stub.module'

import { AddDaysComponent } from '../add-days/add-days.component';
import { CountDaysComponent } from '../count-days/count-days.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddDaysComponent, CountDaysComponent, FeedbackComponent, HomeComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonServiceStubModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
          { path: '', component: HomeComponent },
        ])
      ],
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-au'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
