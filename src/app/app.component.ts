import { Component } from '@angular/core';
import { Chat } from './Chat';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mensajes: Chat[] = [];
  servidorSeleccionado: number = 1;
  chat: Chat = new Chat();

  constructor(private ServicioService: ServicioService) {}

  // Obtener mensajes del servidor seleccionado
  listarMensajes() {
    this.ServicioService.obtenerMensajes(this.servidorSeleccionado)
      .subscribe(mensajes => {
        this.mensajes = mensajes;
      });
  }

  // Añadir un nuevo mensaje
  aniadirMensaje() {
    this.ServicioService.aniadirMensaje(this.servidorSeleccionado, this.chat)
      .subscribe(() => {
        this.listarMensajes(); // Refresca los mensajes después de añadir
        this.chat = new Chat(); // Limpia los campos
      });
  }

  // Limpiar todos los mensajes del servidor
  limpiarMensajes() {
    this.ServicioService.limpiarMensajes(this.servidorSeleccionado)
      .subscribe(() => {
        this.listarMensajes(); // Recarga los mensajes del servidor
      });
  }

  // Eliminar un mensaje por ID
  eliminarMensaje(id: number) {
    this.ServicioService.eliminarMensaje(this.servidorSeleccionado, id)
      .subscribe(() => {
        this.listarMensajes(); // Recarga la lista de mensajes después de eliminar
      });
  }
}
