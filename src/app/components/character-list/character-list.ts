
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api'; 
import { Character } from '../../models/character';
import { finalize, catchError, of } from 'rxjs'; 

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule   
  ],
  templateUrl: './character-list.html',
  styleUrls: ['./character-list.scss']
})
export class CharacterListComponent implements OnInit { 

  private api = inject(ApiService);

  public characters = this.api.characters;

  public searchTerm: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';

  public hasCharacters = computed(() => this.characters().length > 0);

  ngOnInit(): void {
    this.loadInitialCharacters();
  }

  loadInitialCharacters(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getCharacters().pipe(
      finalize(() => this.loading = false), 
      catchError(err => {
        this.errorMessage = 'Failed to load characters. Please try again later.';
        return of(null); 
      })
    ).subscribe();
  }

  onSearch(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.searchCharacters(this.searchTerm).pipe(
      finalize(() => this.loading = false),
      catchError(err => {
        if (err.status === 404) {
          this.errorMessage = `No characters found matching "${this.searchTerm}".`;
        } else {
          this.errorMessage = 'An error occurred during the search.';
        }
        return of(null); 
      })
    ).subscribe();
  }

  onSearchKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}