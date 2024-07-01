import { Component, Input } from '@angular/core';
import { RouteItem } from "../../../interfaces/route-item.interface";

@Component({
  selector: 'shared-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Input({ required: true })
  categories: RouteItem[] = [];
  @Input({ required: true })
  brands: RouteItem[] = [];
  @Input({ required: true })
  objectives: RouteItem[] = [];
}
