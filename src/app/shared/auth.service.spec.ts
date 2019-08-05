import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { AuthService } from './auth.service';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { AppModule } from '../app.module';

import { CommonServiceStubModule } from '../../../testing/common-service-stub/common-service-stub.module'

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AppModule,
      CommonServiceStubModule,
      ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
