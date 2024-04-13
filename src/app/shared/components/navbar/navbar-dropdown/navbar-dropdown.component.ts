import { Component, inject, Input } from '@angular/core';
import { RouteItem } from "../../../interfaces/route-item.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'shared-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrl: './navbar-dropdown.component.css'
})
export class NavbarDropdownComponent {
  @Input( {required: true})
  text!: string;
  @Input( {required: true})
  items!: RouteItem[];
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _location: Location = inject(Location);

  private _isOpen = false;

  get isOpen() {
    return this._isOpen;
  }

  toggle() {
    this._isOpen = !this._isOpen;
  }

  getFullPagePath(path: string, queryParams?: { [key: string]: string }):string {
    return this._router.createUrlTree([path], { queryParams }).toString();
  }

}
