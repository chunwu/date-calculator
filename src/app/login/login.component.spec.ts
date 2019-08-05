import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from '../app.module';

import { CommonServiceStubModule } from '../../../testing/common-service-stub/common-service-stub.module'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AppModule,
      CommonServiceStubModule,
      ],
  }));

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LoginComponent ],
  //     imports: [ AppModule, CommonServiceStubModule ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
