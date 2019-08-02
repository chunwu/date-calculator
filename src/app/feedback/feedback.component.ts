import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FeedbackService } from '../shared/feedback.service';
import { AuthService } from '../shared/auth.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Timestamp } from '@firebase/firestore-types';

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
  feedbackItems: Observable<any[]>;
  feedbackSource = new MatTableDataSource<FeedbackItem>();
  
  submitted: boolean = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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

    this.feedbackSource.sortingDataAccessor = (item, property): string | number => {
      switch (property) {
        case 'createdDate': return item.createdDate.getTime();
        default: return item[property];
      }
    };

    this.authService.user.subscribe(user => {
      if (user) {
        // Pre-populate the name and email if user is signed in
        this.theForm.controls.name.setValue(user.displayName);
        this.theForm.controls.email.setValue(user.email);

        if (user.admin) {
          this.feedbackItems = this.feedbackService.getAllFeedbackItems();
        } else {
          this.feedbackItems = this.feedbackService.getMyFeedbackItems();
        }
        this.feedbackItems.subscribe((items) => {    
          this.feedbackSource.data = items;
          this.feedbackSource.sort = this.sort;
        });
      }
    });
  }

  onSubmit(formValue){
    this.feedbackService.createFeedbackItem(formValue).then(res => {
      if (res.id) this.submitted = true;
    });
  }
}
