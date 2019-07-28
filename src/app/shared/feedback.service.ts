import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private afs: AngularFirestore) { }

  createFeedback(value){
    return this.afs.collection('feedbacks').add({
      UserName: value.name,
      UserEmail: value.email,
      Comments: value.comments,
      CreatedDate: firestore.Timestamp.fromDate(new Date())
    });
  }

  getAllFeedback() {
    return this.afs.collection('feedbacks').valueChanges();
  }
}
