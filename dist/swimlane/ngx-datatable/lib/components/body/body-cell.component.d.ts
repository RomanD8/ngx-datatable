import { ChangeDetectorRef, EventEmitter, ElementRef, ViewContainerRef, OnDestroy, DoCheck } from '@angular/core';
import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
import * as i0 from '@angular/core';
export declare type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';
export declare class DataTableBodyCellComponent implements DoCheck, OnDestroy {
  private cd;
  displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;
  set group(group: any);
  get group(): any;
  set rowHeight(val: number);
  get rowHeight(): number;
  set isSelected(val: boolean);
  get isSelected(): boolean;
  set expanded(val: boolean);
  get expanded(): boolean;
  set rowIndex(val: number);
  get rowIndex(): number;
  set column(column: TableColumn);
  get column(): TableColumn;
  set row(row: any);
  get row(): any;
  set sorts(val: any[]);
  get sorts(): any[];
  set treeStatus(status: TreeStatus);
  get treeStatus(): TreeStatus;
  activate: EventEmitter<any>;
  treeAction: EventEmitter<any>;
  cellTemplate: ViewContainerRef;
  get columnCssClasses(): any;
  get width(): number;
  get minWidth(): number;
  get maxWidth(): number;
  get height(): string | number;
  sanitizedValue: any;
  value: any;
  sortDir: SortDirection;
  isFocused: boolean;
  onCheckboxChangeFn: any;
  activateFn: any;
  cellContext: any;
  private _isSelected;
  private _sorts;
  private _column;
  private _row;
  private _group;
  private _rowHeight;
  private _rowIndex;
  private _expanded;
  private _element;
  private _treeStatus;
  constructor(element: ElementRef, cd: ChangeDetectorRef);
  ngDoCheck(): void;
  ngOnDestroy(): void;
  checkValueUpdates(): void;
  onFocus(): void;
  onBlur(): void;
  onClick(event: MouseEvent): void;
  onDblClick(event: MouseEvent): void;
  onKeyDown(event: KeyboardEvent): void;
  onCheckboxChange(event: any): void;
  calcSortDir(sorts: any[]): any;
  stripHtml(html: string): string;
  onTreeAction(): void;
  calcLeftMargin(column: any, row: any): number;
  static ɵfac: i0.ɵɵFactoryDeclaration<DataTableBodyCellComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    DataTableBodyCellComponent,
    'datatable-body-cell',
    never,
    {
      displayCheck: 'displayCheck';
      group: 'group';
      rowHeight: 'rowHeight';
      isSelected: 'isSelected';
      expanded: 'expanded';
      rowIndex: 'rowIndex';
      column: 'column';
      row: 'row';
      sorts: 'sorts';
      treeStatus: 'treeStatus';
    },
    { activate: 'activate'; treeAction: 'treeAction' },
    never,
    never,
    false
  >;
}
