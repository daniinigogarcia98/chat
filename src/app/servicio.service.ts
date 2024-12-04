import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient
import { Observable } from 'rxjs';
import { Chat } from './Chat';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  // URLs de los tres servidores
  private server1 = {
    listar: 'http://moralo.atwebpages.com/menuAjax/chat/ObtenerMensajes.php',
    añadir: 'http://moralo.atwebpages.com/menuAjax/chat/AltaMensaje.php',
    limpiar: 'http://moralo.atwebpages.com/menuAjax/chat/truncate.php',
    eliminar: 'http://moralo.atwebpages.com/menuAjax/chat/BajaMensaje.php'
  };

  private server2 = {
    listar: 'http://daw2025.atwebpages.com/chat/ObtenerMensajes.php',
    añadir: 'http://daw2025.atwebpages.com/chat/AltaMensaje.php',
    limpiar: 'http://daw2025.atwebpages.com/chat/truncate.php',
    eliminar: 'http://daw2025.atwebpages.com/chat/BajaMensaje.php'
  };

  private server3 = {
    listar: 'http://camacho.atwebpages.com/chat/ObtenerMensajes.php',
    añadir: 'http://camacho.atwebpages.com/chat/AltaMensaje.php',
    limpiar: 'http://camacho.atwebpages.com/chat/truncate.php',
    eliminar: 'http://camacho.atwebpages.com/chat/EliminarMensaje.php'
  };

  constructor(private http: HttpClient) { }

  obtenerMensajes(servidor: number): Observable<Chat[]> {
    let url = this.getServerUrl(servidor).listar;
    return this.http.get<Chat[]>(url);
  }

  aniadirMensaje(servidor: number, chat: Chat): Observable<any> {
    let url = this.getServerUrl(servidor).añadir;
    return this.http.post(url, chat);
  }

  limpiarMensajes(servidor: number): Observable<any> {
    let url = this.getServerUrl(servidor).limpiar;
    return this.http.post(url, {});
  }

  eliminarMensaje(servidor: number, id: number): Observable<any> {
    let url = this.getServerUrl(servidor).eliminar;
    return this.http.post(url, { id });
  }

  private getServerUrl(servidor: number) {
    switch (servidor) {
      case 1: return this.server1;
      case 2: return this.server2;
      case 3: return this.server3;
      default: return this.server1;
    }
  }
}
