'use client';

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import styled from 'styled-components';

// styled component for the table wrapper
const TableWrapper = styled.div`
  width: 100%;
`;

/**
 * DataTable Component
 * A reusable data table component built on top of MaterialReactTable with advanced features
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.rowCount - Total number of rows in the dataset
 * @param {Function} props.onPaginationChange - Callback function for pagination changes
 * @param {Object} props.state - Current state of the table (pagination, sorting, etc.)
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data to be displayed
 * @param {Function} props.renderTopToolbarCustomActions - Custom render function for top toolbar actions
 * @param {Function} props.renderRowActions - Custom render function for row actions
 * @param {Function} props.onGlobalFilterChange - Callback function for global filter changes
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {string} [props.density='compact'] - Table density ('comfortable', 'compact', 'spacious')
 * @param {boolean} [props.enableFilters=true] - Enable/disable filtering
 * @param {boolean} [props.showGlobalFilter=true] - Show/hide global filter
 * @returns {React.Component} Rendered DataTable component
 */
const DataTable = ({
  rowCount = 0,
  onPaginationChange,
  state,
  columns = [],
  data = [],
  renderTopToolbarCustomActions,
  renderRowActions,
  onGlobalFilterChange,
  className,
  density = 'compact',
  enableFilters = true,
  showGlobalFilter = true,
  ...props
}) => {
  // handle edge case where data or columns are undefined
  if (!Array.isArray(data) || !Array.isArray(columns)) return null;

  const table = useMaterialReactTable({
    columns,
    data,
    enableFilters,
    initialState: {
      showGlobalFilter,
      density,
    },
    positionGlobalFilter: 'left',
    enableColumnActions: false,
    manualPagination: true,
    manualFiltering: true,
    enableFilterMatchHighlighting: false,
    rowCount,
    onPaginationChange,
    state,
    enableColumnFilters: false,
    enableRowActions: Boolean(renderRowActions),
    positionActionsColumn: 'last',
    renderRowActions,
    renderTopToolbarCustomActions,
    onGlobalFilterChange,
    enableClickToCopy: true,
    ...props
  });

  return (
    <TableWrapper className={className}>
      <MaterialReactTable table={table} />
    </TableWrapper>
  );
};

export default DataTable;