import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Query } from '@firebase/firestore-types'
import { from } from 'rxjs';

export class Feedback {
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
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    });
  }

  createFeedbackItem(value){
    const data: Feedback = {
      userName: value.name,
      userEmail: value.email,
      comments: value.comments,
      createdDate: new Date(),
    };
    if (this.userId) data.userId = this.userId;

    if (this.userId) this.afs.collection(`users/${this.userId}/feedbackItems`).add(data);
    return this.afs.collection(`feedbackItems`).add(data);
  }

  getMyFeedbackItems() {
    if (!this.userId) return;
    return this.afs.collection(`users/${this.userId}/feedbackItems`).valueChanges();
    
    // return this.afs.collection('/feedbackItems', ref => {
    //   ref.where('userId', '==', this.userId);
    // }).valueChanges(); //where('userId', '==', this.userId);
    
    // let itemsPromise = this.afs.collection(`feedbackItems`).ref.where('', '==', this.userId).get();
    // return from(itemsPromise);
  }

  getAllFeedbackItems() {
    if (!this.userId) return;
    return this.afs.collection(`feedbackItems`).valueChanges();
  }

}
