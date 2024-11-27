import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagesService } from '../../../../services/images.service';
import { Image } from '../../../../types/image';
import { Router } from '@angular/router';
import { ClientService } from '../../../../services/client.service';
import { NewUserComponent } from '../../../layout/new-user/new-user.component';

interface Treatment {
  plan: string;
  url: string;
}



@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NewUserComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  imageUrl: string | null = null; // La URL de la imagen
  form: FormGroup;
  img: Image[] = [];
  currentPage = 0; // Página actual
  imagesPerPage = 6; // Número de imágenes por página

  isShowing : boolean = false;

  //Estos son para poder modificar con dom dinámicamente los clientes:
  clients: any[] = [];
  selectedClientId: string | null = '';
  inputName: string = '';
  inputLastname: string = '';
  clientEmail : string  = '';

  constructor(private fileUpload: FileUploadService, private formBuilder: FormBuilder, private imgService: ImagesService, private clientService: ClientService, private router: Router) {

    this.form = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
      this.clientService.getClients().subscribe(
        (data) => {
          this.clients = Array.isArray(data) ? data : [];
          //this.clients = data
        }
      )
  }

  showModal(){
    this.isShowing = true
  } 

  closeModal(){
    this.isShowing = false
  }

  onSubmit(): void {
    if (this.form.valid) {
      const file = this.form.get('image')?.value;
      console.log('Imagen a subir:', file); // Verifica que el archivo está en el formulario
      console.log('soy el upload' , this.clientEmail)
  
      // Subir la imagen
      this.fileUpload.uploadImage(this.form.getRawValue(), this.clientEmail).subscribe({
        next: (response) => {
          console.log(response); // Verifica la respuesta del servidor
  
          // Recargar las imágenes del cliente después de la subida
          this.clientService.getOneClient(this.selectedClientId).subscribe({
            next: (data) => {
              if (data && data.Images) {
                this.img = data.Images; // Asocia las imágenes del cliente seleccionado
                console.log(this.img); // Ver las imágenes del cliente
              } else {
                this.img = []; // Si no hay imágenes, inicializa como vacío
                console.warn('No se encontraron imágenes para este cliente');
              }
            },
            error: (err) => {
              console.error('Error al obtener imágenes del cliente:', err);
              this.img = []; // Manejo de errores, sin imágenes
            }
          });
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

  get visibleImages() {
    const start = this.currentPage * this.imagesPerPage;
    const end = start + this.imagesPerPage;

    // Si estamos en la última página y está vacía, mostramos el formulario
    const isLastPage = this.currentPage === Math.ceil(this.img.length / this.imagesPerPage);
    if (isLastPage) {
      return this.img.slice(start, end); // Última página con espacio para el formulario
    }

    return this.img.slice(start, end);
  }

  hasNextPage(): boolean {
    // Hay una siguiente página si hay imágenes adicionales o espacio para el formulario
    const totalPages = Math.ceil(this.img.length / this.imagesPerPage);
    return this.currentPage < totalPages;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  onSelectClient(client: any): void {
    this.selectedClientId = client._id;
    this.inputName = client.firstName;
    this.inputLastname = client.lastName;
    this.clientEmail = client.email;
    console.log(this.clientEmail);
  
    // Obtén las imágenes del cliente cuando lo selecciones
    this.clientService.getOneClient(this.selectedClientId).subscribe({
      next: (data) => {
        if (data && data.Images) {
          this.img = data.Images; // Asocia las imágenes del cliente seleccionado
          console.log(this.img);
        } else {
          this.img = []; // Si no hay imágenes, inicializa como vacío
          console.warn('No se encontraron imágenes para este cliente');
        }
      },
      error: (err) => {
        console.error('Error al obtener imágenes del cliente:', err);
        this.img = []; // Manejo de errores, sin imágenes
      }
    });
  }
  


  goToGall() {
    this.router.navigate(['/gallery'])
  }

  goToSumm() {
    this.router.navigate(['/summary'])
  }

  goToTreat() {
    this.router.navigate(['/treatment'])
  }


}
