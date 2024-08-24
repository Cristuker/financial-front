import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuItemSelected: string = '';
  menus: Array<PoMenuItem> = [
    {
      label: 'Clientes',
      icon: 'ph ph-user',
      action: () => {
        this.router.navigate(['/home/clients']);
      }
    },
    {
      label: 'Contratos'
    },
  ];

  constructor(private readonly router: Router) {}

}
