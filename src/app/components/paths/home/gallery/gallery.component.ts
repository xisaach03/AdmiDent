import { Component } from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class GalleryComponent {
  imageUrl: string | null = null; // La URL de la imagen
  form: FormGroup;

  constructor(private fileUpload: FileUploadService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
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
  
}
