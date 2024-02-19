import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private _angularFirestore: AngularFirestore) {}
  
   //Metodos de insertar, borrar, actualizar....
}
