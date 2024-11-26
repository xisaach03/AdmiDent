import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatment } from './create-treatment.component';

describe('CreateTreatment', () => {
  let component: CreateTreatment;
  let fixture: ComponentFixture<CreateTreatment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTreatment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTreatment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

