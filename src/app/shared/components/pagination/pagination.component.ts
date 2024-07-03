import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { InputButtonTypes } from '../../enums/input-button-types.enum';

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input({ required: true })
  public paginationForm: FormGroup = null!;
  @Input()
  public pageControlName: string = 'page';
  @Input()
  public recordsPerPageControlName: string = 'pageSize';
  @Input()
  public paginationRadio: number = 2;
  @Input( { required: true })
  public totalPages: number = 0;
  @Input( { required: true })
  public totalRecords: number = 0;
  @Input( { required: true })
  public actualRecords: number = 0;
  @Input( { required: true })
  public currentPageValue: number = 0;
  @Input()
  public recordsPerPageOptions: number[] = [10, 15, 25];
  public pageValues: number[] = [];
  public previousPageValue: number = 0;
  public nextPageValue: number = 0;
  public recordsRange: { start: number, end: number } = { start: 0, end: 0 };

  ngOnChanges(changes: SimpleChanges): void {
    this.previousPageValue = +this.currentPageValue - 1;
    this.nextPageValue = +this.currentPageValue + 1;
    const minValue = Math.max(1, +this.currentPageValue - this.paginationRadio);
    const maxValue = Math.min(this.totalPages, +this.currentPageValue + this.paginationRadio);
    this.pageValues = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue);
    this.recordsRange = this.calculateRecordRange(this.currentPageValue, this.actualRecords);
  }

  calculateRecordRange(currentPageValue: number, actualRecords: number) {
    const recordsPerPage = this.paginationForm.get(this.recordsPerPageControlName)!.value;
    const start = actualRecords != 0 ? recordsPerPage * (currentPageValue - 1) + 1 : 0;
    const end = recordsPerPage * (currentPageValue - 1) + actualRecords;

    return { start, end };
  }

  protected readonly InputButtonTypes = InputButtonTypes;
}
