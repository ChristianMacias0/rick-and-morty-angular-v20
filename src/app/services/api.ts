

import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; 
import { ApiResponse, Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  private readonly http = inject(HttpClient);

  private charactersSignal: WritableSignal<Character[]> = signal<Character[]>([]);
  public readonly characters = this.charactersSignal.asReadonly();

  getCharacters(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.API_URL).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }

  searchCharacters(name: string): Observable<ApiResponse> {
    if (!name || !name.trim()) {
      return this.getCharacters();
    }
    
    const searchUrl = `${this.API_URL}?name=${name}`;
    
    return this.http.get<ApiResponse>(searchUrl).pipe(
      tap(response => {
        this.charactersSignal.set(response.results);
      })
    );
  }
}