import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
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
      private feedbackService: FeedbackService,
      private db: AngularFirestore) {
    this.theForm = this.formBuilder.group({
      name: '',
      email: '',
      comments: ''
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
