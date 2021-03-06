import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FeedbackService } from '../shared/feedback.service';
import { AuthService } from '../shared/auth.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { FeedbackItem } from '../shared/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  theForm;

  // for the Feedback Items table
  displayedColumns: string[] = ['userName', 'userEmail', 'comments', 'createdDate'];
  feedbackSource = new MatTableDataSource<FeedbackItem>();
  private feedbackItems: Observable<FeedbackItem[]>;
  private feedbackSub: Subscription;
  
  submitted: boolean = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private ngUnsubscribe = new Subject();

  constructor(
      private formBuilder: FormBuilder,
      private feedbackService: FeedbackService,
      private auth: AuthService) {
  }

  ngOnInit() {
    this.theForm = this.formBuilder.group({
      name: '',
      email: ['', Validators.required],
      comments: ['', Validators.required]
    });

    this.auth.user$.subscribe(user => {
      if (user) {
        // Pre-populate the name and email if user is signed in
        this.theForm.controls.name.setValue(user.displayName);
        this.theForm.controls.email.setValue(user.email);
      }
    });

    this.auth.profile$.subscribe(profile => {
      if (profile) {
        if (profile.admin === true) {
          this.feedbackItems = this.feedbackService.getAllFeedbackItems();
        } else {
          this.feedbackItems = this.feedbackService.getMyFeedbackItems();
        }
        this.subscribeFeedbackItems(this.feedbackItems);
      } else {
        if (this.auth.user) {
          this.feedbackItems = this.feedbackService.getMyFeedbackItems();
          this.subscribeFeedbackItems(this.feedbackItems);
        } else {
          if (this.feedbackSub) this.feedbackSub.unsubscribe();
        }
      }
    });
  }

  private subscribeFeedbackItems(feedbackItems: Observable<FeedbackItem[]>) {
    this.feedbackSub = feedbackItems.pipe(takeUntil(this.ngUnsubscribe)).subscribe((items) => {    
      this.feedbackSource.data = items;
      this.feedbackSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

  onSubmit(formValue){
    this.feedbackService.createFeedbackItem(formValue).then(res => {
      if (res.id) this.submitted = true;
    });
  }
}
