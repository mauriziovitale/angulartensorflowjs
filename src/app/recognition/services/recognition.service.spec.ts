import { TestBed } from '@angular/core/testing';

import { RecognitionService } from './recognition.service';

describe('RecognitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecognitionService = TestBed.get(RecognitionService);
    expect(service).toBeTruthy();
  });
});
