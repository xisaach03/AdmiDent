import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentComponent } from './create-treatment.component';

describe('CreateTreatmentComponent', () => {
  let component: CreateTreatmentComponent;
  let fixture: ComponentFixture<CreateTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
