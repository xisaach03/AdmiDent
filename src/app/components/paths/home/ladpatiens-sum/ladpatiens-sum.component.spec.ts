import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LADPatiensSumComponent } from './ladpatiens-sum.component';

describe('LADPatiensSumComponent', () => {
  let component: LADPatiensSumComponent;
  let fixture: ComponentFixture<LADPatiensSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LADPatiensSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LADPatiensSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
