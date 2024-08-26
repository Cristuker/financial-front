import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';

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
      label: 'Log out',
      icon: 'ph ph-sign-out',
      action: () => {
        this.poStorageService.clear();
        this.router.navigate(['/login']);
      }
    }
  ];

  constructor(private readonly router: Router, private readonly poStorageService: PoStorageService) {

  }

}
