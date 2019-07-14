import { NgModule, } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => { foo: 'bar' },
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
    valueChanges: () => { foo: 'bar' }
  }),
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
  providers: [{provide: AngularFirestore, useValue: FirestoreStub}]
})
export class CommonServiceStubModule { }