import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GalleryComponent } from './gallery.component';
import { ImagesService } from '../../../../services/images.service';
import { FileUploadService } from '../../../../services/file-upload.service';

class MockImagesService {
  getImages = jasmine.createSpy('getImages').and.returnValue(of([]));
}

class MockFileUploadService {
  uploadImage = jasmine.createSpy('uploadImage').and.returnValue(of({}));
}

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let imagesService: ImagesService;
  let fileUploadService: FileUploadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GalleryComponent],
      providers: [
        { provide: ImagesService, useClass: MockImagesService },
        { provide: FileUploadService, useClass: MockFileUploadService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    imagesService = TestBed.inject(ImagesService);
    fileUploadService = TestBed.inject(FileUploadService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load images on init', () => {
    expect(imagesService.getImages).toHaveBeenCalled();
    expect(component.img.length).toBe(0); // Mock returns an empty array
  });

  it('should update form value on file change', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [mockFile] } };

    component.onFileChange(event);

    expect(component.form.get('image')?.value).toBe(mockFile);
  });

  it('should call uploadImage on form submission', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    component.form.patchValue({ image: mockFile });
    const clientEmail = 'test@example.com';
    component.clientEmail = clientEmail;

    component.onSubmit();

    expect(fileUploadService.uploadImage).toHaveBeenCalledWith(
      component.form.getRawValue(),
      clientEmail
    );
  });

  it('should not submit if form is invalid', () => {
    component.form.patchValue({ image: null });
    component.onSubmit();

    expect(fileUploadService.uploadImage).not.toHaveBeenCalled();
  });
});