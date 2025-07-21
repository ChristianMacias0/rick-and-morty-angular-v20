import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// La ruta correcta basada en tu estructura de archivos
import { CharacterListComponent } from './components/character-list/character-list';

@Component({
  selector: 'app-root',
  standalone: true,
  // Añade el componente importado aquí
  imports: [CommonModule, RouterOutlet, CharacterListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'rick-and-morty-angular-v20';
}