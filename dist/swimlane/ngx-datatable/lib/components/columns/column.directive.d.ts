import { TemplateRef, OnChanges } from '@angular/core';
import { ColumnChangesService } from '../../services/column-changes.service';
import { TableColumnProp } from '../../types/table-column.type';
import * as i0 from '@angular/core';
export declare class DataTableColumnDirective implements OnChanges {
  private columnChangesService;
  name: string;
  prop: TableColumnProp;
  frozenLeft: any;
  frozenRight: any;
  flexGrow: number;
  resizeable: boolean;
  comparator: any;
  pipe: any;
  sortable: boolean;
  draggable: boolean;
  canAutoResize: boolean;
  minWidth: number;
  width: number;
  maxWidth: number;
  checkboxable: boolean;
  headerCheckboxable: boolean;
  headerClass: string | ((data: any) => string | any);
  cellClass: string | ((data: any) => string | any);
  isTreeColumn: boolean;
  treeLevelIndent: number;
  summaryFunc: (cells: any[]) => any;
  summaryTemplate: TemplateRef<any>;
  _cellTemplateInput: TemplateRef<any>;
  _cellTemplateQuery: TemplateRef<any>;
  get cellTemplate(): TemplateRef<any>;
  _headerTemplateInput: TemplateRef<any>;
  _headerTemplateQuery: TemplateRef<any>;
  get headerTemplate(): TemplateRef<any>;
  _treeToggleTemplateInput: TemplateRef<any>;
  _treeToggleTemplateQuery: TemplateRef<any>;
  get treeToggleTemplate(): TemplateRef<any>;
  private isFirstChange;
  constructor(columnChangesService: ColumnChangesService);
  ngOnChanges(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<DataTableColumnDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    DataTableColumnDirective,
    'ngx-datatable-column',
    never,
    {
      name: 'name';
      prop: 'prop';
      frozenLeft: 'frozenLeft';
      frozenRight: 'frozenRight';
      flexGrow: 'flexGrow';
      resizeable: 'resizeable';
      comparator: 'comparator';
      pipe: 'pipe';
      sortable: 'sortable';
      draggable: 'draggable';
      canAutoResize: 'canAutoResize';
      minWidth: 'minWidth';
      width: 'width';
      maxWidth: 'maxWidth';
      checkboxable: 'checkboxable';
      headerCheckboxable: 'headerCheckboxable';
      headerClass: 'headerClass';
      cellClass: 'cellClass';
      isTreeColumn: 'isTreeColumn';
      treeLevelIndent: 'treeLevelIndent';
      summaryFunc: 'summaryFunc';
      summaryTemplate: 'summaryTemplate';
      _cellTemplateInput: 'cellTemplate';
      _headerTemplateInput: 'headerTemplate';
      _treeToggleTemplateInput: 'treeToggleTemplate';
    },
    {},
    ['_cellTemplateQuery', '_headerTemplateQuery', '_treeToggleTemplateQuery'],
    never,
    false
  >;
}
