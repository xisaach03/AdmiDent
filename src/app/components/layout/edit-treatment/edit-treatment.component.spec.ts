import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreatment } from './edit-treatment.component';

describe('EditTreatment', () => {
  let component: EditTreatment;
  let fixture: ComponentFixture<EditTreatment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTreatment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTreatment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
