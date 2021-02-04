import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { AngularFirestore } from "@angular/fire/firestore";
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
    console.log(this.user);

  }

  signup(email: string, password: string, displayName: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.saveDisplayName(email, displayName);

      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Nice, it worked!');
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        })
        .finally(() => {
          return resolve("success");
        })
    });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  saveDisplayName(email: string, displayName: string) {
    const userId = firebase.auth().currentUser.uid;

    this.firestore.collection("users").doc(userId).set({
      displayName: displayName ? displayName : email
    });
  }

  getUserDetails() {
    return new Promise<any>((resolve, reject) => {
      const userId = firebase.auth().currentUser.uid;
      this.firestore.collection("users").doc(userId).snapshotChanges().subscribe(snapshots => {
        resolve(snapshots);
      })
    });
    
  }
}