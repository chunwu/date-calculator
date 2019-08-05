import { NgModule, } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => { foo: 'bar' },
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
    valueChanges: () => { foo: 'bar' }
  }),
};

const fireAuthStub = {
  authState: of(null),
  auth: {
    signInWithPopup: provider => {
      return new Promise((resolve, _reject) => resolve());
    }
  }
};

//TODO: use class instead off const
@Injectable()
export class AngularFirestoreStub {
  public collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => { foo: 'bar' }
    })
  })
}

@NgModule({
  providers: [
      {provide: AngularFirestore, useValue: FirestoreStub},
      {provide: AngularFireAuth, useValue: fireAuthStub}]
})
export class CommonServiceStubModule { }