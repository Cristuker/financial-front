import { Component, OnInit } from '@angular/core';
import {
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  person = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Digite o seu nome',
    },
    {
      property: 'email',
      label: 'E-mail',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Digite o seu e-mail',
    },
    {
      property: 'password',
      label: 'Senha',
      gridColumns: 6,
      secret: true,
      placeholder: 'Digite a sua senha',
    },
    {
      property: 'passwordConfirm',
      label: 'Confirme a sua senha',
      gridColumns: 6,
      secret: true,
      placeholder: 'Digite a sua senha novamente',
    },
  ];
  constructor(
    private poNotification: PoNotificationService,
    private readonly signUpService: SignUpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.person = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  submit() {
    if (this.person.password !== this.person.passwordConfirm) {
      this.poNotification.error('As senhas não são iguais');
    }
    if (this.person.email === '') {
      this.poNotification.error('O e-mail não pode ser vazio');
    }
    if (this.person.name === '') {
      this.poNotification.error('O nome não pode ser vazio');
    }
    this.signUpService.signup(this.person).subscribe(
      () => {
        this.poNotification.success('Conta criada com sucesso');
        this.router.navigate(['/login']);
      },
      (res) => {
        console.error(res.error);
        if (res.error.message.includes('Invalid password')) {
          this.poNotification.error('Senha inválida');
          this.poNotification.information(
            'A senha deve ter 6 digitos, 1 letra maiuscula, 1 letra minuscula, 1 numero e 1 caracter especial'
          );
        } else {
          this.poNotification.error('Erro ao criar conta');
        }
      }
    );
  }
}
