import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input({ required: true })
  title: string = '';
  @Input()
  titleStyles: string[]  = [];
  @Input()
  active: boolean = true;
  @Input()
  withoutColor: boolean = false;
  @Input()
  rounded: boolean = true;
}
