import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../shared/auth.service';

export class FeedbackItem {
  userEmail: string;
  userName?: string;
  comments: string;
  createdDate: Date;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  userId: string;

  constructor(
              private afs: AngularFirestore,
              private auth: AuthService) {
    this.auth.user.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  createFeedbackItem(formValue){
    const item: FeedbackItem = {
      userName: formValue.name,
      userEmail: formValue.email,
      comments: formValue.comments,
      createdDate: new Date(),
    };
    if (this.userId) item.userId = this.userId;

    if (this.userId) this.afs.collection(`users/${this.userId}/feedbackItems`).add(item);
    return this.afs.collection(`feedbackItems`).add(item);
  }

  getMyFeedbackItems() {
    if (!this.userId) return;
    return this.afs.collection(`users/${this.userId}/feedbackItems`).valueChanges();
  }

  getAllFeedbackItems() {
    if (!this.userId) return;
    return this.afs.collection(`feedbackItems`).valueChanges();
  }

}
