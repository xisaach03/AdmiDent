import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagesService } from '../../../../services/images.service';
import { Image } from '../../../../types/image';

interface Treatment {
  plan: string;
  url: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  imageUrl: string | null = null; // La URL de la imagen
  form: FormGroup;
  img : Image[] = [];
  currentPage = 0; // Página actual
  imagesPerPage = 6; // Número de imágenes por página

  constructor(private fileUpload: FileUploadService, private formBuilder: FormBuilder , private imgService : ImagesService) { 
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      this.imgService.getImages().subscribe(
        (data) => {
          this.img = data
        },
        (error) => {
          console.log('Error al cargar imagenes' , error)
        }
      )
  }

  onSubmit(): void {
    if (this.form.valid) {
      const file = this.form.get('image')?.value;
      console.log('Imagen a subir:', file); // Verifica que el archivo está en el formulario
      
      this.fileUpload.uploadImage(this.form.getRawValue()).subscribe({
        next: (response) => {
          console.log(response); // Verifica la respuesta del servidor
        },
        error: (err) => {
          console.log('Error al subir el archivo:', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  

  // Método para manejar el cambio de archivo
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      console.log('Archivo seleccionado:', file); // Esto te permitirá ver qué archivo se seleccionó
      this.form.patchValue({ image: file }); // Asigna el archivo al formulario
      this.form.get('image')?.updateValueAndValidity(); // Asegúrate de que el campo esté actualizado
    } else {
      console.log('No se ha seleccionado ningún archivo');
    }
  }

    // Método para cambiar de página
    changePage(direction: number): void {
      const totalPages = Math.ceil(this.img.length / this.imagesPerPage);
      this.currentPage = (this.currentPage + direction + totalPages) % totalPages;
    }
  
    // Método para obtener las imágenes a mostrar en la página actual
    get visibleImages() {
      const start = this.currentPage * this.imagesPerPage;
      return this.img.slice(start, start + this.imagesPerPage);
    }
  
    // Método para saber si hay una página anterior
    hasPreviousPage(): boolean {
      return this.currentPage > 0;
    }
  
    // Método para saber si hay una página siguiente
    hasNextPage(): boolean {
      const totalPages = Math.ceil(this.img.length / this.imagesPerPage);
      return this.currentPage < totalPages - 1;
    }
  
}
