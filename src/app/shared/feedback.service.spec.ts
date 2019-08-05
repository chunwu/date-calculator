import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';

import { FeedbackService } from './feedback.service';
import { CommonServiceStubModule } from '../../../testing/common-service-stub/common-service-stub.module'

describe('FeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AppModule,
      CommonServiceStubModule,
      ],
  }));

  it('should be created', () => {
    const service: FeedbackService = TestBed.get(FeedbackService);
    expect(service).toBeTruthy();
  });
});
