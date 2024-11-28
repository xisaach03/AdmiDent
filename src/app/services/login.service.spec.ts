import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HTTPClientTestingModule for mocking HTTP requests
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController to handle requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Check that the service is created
  });

  it('should make a POST request to the correct URL with credentials', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const responseText = 'success'; // Mocked response text

    service.login(credentials).subscribe(response => {
      expect(response).toBe(responseText); // Verify response content
    });

    // Expect a POST request to the login URL with the correct body
    const req = httpMock.expectOne(`${environment.apiUrl}login`);
    expect(req.request.method).toBe('POST'); // Ensure it's a POST request
    expect(req.request.body).toEqual(credentials); // Ensure credentials are sent
    req.flush(responseText); // Mock the response
  });

  it('should handle error response gracefully', () => {
    const credentials = { email: 'test@example.com', password: 'wrongpassword' };

    service.login(credentials).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.status).toBe(0); // Example error status, depending on mock response
      }
    });

    // Expect a POST request to the login URL with the correct body
    const req = httpMock.expectOne(`${environment.apiUrl}login`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error')); // Simulate a network error
  });

  it('should call login and return response with credentials', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = 'fake_token'; // Mocked response from the server

    service.login(credentials).subscribe((token) => {
      expect(token).toBe(mockResponse); // Check that the response matches the mock
    });

    const req = httpMock.expectOne(`${environment.apiUrl}login`);
    expect(req.request.method).toBe('POST'); // Check that the request is a POST
    expect(req.request.body).toEqual(credentials); // Check that the correct credentials are sent
    req.flush(mockResponse); // Mock the response from the server
  });

  afterEach(() => {
    // Verify no unmatched requests are outstanding
    httpMock.verify();
  });
});
