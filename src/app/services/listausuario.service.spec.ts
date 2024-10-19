import { TestBed } from '@angular/core/testing';

import { ListaUsuarioService } from './listausuario.service';

describe('ListausuarioService', () => {
  let service: ListaUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
