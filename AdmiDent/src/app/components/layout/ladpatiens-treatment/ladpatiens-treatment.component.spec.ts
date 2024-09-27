import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LADPatiensTreatmentComponent } from './ladpatiens-treatment.component';

describe('LADPatiensTreatmentComponent', () => {
  let component: LADPatiensTreatmentComponent;
  let fixture: ComponentFixture<LADPatiensTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LADPatiensTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LADPatiensTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
