import { Component, inject, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input()
  styles: string[] = [];
  public searchValue: string = '';
  private readonly _router: Router = inject(Router);

  public onSearch(event: Event): void {
    let input = event.target as HTMLInputElement;
    this.searchValue = input.value;
  }

  public onSearchClick(): void {
    this._router.navigate(['/products'], { queryParams: { search: this.searchValue } });
    this.searchValue = '';
  }

  public onSearchEnter(event: KeyboardEvent): void {
    if(event.key === 'Enter'){
      event.preventDefault();
      this._router.navigate(['/products'], { queryParams: { search: this.searchValue } });
      this.searchValue = '';
    }
  }
}
