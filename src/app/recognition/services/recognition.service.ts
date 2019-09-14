import { Injectable } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  loaded = false;
  model: cocoSsd.ObjectDetection;

  constructor() {
    this.loadModel();
  }

  async loadModel() {
    if (!this.loaded) {
      this.model = await cocoSsd.load();
      this.loaded = true;
    }
  }

  async detect(image: HTMLImageElement) {
    return this.model.detect(image);
  }

}
