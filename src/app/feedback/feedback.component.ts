import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FeedbackService } from '../shared/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  theForm;
  feedbacks: Observable<any[]>;

  constructor(
      private formBuilder: FormBuilder,
      private feedbackService: FeedbackService) {
    this.theForm = this.formBuilder.group({
      name: '',
      email: ['', Validators.required],
      comments: ['', Validators.required]
    });
    this.feedbacks = feedbackService.getAllFeedback();
  }

  ngOnInit() {
  }

  onSubmit(value){
    this.feedbackService.createFeedback(value)
    .then(
      res => {
      }
    )
  }
}
