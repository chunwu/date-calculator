import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FeedbackService } from '../shared/feedback.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  theForm;
  feedbacks: Observable<any[]>;
  submitted: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private feedbackService: FeedbackService,
      private authService: AuthService) {
  }

  ngOnInit() {
    this.theForm = this.formBuilder.group({
      name: '',
      email: ['', Validators.required],
      comments: ['', Validators.required]
    });

    // Pre-populate the name and email if user is signed in
    this.authService.user.subscribe(user => {
      if (user) {
        this.theForm.controls.name.setValue(user.displayName);
        this.theForm.controls.email.setValue(user.email);
        if (user.admin) {
          this.feedbacks = this.feedbackService.getAllFeedbackItems();
        }
      }
    });

    this.feedbacks = this.feedbackService.getMyFeedbackItems();
  }

  onSubmit(value){
    this.feedbackService.createFeedbackItem(value).then(res => {
      if (res.id) this.submitted = true;
    });
  }
}
