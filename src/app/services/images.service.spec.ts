import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImagesService } from './images.service';
import { environment } from '../environments/environment';
import { Image } from '../types/image';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importamos el módulo para realizar pruebas HTTP
      providers: [ImagesService]
    });
    service = TestBed.inject(ImagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificamos si todas las solicitudes HTTP han sido completadas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch images from the API', () => {
    const mockImages: Image[] = [
      {
        url: 'https://example.com/image1.jpg',
        filename: '',
        createdAt: new Date('2024-11-01T12:00:00Z') // Asignamos una fecha válida
      },
      {
        url: 'https://example.com/image2.jpg',
        filename: '',
        createdAt: new Date('2024-11-02T12:00:00Z') // Asignamos una fecha válida
      }
    ];
  
    service.getImages().subscribe(images => {
      expect(images.length).toBe(2);
      expect(images).toEqual(mockImages);
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}home/images`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });

  it('should handle error if the API fails', () => {
    const errorMessage = 'SO Server Error'; // Error real que se simula
    const errorResponse = {
      status: 500,
      statusText: errorMessage,
      url: `${environment.apiUrl}home/images`
    };
  
    service.getImages().subscribe(
      () => fail('Expected an error, but got success'),
      (error) => {
        // Aquí verificamos que el error contiene la información correcta
        expect(error.status).toBe(500);  // Verificamos el código de estado
        expect(error.statusText).toBe(errorMessage);  // Verificamos el mensaje de estado
        expect(error.url).toBe(`${environment.apiUrl}home/images`);  // Verificamos la URL solicitada
      }
    );
  
    const req = httpMock.expectOne(`${environment.apiUrl}home/images`);
    expect(req.request.method).toBe('GET');
    req.flush(null, errorResponse);  // Simulamos un error del servidor con el código 500
  });
  
});