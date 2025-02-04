import {
  ElementRef,
  EventEmitter,
  OnInit,
  QueryList,
  AfterViewInit,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  ChangeDetectorRef
} from '@angular/core';
import { DatatableGroupHeaderDirective } from './body/body-group-header.directive';
import { BehaviorSubject, Subscription } from 'rxjs';
import { INgxDatatableConfig } from '../ngx-datatable.module';
import { TableColumn } from '../types/table-column.type';
import { ColumnMode } from '../types/column-mode.type';
import { SelectionType } from '../types/selection.type';
import { SortType } from '../types/sort.type';
import { ContextmenuType } from '../types/contextmenu.type';
import { DataTableColumnDirective } from './columns/column.directive';
import { DatatableRowDetailDirective } from './row-detail/row-detail.directive';
import { DatatableFooterDirective } from './footer/footer.directive';
import { DataTableBodyComponent } from './body/body.component';
import { DataTableHeaderComponent } from './header/header.component';
import { ScrollbarHelper } from '../services/scrollbar-helper.service';
import { ColumnChangesService } from '../services/column-changes.service';
import { DimensionsHelper } from '../services/dimensions-helper.service';
import * as i0 from '@angular/core';
export declare class DatatableComponent implements OnInit, DoCheck, AfterViewInit {
  private scrollbarHelper;
  private dimensionsHelper;
  private cd;
  private columnChangesService;
  private configuration;
  /**
   * Template for the target marker of drag target columns.
   */
  targetMarkerTemplate: any;
  /**
   * Rows that are displayed in the table.
   */
  set rows(val: any);
  /**
   * Gets the rows.
   */
  get rows(): any;
  /**
   * This attribute allows the user to set the name of the column to group the data with
   */
  set groupRowsBy(val: string);
  get groupRowsBy(): string;
  /**
   * This attribute allows the user to set a grouped array in the following format:
   *  [
   *    {groupid=1} [
   *      {id=1 name="test1"},
   *      {id=2 name="test2"},
   *      {id=3 name="test3"}
   *    ]},
   *    {groupid=2>[
   *      {id=4 name="test4"},
   *      {id=5 name="test5"},
   *      {id=6 name="test6"}
   *    ]}
   *  ]
   */
  groupedRows: any[];
  /**
   * Columns to be displayed.
   */
  set columns(val: TableColumn[]);
  /**
   * Get the columns.
   */
  get columns(): TableColumn[];
  /**
   * List of row objects that should be
   * represented as selected in the grid.
   * Default value: `[]`
   */
  selected: any[];
  /**
   * Enable vertical scrollbars
   */
  scrollbarV: boolean;
  /**
   * Enable horz scrollbars
   */
  scrollbarH: boolean;
  /**
   * The row height; which is necessary
   * to calculate the height for the lazy rendering.
   */
  rowHeight: number | 'auto' | ((row?: any) => number);
  /**
   * Type of column width distribution formula.
   * Example: flex, force, standard
   */
  columnMode: ColumnMode | keyof typeof ColumnMode;
  /**
   * The minimum header height in pixels.
   * Pass a falsey for no header
   */
  headerHeight: number;
  /**
   * The minimum footer height in pixels.
   * Pass falsey for no footer
   */
  footerHeight: number;
  /**
   * If the table should use external paging
   * otherwise its assumed that all data is preloaded.
   */
  externalPaging: boolean;
  /**
   * If the table should use external sorting or
   * the built-in basic sorting.
   */
  externalSorting: boolean;
  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  set limit(val: number | undefined);
  /**
   * Gets the limit.
   */
  get limit(): number | undefined;
  /**
   * The total count of all rows.
   * Default value: `0`
   */
  set count(val: number);
  /**
   * Gets the count.
   */
  get count(): number;
  /**
   * The current offset ( page - 1 ) shown.
   * Default value: `0`
   */
  set offset(val: number);
  get offset(): number;
  /**
   * Show the linear loading bar.
   * Default value: `false`
   */
  loadingIndicator: boolean;
  /**
   * Type of row selection. Options are:
   *
   *  - `single`
   *  - `multi`
   *  - `checkbox`
   *  - `multiClick`
   *  - `cell`
   *
   * For no selection pass a `falsey`.
   * Default value: `undefined`
   */
  selectionType: SelectionType;
  /**
   * Enable/Disable ability to re-order columns
   * by dragging them.
   */
  reorderable: boolean;
  /**
   * Swap columns on re-order columns or
   * move them.
   */
  swapColumns: boolean;
  /**
   * The type of sorting
   */
  sortType: SortType;
  /**
   * Array of sorted columns by property and type.
   * Default value: `[]`
   */
  sorts: any[];
  /**
   * Css class overrides
   */
  cssClasses: any;
  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  messages: any;
  /**
   * Row specific classes.
   * Similar implementation to ngClass.
   *
   *  [rowClass]="'first second'"
   *  [rowClass]="{ 'first': true, 'second': true, 'third': false }"
   */
  rowClass: any;
  /**
   * A boolean/function you can use to check whether you want
   * to select a particular row based on a criteria. Example:
   *
   *    (selection) => {
   *      return selection !== 'Ethel Price';
   *    }
   */
  selectCheck: any;
  /**
   * A function you can use to check whether you want
   * to show the checkbox for a particular row based on a criteria. Example:
   *
   *    (row, column, value) => {
   *      return row.name !== 'Ethel Price';
   *    }
   */
  displayCheck: (row: any, column?: any, value?: any) => boolean;
  /**
   * A boolean you can use to set the detault behaviour of rows and groups
   * whether they will start expanded or not. If ommited the default is NOT expanded.
   *
   */
  groupExpansionDefault: boolean;
  /**
   * Property to which you can use for custom tracking of rows.
   * Example: 'name'
   */
  trackByProp: string;
  /**
   * Property to which you can use for determining select all
   * rows on current page or not.
   *
   * @memberOf DatatableComponent
   */
  selectAllRowsOnPage: boolean;
  /**
   * A flag for row virtualization on / off
   */
  virtualization: boolean;
  /**
   * Tree from relation
   */
  treeFromRelation: string;
  /**
   * Tree to relation
   */
  treeToRelation: string;
  /**
   * A flag for switching summary row on / off
   */
  summaryRow: boolean;
  /**
   * A height of summary row
   */
  summaryHeight: number;
  /**
   * A property holds a summary row position: top/bottom
   */
  summaryPosition: string;
  /**
   * Body was scrolled typically in a `scrollbarV:true` scenario.
   */
  scroll: EventEmitter<any>;
  /**
   * A cell or row was focused via keyboard or mouse click.
   */
  activate: EventEmitter<any>;
  /**
   * A cell or row was selected.
   */
  select: EventEmitter<any>;
  /**
   * Column sort was invoked.
   */
  sort: EventEmitter<any>;
  /**
   * The table was paged either triggered by the pager or the body scroll.
   */
  page: EventEmitter<any>;
  /**
   * Columns were re-ordered.
   */
  reorder: EventEmitter<any>;
  /**
   * Column was resized.
   */
  resize: EventEmitter<any>;
  /**
   * The context menu was invoked on the table.
   * type indicates whether the header or the body was clicked.
   * content contains either the column or the row that was clicked.
   */
  tableContextmenu: EventEmitter<{
    event: MouseEvent;
    type: ContextmenuType;
    content: any;
  }>;
  /**
   * A row was expanded ot collapsed for tree
   */
  treeAction: EventEmitter<any>;
  /**
   * CSS class applied if the header height if fixed height.
   */
  get isFixedHeader(): boolean;
  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  get isFixedRow(): boolean;
  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   */
  get isVertScroll(): boolean;
  /**
   * CSS class applied to root element if
   * virtualization is enabled.
   */
  get isVirtualized(): boolean;
  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   */
  get isHorScroll(): boolean;
  /**
   * CSS class applied to root element is selectable.
   */
  get isSelectable(): boolean;
  /**
   * CSS class applied to root is checkbox selection.
   */
  get isCheckboxSelection(): boolean;
  /**
   * CSS class applied to root if cell selection.
   */
  get isCellSelection(): boolean;
  /**
   * CSS class applied to root if single select.
   */
  get isSingleSelection(): boolean;
  /**
   * CSS class added to root element if mulit select
   */
  get isMultiSelection(): boolean;
  /**
   * CSS class added to root element if mulit click select
   */
  get isMultiClickSelection(): boolean;
  /**
   * Column templates gathered from `ContentChildren`
   * if described in your markup.
   */
  set columnTemplates(val: QueryList<DataTableColumnDirective>);
  /**
   * Returns the column templates.
   */
  get columnTemplates(): QueryList<DataTableColumnDirective>;
  /**
   * Row Detail templates gathered from the ContentChild
   */
  rowDetail: DatatableRowDetailDirective;
  /**
   * Group Header templates gathered from the ContentChild
   */
  groupHeader: DatatableGroupHeaderDirective;
  /**
   * Footer template gathered from the ContentChild
   */
  footer: DatatableFooterDirective;
  /**
   * Reference to the body component for manually
   * invoking functions on the body.
   */
  bodyComponent: DataTableBodyComponent;
  /**
   * Reference to the header component for manually
   * invoking functions on the header.
   *
   * @memberOf DatatableComponent
   */
  headerComponent: DataTableHeaderComponent;
  /**
   * Returns if all rows are selected.
   */
  get allRowsSelected(): boolean;
  element: HTMLElement;
  _innerWidth: number;
  pageSize: number;
  bodyHeight: number;
  rowCount: number;
  rowDiffer: KeyValueDiffer<{}, {}>;
  _offsetX: BehaviorSubject<number>;
  _limit: number | undefined;
  _count: number;
  _offset: number;
  _rows: any[];
  _groupRowsBy: string;
  _internalRows: any[];
  _internalColumns: TableColumn[];
  _columns: TableColumn[];
  _columnTemplates: QueryList<DataTableColumnDirective>;
  _subscriptions: Subscription[];
  constructor(
    scrollbarHelper: ScrollbarHelper,
    dimensionsHelper: DimensionsHelper,
    cd: ChangeDetectorRef,
    element: ElementRef,
    differs: KeyValueDiffers,
    columnChangesService: ColumnChangesService,
    configuration: INgxDatatableConfig
  );
  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
   */
  ngOnInit(): void;
  /**
   * Lifecycle hook that is called after a component's
   * view has been fully initialized.
   */
  ngAfterViewInit(): void;
  /**
   * Lifecycle hook that is called after a component's
   * content has been fully initialized.
   */
  ngAfterContentInit(): void;
  /**
   * This will be used when displaying or selecting rows.
   * when tracking/comparing them, we'll use the value of this fn,
   *
   * (`fn(x) === fn(y)` instead of `x === y`)
   */
  rowIdentity: (x: any) => any;
  /**
   * Translates the templates to the column objects
   */
  translateColumns(val: any): void;
  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupByIndex  the index of the column to group the data by
   */
  groupArrayBy(
    originalArray: any,
    groupBy: any
  ): {
    key: any;
    value: any;
  }[];
  ngDoCheck(): void;
  /**
   * Recalc's the sizes of the grid.
   *
   * Updated automatically on changes to:
   *
   *  - Columns
   *  - Rows
   *  - Paging related
   *
   * Also can be manually invoked or upon window resize.
   */
  recalculate(): void;
  /**
   * Window resize handler to update sizes.
   */
  onWindowResize(): void;
  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   */
  recalculateColumns(columns?: any[], forceIdx?: number, allowBleed?: boolean): any[] | undefined;
  /**
   * Recalculates the dimensions of the table size.
   * Internally calls the page size and row count calcs too.
   *
   */
  recalculateDims(): void;
  /**
   * Recalculates the pages after a update.
   */
  recalculatePages(): void;
  /**
   * Body triggered a page event.
   */
  onBodyPage({ offset }: any): void;
  /**
   * The body triggered a scroll event.
   */
  onBodyScroll(event: MouseEvent): void;
  /**
   * The footer triggered a page event.
   */
  onFooterPage(event: any): void;
  /**
   * Recalculates the sizes of the page
   */
  calcPageSize(val?: any[]): number;
  /**
   * Calculates the row count.
   */
  calcRowCount(val?: any[]): number;
  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({ event, column }: any): void;
  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({ event, row }: any): void;
  /**
   * The header triggered a column resize event.
   */
  onColumnResize({ column, newValue }: any): void;
  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({ column, newValue, prevValue }: any): void;
  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event: any): void;
  /**
   * Toggle all row selection
   */
  onHeaderSelect(event: any): void;
  /**
   * A row was selected from body
   */
  onBodySelect(event: any): void;
  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event: any): void;
  ngOnDestroy(): void;
  /**
   * listen for changes to input bindings of all DataTableColumnDirective and
   * trigger the columnTemplates.changes observable to emit
   */
  private listenForColumnInputChanges;
  private sortInternalRows;
  static ɵfac: i0.ɵɵFactoryDeclaration<
    DatatableComponent,
    [{ skipSelf: true }, { skipSelf: true }, null, null, null, null, { optional: true }]
  >;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    DatatableComponent,
    'ngx-datatable',
    never,
    {
      targetMarkerTemplate: 'targetMarkerTemplate';
      rows: 'rows';
      groupRowsBy: 'groupRowsBy';
      groupedRows: 'groupedRows';
      columns: 'columns';
      selected: 'selected';
      scrollbarV: 'scrollbarV';
      scrollbarH: 'scrollbarH';
      rowHeight: 'rowHeight';
      columnMode: 'columnMode';
      headerHeight: 'headerHeight';
      footerHeight: 'footerHeight';
      externalPaging: 'externalPaging';
      externalSorting: 'externalSorting';
      limit: 'limit';
      count: 'count';
      offset: 'offset';
      loadingIndicator: 'loadingIndicator';
      selectionType: 'selectionType';
      reorderable: 'reorderable';
      swapColumns: 'swapColumns';
      sortType: 'sortType';
      sorts: 'sorts';
      cssClasses: 'cssClasses';
      messages: 'messages';
      rowClass: 'rowClass';
      selectCheck: 'selectCheck';
      displayCheck: 'displayCheck';
      groupExpansionDefault: 'groupExpansionDefault';
      trackByProp: 'trackByProp';
      selectAllRowsOnPage: 'selectAllRowsOnPage';
      virtualization: 'virtualization';
      treeFromRelation: 'treeFromRelation';
      treeToRelation: 'treeToRelation';
      summaryRow: 'summaryRow';
      summaryHeight: 'summaryHeight';
      summaryPosition: 'summaryPosition';
      rowIdentity: 'rowIdentity';
    },
    {
      scroll: 'scroll';
      activate: 'activate';
      select: 'select';
      sort: 'sort';
      page: 'page';
      reorder: 'reorder';
      resize: 'resize';
      tableContextmenu: 'tableContextmenu';
      treeAction: 'treeAction';
    },
    ['rowDetail', 'groupHeader', 'footer', 'columnTemplates'],
    never,
    false
  >;
}
