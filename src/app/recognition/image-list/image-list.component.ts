import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ImageMetadata } from '../document-task/document-task.component';
import { RecognitionService } from '../services/recognition.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { DetectedObject } from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnChanges {
  @Input() query: string;

  imageToUpdate: ImageMetadata;
  searchImagesCollection: AngularFirestoreCollection<ImageMetadata>;
  collectionImages: Observable<ImageMetadata[]>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private recognitionService: RecognitionService) {}

  ngOnChanges() {
    this.searchImagesCollection = this.afs.collection<ImageMetadata>('images',
      ref => {
        if (this.query && this.query !== '') {
          return ref.where('class', 'array-contains', this.query);
        } else {
          return ref;
        }
      }
    );

    this.collectionImages = this.searchImagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  recognize(imageMetadata: ImageMetadata, imageElement: HTMLImageElement) {
    this.detectClasses(imageElement);
    this.imageToUpdate = imageMetadata;
  }

  async detectClasses(imageElement: HTMLImageElement) {
    const detectedObject: DetectedObject[] = await this.recognitionService.detect(imageElement);
    console.log(JSON.stringify(detectedObject));
    detectedObject.forEach( (obj: DetectedObject) => {
      this.imageToUpdate.class.push(obj.class);
    });
    this.updateOnFirestore();
  }

  updateOnFirestore() {
    const itemDoc = this.afs.doc(`images/${this.imageToUpdate.id}`);
    itemDoc.update(this.imageToUpdate);
  }

  delete(id) {
    this.afStorage.ref(id).delete().subscribe( () => {
      this.afs.doc(`images/${id}`).delete().then( () => {
        console.log('deleted');
      });
    });
  }
}
