import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  logarUsuario() {
    let usuario = this.formLogin.getRawValue() as IUsuario;
    if (!this.formLogin.invalid) {
      this.usuarioService.logarUsuario(usuario).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.log(error),
      });
    }
  }

  criarContaUsuario(){
    this.router.navigate(['criar-conta']);
  }
}
