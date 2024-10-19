import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { ListaUsuarioService } from '../../../services/listausuario.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { merge, of } from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export interface ListaUsuario {
  items: Usuario[]
  total_count: number;
}
export interface Usuario {
  id: number;
  role: string;
  name: string;
}

@Component({
  selector: 'table-component',
  templateUrl: 'tabela.component.html',
  styleUrl: 'tabela.component.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
})
export class TabelaComponent implements AfterViewInit{
  private _listaUsuarioService = inject(ListaUsuarioService);

  displayedColumns: string[] = ['id', 'role', 'name'];
  dataSource: Usuario[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._listaUsuarioService!.buscarListaUsuarioTabela(
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        }),
      )
      .subscribe(data => (this.dataSource = data));
  }
}

