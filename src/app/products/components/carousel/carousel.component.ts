import { Component, Input } from '@angular/core';

@Component({
  selector: 'products-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input({ required: true })
  public images: string[] = [];

}
