import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, startWith, debounceTime, switchMap } from 'rxjs';
import { CarrosselComponent } from '../carrossel/carrossel.component';
import { CardCategoriaComponent } from '../card-categoria/card-categoria.component';
import { CardProdutosComponent } from '../card-produtos/card-produtos.component';
import { ListaUsuarioService } from './../../services/listausuario.service';

export interface Usuario {
  id: number;
  role: string;
  name: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    CardCategoriaComponent,
    CarrosselComponent,
    CardProdutosComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private listaUsuarioService: ListaUsuarioService) {}

  myAutocompleteControl = new FormControl('');

  filteredPerson!: Observable<Usuario[]>;

  ngOnInit(): void {
    this.filteredPerson = this.myAutocompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((value) =>
        this.listaUsuarioService.buscarListaUsuario(value || '')
      )
    );
  }
}
