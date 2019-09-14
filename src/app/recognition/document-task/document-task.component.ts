import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

interface Metadata {
  cacheControl?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentType?: string;
  contentLanguage?: string;
  customMetadata?: any;
}

export interface ImageMetadata {
  id: string;
  name: string;
  class?: string[];
  fileLocation: string;
}

@Component({
  selector: 'app-document',
  templateUrl: './document-task.component.html',
  styleUrls: ['./document-task.component.scss']
})
export class DocumentTaskComponent implements OnInit {
  ref: AngularFireStorageReference;
  imagesCollection: AngularFirestoreCollection<ImageMetadata>;
  task: AngularFireUploadTask;
  searchValue: string;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.imagesCollection = this.afs.collection('images');
  }

  upload(target) {
    const file = target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.saveOnFirecloud(id, file);
  }

  saveOnFirecloud(id: string, file: File) {
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(file);
    this.task.snapshotChanges().pipe(
      finalize(async() => {
        const downloadURL = await this.ref.getDownloadURL().toPromise();
        this.saveOnFirestore(id, file.name, downloadURL);
      })
    ).subscribe();
  }

  search(word) {
    this.searchValue = word.value;
  }

  saveOnFirestore(id: string, name: string, url: string) {
    const imageMetadata: ImageMetadata = {
      id,
      name: name, class: [],
      fileLocation: url
    }
    this.imagesCollection.doc(id).set(imageMetadata);
  }
}
