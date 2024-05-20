import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtCommentBoxComponent } from './at-comment-box.component';

describe('AtCommentBoxComponent', () => {
  let component: AtCommentBoxComponent;
  let fixture: ComponentFixture<AtCommentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtCommentBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtCommentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
