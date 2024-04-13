import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  public searchValue: string = '';
  private readonly _router: Router = inject(Router);

  public onSearch(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  public onSearchClick(): void {
    this._router.navigate(['/products'], { queryParams: { search: this.searchValue } });
  }

  public onSearchEnter(event: KeyboardEvent): void {
    if(event.key === 'Enter'){
      event.preventDefault();
      this._router.navigate(['/products'], { queryParams: { search: this.searchValue } });
    }
  }
}
