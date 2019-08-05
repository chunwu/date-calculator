import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material';

import { AppModule } from '../app.module';

import { CommonServiceStubModule } from '../../../testing/common-service-stub/common-service-stub.module'
import { FeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ BrowserAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule, CommonServiceStubModule ],
  //     declarations: [ FeedbackComponent ]
  //   })
  //   .compileComponents();
  // }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AppModule,
      CommonServiceStubModule,
      ],
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
