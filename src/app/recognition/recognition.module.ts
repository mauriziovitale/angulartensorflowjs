import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatButtonModule, MatChipsModule } from '@angular/material';
import { AngularFireModule, FirebaseOptions } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule } from '@angular/router';
import { DocumentTaskComponent } from './document-task/document-task.component';
import { ImageListComponent } from './image-list/image-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const firebaseConfig: FirebaseOptions = environment.firebaseConfig;

const routes: Routes = [
  {
    path: '',
    component: DocumentTaskComponent
  }
];

@NgModule({
  declarations: [DocumentTaskComponent, ImageListComponent],
  imports: [
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ]
})
export class RecognitionModule { }
