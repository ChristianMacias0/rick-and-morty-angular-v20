// src/app/services/api.ts (Así debe quedar DESPUÉS de los cambios)

import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // <-- 1. Importa tap
import { ApiResponse, Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService { // Te recomiendo cambiar el nombre de la clase a ApiService para seguir las convenciones de Angular
  // Tarea 1: Definir la URL
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  // Tarea 2: Inyectar HttpClient
  private readonly http = inject(HttpClient);

  // Tarea 3: Gestionar el estado con señales
  private charactersSignal: WritableSignal<Character[]> = signal<Character[]>([]);
  public readonly characters = this.charactersSignal.asReadonly();

  // Tarea 4: Implementar getCharacters
  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }

  // Tarea 5: Implementar searchCharacters
  searchCharacters(name: string): Observable<ApiResponse> {
    // Si no hay nombre, o solo espacios, obtenemos todos los personajes
    if (!name || !name.trim()) {
      return this.getCharacters();
    }
    
    // Construir la URL de búsqueda
    const searchUrl = `${this.API_URL}?name=${name}`;
    
    return this.http.get<ApiResponse>(searchUrl).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }
}