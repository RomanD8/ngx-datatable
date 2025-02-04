import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
import * as i0 from '@angular/core';
export declare class DataTableHeaderCellComponent {
  private cd;
  sortType: SortType;
  sortAscendingIcon: string;
  sortDescendingIcon: string;
  sortUnsetIcon: string;
  isTarget: boolean;
  targetMarkerTemplate: any;
  targetMarkerContext: any;
  _allRowsSelected: boolean;
  set allRowsSelected(value: boolean);
  get allRowsSelected(): boolean;
  selectionType: SelectionType;
  set column(column: TableColumn);
  get column(): TableColumn;
  headerHeight: number;
  set sorts(val: any[]);
  get sorts(): any[];
  sort: EventEmitter<any>;
  select: EventEmitter<any>;
  columnContextmenu: EventEmitter<{
    event: MouseEvent;
    column: any;
  }>;
  get columnCssClasses(): any;
  get name(): string;
  get minWidth(): number;
  get maxWidth(): number;
  get width(): number;
  get isCheckboxable(): boolean;
  sortFn: any;
  sortClass: string;
  sortDir: SortDirection;
  selectFn: any;
  cellContext: any;
  private _column;
  private _sorts;
  constructor(cd: ChangeDetectorRef);
  onContextmenu($event: MouseEvent): void;
  ngOnInit(): void;
  calcSortDir(sorts: any[]): any;
  onSort(): void;
  calcSortClass(sortDir: SortDirection): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<DataTableHeaderCellComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    DataTableHeaderCellComponent,
    'datatable-header-cell',
    never,
    {
      sortType: 'sortType';
      sortAscendingIcon: 'sortAscendingIcon';
      sortDescendingIcon: 'sortDescendingIcon';
      sortUnsetIcon: 'sortUnsetIcon';
      isTarget: 'isTarget';
      targetMarkerTemplate: 'targetMarkerTemplate';
      targetMarkerContext: 'targetMarkerContext';
      allRowsSelected: 'allRowsSelected';
      selectionType: 'selectionType';
      column: 'column';
      headerHeight: 'headerHeight';
      sorts: 'sorts';
    },
    { sort: 'sort'; select: 'select'; columnContextmenu: 'columnContextmenu' },
    never,
    never,
    false
  >;
}
