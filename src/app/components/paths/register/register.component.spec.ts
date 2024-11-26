import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should validate form fields', () => {
    // Trigger form submission without filling all fields
    const submitButton = debugElement.query(By.css('.register'));
    submitButton.nativeElement.click();

    // Assert that error messages are displayed for invalid fields
    const errorMessages = debugElement.queryAll(By.css('.error-message')); // Adjust selector as needed
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('should submit form on valid input', () => {
    // Fill the form with valid data
    const nameInput = debugElement.query(By.css('input[name="name"]'));
    const lastNameInput = debugElement.query(By.css('input[name="lastName"]'));
    const emailInput = debugElement.query(By.css('input[name="email"]'));
    const passwordInput = debugElement.query(By.css('input[name="password"]'));
    const confirmInput = debugElement.query(By.css('input[name="confirm"]'));

    nameInput.nativeElement.value = 'Test User';
    lastNameInput.nativeElement.value = 'Test Last Name';
    emailInput.nativeElement.value = 'test@example.com';
    passwordInput.nativeElement.value = 'password123';
    confirmInput.nativeElement.value = 'password123';

    // Trigger input events to update form values
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    lastNameInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));
    confirmInput.nativeElement.dispatchEvent(new Event('input'));

    // Trigger form submission
    const submitButton = debugElement.query(By.css('.register'));
    submitButton.nativeElement.click();

    // Assert that the signup() function is called
    const signupSpy = spyOn(component, 'signup');
    expect(signupSpy).toHaveBeenCalled();
  });
});
