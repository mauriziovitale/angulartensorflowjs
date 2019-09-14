import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTaskComponent } from './document-task.component';

describe('DocumentTaskComponent', () => {
  let component: DocumentTaskComponent;
  let fixture: ComponentFixture<DocumentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
