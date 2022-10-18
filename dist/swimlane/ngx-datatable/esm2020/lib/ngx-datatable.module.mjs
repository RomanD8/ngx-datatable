import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { VisibilityDirective } from './directives/visibility.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';
import * as i0 from '@angular/core';
export class NgxDatatableModule {
  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(configuration) {
    return {
      ngModule: NgxDatatableModule,
      providers: [{ provide: 'configuration', useValue: configuration }]
    };
  }
}
NgxDatatableModule.ɵfac = i0.ɵɵngDeclareFactory({
  minVersion: '12.0.0',
  version: '14.2.6',
  ngImport: i0,
  type: NgxDatatableModule,
  deps: [],
  target: i0.ɵɵFactoryTarget.NgModule
});
NgxDatatableModule.ɵmod = i0.ɵɵngDeclareNgModule({
  minVersion: '14.0.0',
  version: '14.2.6',
  ngImport: i0,
  type: NgxDatatableModule,
  declarations: [
    DataTableFooterTemplateDirective,
    VisibilityDirective,
    DraggableDirective,
    ResizeableDirective,
    OrderableDirective,
    LongPressDirective,
    ScrollerComponent,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableHeaderComponent,
    DataTableHeaderCellComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    DataTablePagerComponent,
    ProgressBarComponent,
    DataTableBodyRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DataTableSummaryRowComponent
  ],
  imports: [CommonModule],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent,
    DatatableGroupHeaderTemplateDirective
  ]
});
NgxDatatableModule.ɵinj = i0.ɵɵngDeclareInjector({
  minVersion: '12.0.0',
  version: '14.2.6',
  ngImport: i0,
  type: NgxDatatableModule,
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
  imports: [CommonModule]
});
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '14.2.6',
  ngImport: i0,
  type: NgxDatatableModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CommonModule],
          providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
          declarations: [
            DataTableFooterTemplateDirective,
            VisibilityDirective,
            DraggableDirective,
            ResizeableDirective,
            OrderableDirective,
            LongPressDirective,
            ScrollerComponent,
            DatatableComponent,
            DataTableColumnDirective,
            DataTableHeaderComponent,
            DataTableHeaderCellComponent,
            DataTableBodyComponent,
            DataTableFooterComponent,
            DataTablePagerComponent,
            ProgressBarComponent,
            DataTableBodyRowComponent,
            DataTableRowWrapperComponent,
            DatatableRowDetailDirective,
            DatatableGroupHeaderDirective,
            DatatableRowDetailTemplateDirective,
            DataTableBodyCellComponent,
            DataTableSelectionComponent,
            DataTableColumnHeaderDirective,
            DataTableColumnCellDirective,
            DataTableColumnCellTreeToggle,
            DatatableFooterDirective,
            DatatableGroupHeaderTemplateDirective,
            DataTableSummaryRowComponent
          ],
          exports: [
            DatatableComponent,
            DatatableRowDetailDirective,
            DatatableGroupHeaderDirective,
            DatatableRowDetailTemplateDirective,
            DataTableColumnDirective,
            DataTableColumnHeaderDirective,
            DataTableColumnCellDirective,
            DataTableColumnCellTreeToggle,
            DataTableFooterTemplateDirective,
            DatatableFooterDirective,
            DataTablePagerComponent,
            DatatableGroupHeaderTemplateDirective
          ]
        }
      ]
    }
  ]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGF0YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvbmd4LWRhdGF0YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RixPQUFP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a0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsNEJBQTRCO3dCQUM1QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixvQkFBb0I7d0JBQ3BCLHlCQUF5Qjt3QkFDekIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5Qiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0Isd0JBQXdCO3dCQUN4QixxQ0FBcUM7d0JBQ3JDLDRCQUE0QjtxQkFDN0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLDRCQUE0Qjt3QkFDNUIsNkJBQTZCO3dCQUM3QixnQ0FBZ0M7d0JBQ2hDLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixxQ0FBcUM7cUJBQ3RDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTY3JvbGxiYXJIZWxwZXIgfSBmcm9tICcuL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEaW1lbnNpb25zSGVscGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9kaW1lbnNpb25zLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb2x1bW4tY2hhbmdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZUZvb3RlclRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXItdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFZpc2liaWxpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlzaWJpbGl0eS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RyYWdnYWJsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUmVzaXplYWJsZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9yZXNpemVhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPcmRlcmFibGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXJhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBMb25nUHJlc3NEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbG9uZy1wcmVzcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9zY3JvbGxlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RhdGF0YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGFUYWJsZUJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL3BhZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc0JhckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3Byb2dyZXNzLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQm9keVJvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVSb3dXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvYm9keS1yb3ctd3JhcHBlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvcm93LWRldGFpbC9yb3ctZGV0YWlsLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L2JvZHktY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JvZHkvc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4taGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLWNlbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbHVtbnMvdHJlZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGF0YWJsZUdyb3VwSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudHMvYm9keS9ib2R5LWdyb3VwLWhlYWRlci10ZW1wbGF0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlU3VtbWFyeVJvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ib2R5L3N1bW1hcnkvc3VtbWFyeS1yb3cuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1Njcm9sbGJhckhlbHBlciwgRGltZW5zaW9uc0hlbHBlciwgQ29sdW1uQ2hhbmdlc1NlcnZpY2VdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBWaXNpYmlsaXR5RGlyZWN0aXZlLFxuICAgIERyYWdnYWJsZURpcmVjdGl2ZSxcbiAgICBSZXNpemVhYmxlRGlyZWN0aXZlLFxuICAgIE9yZGVyYWJsZURpcmVjdGl2ZSxcbiAgICBMb25nUHJlc3NEaXJlY3RpdmUsXG4gICAgU2Nyb2xsZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVIZWFkZXJDb21wb25lbnQsXG4gICAgRGF0YVRhYmxlSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBEYXRhVGFibGVCb2R5Q29tcG9uZW50LFxuICAgIERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVQYWdlckNvbXBvbmVudCxcbiAgICBQcm9ncmVzc0JhckNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50LFxuICAgIERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUJvZHlDZWxsQ29tcG9uZW50LFxuICAgIERhdGFUYWJsZVNlbGVjdGlvbkNvbXBvbmVudCxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVTdW1tYXJ5Um93Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRhdGFibGVDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlUm93RGV0YWlsRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZUdyb3VwSGVhZGVyRGlyZWN0aXZlLFxuICAgIERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSxcbiAgICBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSxcbiAgICBEYXRhVGFibGVGb290ZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUsXG4gICAgRGF0YVRhYmxlUGFnZXJDb21wb25lbnQsXG4gICAgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neERhdGF0YWJsZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBDb25maWd1cmUgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gdmlhIElOZ3hEYXRhdGFibGVDb25maWdcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb246IElOZ3hEYXRhdGFibGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neERhdGF0YWJsZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4RGF0YXRhYmxlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiAnY29uZmlndXJhdGlvbicsIHVzZVZhbHVlOiBjb25maWd1cmF0aW9uIH1dXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEludGVyZmFjZSBkZWZpbml0aW9uIGZvciBJTmd4RGF0YXRhYmxlQ29uZmlnIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU5neERhdGF0YWJsZUNvbmZpZyB7XG4gIG1lc3NhZ2VzOiB7XG4gICAgZW1wdHlNZXNzYWdlOiBzdHJpbmc7IC8vIE1lc3NhZ2UgdG8gc2hvdyB3aGVuIGFycmF5IGlzIHByZXNlbnRlZCwgYnV0IGNvbnRhaW5zIG5vIHZhbHVlc1xuICAgIHRvdGFsTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgdG90YWwgbWVzc2FnZVxuICAgIHNlbGVjdGVkTWVzc2FnZTogc3RyaW5nOyAvLyBGb290ZXIgc2VsZWN0ZWQgbWVzc2FnZVxuICB9O1xufVxuIl19
