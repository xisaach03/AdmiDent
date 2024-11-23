import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileUploadService } from './file-upload.service';
import { environment } from '../environments/environment.development';
import { throwError } from 'rxjs';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileUploadService]
    });
    service = TestBed.inject(FileUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload an image and return a blob', () => {
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const mockBlob = new Blob(['response content'], { type: 'application/json' });

    service.uploadImage({ image: mockFile }).subscribe((response) => {
      expect(response).toEqual(mockBlob);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}home/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    req.flush(mockBlob);
  });

  it('should handle an upload error without flush', () => {
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });

    // Simulamos el error directamente en el servicio utilizando throwError
    spyOn(service, 'uploadImage').and.returnValue(throwError(() => ({
      status: 500,
      statusText: 'Server Error'
    })));

    service.uploadImage({ image: mockFile }).subscribe({
      next: () => fail('Expected an error, not a successful response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });
  });
});
