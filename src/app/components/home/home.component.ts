import { SortDirection } from '@angular/material/sort';
import { ListaUsuarioService } from './../../services/listausuario.service';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Observable, startWith, map, debounceTime, switchMap } from 'rxjs';
import { TabelaComponent } from "../tabela/tabela/tabela.component";

export interface Usuario{
  id: number;
  role: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatTableModule,
    MatInputModule, TabelaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(private listaUsuarioService: ListaUsuarioService){}

  myAutocompleteControl = new FormControl('');

  filteredPerson!: Observable<Usuario[]>;

  ngOnInit(): void {

    this.filteredPerson = this.myAutocompleteControl.valueChanges
    .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(value => this.listaUsuarioService.buscarListaUsuario(value || "")),
      );
  }
}
