import { ElementRef, KeyValueDiffers, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { TreeStatus } from './body-cell.component';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import * as i0 from '@angular/core';
export declare class DataTableBodyRowComponent implements DoCheck {
  private differs;
  private scrollbarHelper;
  private cd;
  set columns(val: any[]);
  get columns(): any[];
  set innerWidth(val: number);
  get innerWidth(): number;
  expanded: boolean;
  rowClass: any;
  row: any;
  group: any;
  isSelected: boolean;
  rowIndex: number;
  displayCheck: any;
  treeStatus: TreeStatus;
  set offsetX(val: number);
  get offsetX(): number;
  get cssClass(): string;
  rowHeight: number;
  get columnsTotalWidths(): string;
  activate: EventEmitter<any>;
  treeAction: EventEmitter<any>;
  _element: any;
  _columnGroupWidths: any;
  _columnsByPin: any;
  _offsetX: number;
  _columns: any[];
  _innerWidth: number;
  _groupStyles: {
    [prop: string]: {};
  };
  private _rowDiffer;
  constructor(differs: KeyValueDiffers, scrollbarHelper: ScrollbarHelper, cd: ChangeDetectorRef, element: ElementRef);
  ngDoCheck(): void;
  trackByGroups(index: number, colGroup: any): any;
  columnTrackingFn(index: number, column: any): any;
  buildStylesByGroup(): void;
  calcStylesByGroup(group: string): {
    width: string;
  };
  onActivate(event: any, index: number): void;
  onKeyDown(event: KeyboardEvent): void;
  onMouseenter(event: any): void;
  recalculateColumns(val?: any[]): void;
  onTreeAction(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<DataTableBodyRowComponent, [null, { skipSelf: true }, null, null]>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    DataTableBodyRowComponent,
    'datatable-body-row',
    never,
    {
      columns: 'columns';
      innerWidth: 'innerWidth';
      expanded: 'expanded';
      rowClass: 'rowClass';
      row: 'row';
      group: 'group';
      isSelected: 'isSelected';
      rowIndex: 'rowIndex';
      displayCheck: 'displayCheck';
      treeStatus: 'treeStatus';
      offsetX: 'offsetX';
      rowHeight: 'rowHeight';
    },
    { activate: 'activate'; treeAction: 'treeAction' },
    never,
    never,
    false
  >;
}
