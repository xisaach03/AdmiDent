import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { environment } from '../environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController to mock requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Ensure the service is created
  });

  it('should make a GET request to retrieve users', () => {
    const mockUsers = [{ name: 'User1' }, { name: 'User2' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers); // Verify the response matches the mock data
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/home`);
    expect(req.request.method).toBe('GET'); // Ensure the request method is GET
    req.flush(mockUsers); // Mock the server's response
  });

  it('should make a POST request to register a user', () => {
    const userData : any = { username: 'newUser', email: 'newuser@example.com', password: 'password123' };
    const mockResponse = { message: 'Registration successful' };

    service.registrar(userData).subscribe(response => {
      expect(response).toEqual(mockResponse); // Verify the response matches the mock
    });

    const req = httpMock.expectOne(`${environment.apiUrl}register`);
    expect(req.request.method).toBe('POST'); // Ensure the request method is POST
    expect(req.request.body).toEqual(userData); // Ensure the correct body is sent
    req.flush(mockResponse); // Mock the server's response
  });

  // it('should handle errors when registration fails', () => {
  //   const userData : any = { username: 'newUser', email: 'newuser@example.com', password: 'wrongpassword' };

  //   service.registrar(userData).subscribe({
  //     next: () => fail('should have failed with an error'),
  //     error: (error) => {
  //       expect(error.status).toBe(0); // Example error status, this depends on how your backend behaves
  //       expect(error.error).toContain('Network error');
  //     }
  //   });

  //   const req = httpMock.expectOne(`${environment.apiUrl}register`);
  //   expect(req.request.method).toBe('POST');
  //   req.error(new ErrorEvent('Network error')); // Simulate a network error
  // });

  // afterEach(() => {
  //   httpMock.verify(); // Ensure there are no outstanding HTTP requests
  // });
});
