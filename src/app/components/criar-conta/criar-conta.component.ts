import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { IRegistroUsuario } from '../../interfaces/iregistroUsuario';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatchValidator } from '../../services/validators/validators';

@Component({
  selector: 'app-criar-conta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './criar-conta.component.html',
  styleUrl: './criar-conta.component.scss',
})
export class CriarContaComponent implements OnInit {
  formCriarContaUsuario: FormGroup | any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formCriarContaUsuario = this.formBuilder.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        dataNascimento: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        emailConfirmar: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        senhaConfirmar: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          MatchValidator('email', 'emailConfirmar'),
          MatchValidator('senha', 'senhaConfirmar')
        ],
      }
    );
  }

  criarUsuario() {
    let registroUsuario =
      this.formCriarContaUsuario.getRawValue() as IRegistroUsuario;
    if (!this.formCriarContaUsuario.invalid) {
      this.usuarioService.criarUsuario(registroUsuario).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.log(error),
      });
    }
  }
}
