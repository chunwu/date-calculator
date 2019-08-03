import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService, User } from '../shared/auth.service';

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
  constructor(
      private afs: AngularFirestore,
      private auth: AuthService) {
  }

  createFeedbackItem(formValue) {
    const item: FeedbackItem = {
      userName: formValue.name,
      userEmail: formValue.email,
      comments: formValue.comments,
      createdDate: new Date(),
    };
    if (this.auth.user) item.userId = this.auth.user.uid;

    if (this.auth.user) this.afs.collection(`users/${this.auth.user.uid}/feedbackItems`).add(item);
    return this.afs.collection(`feedbackItems`).add(item);
  }

  getMyFeedbackItems() {
    if (!this.auth.user) return;
    return this.afs.collection<FeedbackItem>(`users/${this.auth.user.uid}/feedbackItems`).valueChanges();
  }

  getAllFeedbackItems() {
    return this.afs.collection<FeedbackItem>(`feedbackItems`).valueChanges();
  }

}
