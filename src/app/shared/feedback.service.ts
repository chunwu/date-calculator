import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private db: AngularFirestore) { }

  createFeedback(value){
    return this.db.collection('feedbacks').add({
      UserName: value.name,
      UserEmail: value.email,
      Comments: value.comments
    });
  }

  getAllFeedback() {
    return this.db.collection('feedbacks').valueChanges();
  }
}
