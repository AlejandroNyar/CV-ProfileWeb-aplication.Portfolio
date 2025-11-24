import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private firestore: Firestore = inject(Firestore)

  async sendToFirestore(data: any) {
    const ref = collection(this.firestore, 'contactMessages');
    return addDoc(ref, {
      ...data,
      createdAt: new Date()
    });
  }
}
