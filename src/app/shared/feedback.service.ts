import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

export class Feedback {
  userEmail: string;
  userName?: string;
  comments: string;
  createdDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  userId: string;

  constructor(
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  createFeedbackItem(value){
    const data: Feedback = {
      userName: value.name,
      userEmail: value.email,
      comments: value.comments,
      createdDate: new Date() //firestore.Timestamp.fromDate(new Date())
    };

    if (this.userId) {
      return this.afs.collection(`users/${this.userId}/feedbackItems`).add(data);
    } else {
      return this.afs.collection(`feedbackItems`).add(data);
    }
  }

  getMyFeedbackItems() {
    if (!this.userId) return;
    return this.afs.collection(`users/${this.userId}/feedbackItems`).valueChanges();
  }
}
