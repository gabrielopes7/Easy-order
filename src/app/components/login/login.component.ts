import { AuthGoogleService } from './../../services/auth-google.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [RouterOutlet, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | any;

  constructor(
    private usuarioService: UsuarioService,
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    if(this.authGoogleService.usuarioLogadoComGoogle())
      this.router.navigate(['home']);
  }

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
        next: () => this.router.navigate(['home']),
        error: (error) => console.log(error)
      });
    }
  }
  logarUsuarioComGoogle() {
    this.authGoogleService.login();
  }

  usuarioLogado() {
    return this.authGoogleService.usuarioLogadoComGoogle();
  }
}
