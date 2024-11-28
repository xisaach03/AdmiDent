import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to gallery when goToGall is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToGall();
    expect(routerSpy).toHaveBeenCalledWith(['/gallery']);
  });

  it('should navigate to summary when goToSumm is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToSumm();
    expect(routerSpy).toHaveBeenCalledWith(['/summary']);
  });

  it('should navigate to treatment when goToTreat is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToTreat();
    expect(routerSpy).toHaveBeenCalledWith(['/treatment']);
  });

  it('should have router defined after initialization', () => {
    expect(component['router']).toBeDefined();
  });
});
