'use client'

import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import AdminLayout from '../../layout';
import {
  ADMIN_COMPONENTS,
  COMMON_COMPONENTS
} from '@/src/components';
import { ADMIN_CONSTANTS } from '@/src/utils/constants';
import {
  DeleteRecord,
  FetchAllRecords
} from './axios';
import { usePageTitle } from '@/src/hooks';
import { ROUTES } from '@/src/utils/routes';

/**
 * ExamsManagePage Component
 * 
 * Displays a paginated table of exam sentences with search, delete and view capabilities.
 * Implements debounced search and optimized re-renders using React hooks.
 * 
 * Features:
 * - Paginated data table with configurable page size
 * - Debounced search functionality
 * - Row actions: Delete, Edit, View
 * - Loading states
 * - Confirmation dialog for delete action
 */
const ExamsManagePage = () => {
  // set page title
  usePageTitle({
    title: [
      ROUTES.ADMIN_EXAM_SENTENCES.name,
      ADMIN_CONSTANTS.MODULE_TITLE
    ]
  });

  // state management
  const [data, setData] = useState({ records: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteDialogue, setShowDeleteDialogue] = useState({
    status: false,
    value: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({
    pageIndex: 0,
    pageSize: ADMIN_CONSTANTS.DATA_TABLE_PAGE_SIZE,
  });

  // fetch data on component mount
  useEffect(() => {
    fetchData(searchQuery, paginationInfo.pageSize, paginationInfo.pageIndex);
  }, []);

  // fetch data handler
  const fetchData = useCallback(async (query, pageSize, pageIndex) => {
    setIsLoading(true);
    await FetchAllRecords({
      limit: pageSize,
      page: pageIndex + 1,
      query: query,
      setIsLoading: setIsLoading,
      setData: setData,
    });
  }, []);

  // debounced search implementation
  const debouncedFetch = useMemo(
    () => debounce((query, pageSize, pageIndex) => {
      fetchData(query, pageSize, pageIndex);
    }, 500),
    [fetchData]
  );

  // handle search and pagination changes
  useEffect(() => {
    debouncedFetch(searchQuery, paginationInfo.pageSize, paginationInfo.pageIndex);

    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, paginationInfo.pageIndex, paginationInfo.pageSize, searchQuery]);

  // table columns configuration
  const columns = useMemo(
    () => [
      {
        accessorKey: 'index', header: '#', maxSize: 0, grow: false,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.index}</span>
      },
      {
        accessorKey: 'name', header: 'Title', grow: true,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.name}</span>
      },
      {
        accessorKey: 'total_marks', header: 'Marks', maxSize: 0, grow: false,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.total_marks}</span>
      },
      {
        accessorKey: 'limit', header: 'Limit', maxSize: 0, grow: false,
        // Cell: ({ row }) => <span className='text-wrap'>{row.original.limit}</span>
      },
      {
        accessorKey: 'complexity_levels', header: 'Complexity', maxSize: 0, grow: false,
        Cell: ({ row }) => {
          const complexityBadges = {
            easy: { bg: 'bg-success', label: 'Easy' },
            medium: { bg: 'bg-dark', label: 'Medium' },
            hard: { bg: 'bg-danger', label: 'Hard' }
          };

          return (
            <div className="d-flex gap-1">
              {row.original.complexity_levels.map((level, index) => {
                const complexity = level.toLowerCase();
                const badge = complexityBadges[complexity];

                return (
                  <span key={index} className={`badge ${badge.bg}`}>
                    {badge.label}
                  </span>
                );
              })}
            </div>
          );
        }
      },
      {
        accessorKey: 'status', header: 'Status', maxSize: 0, grow: false,
        Cell: ({ row }) => (
          <>
            {
              row.original.status === 'Active' &&
              <span className='badge bg-success'>
                {row.original.status}
              </span>
            }
            {
              row.original.status === 'Inactive' &&
              <span className='badge bg-danger'>
                {row.original.status}
              </span>
            }
          </>
        )
      },
      // {
      //   accessorKey: 'updatedBy', header: 'Updated By', maxSize: 0, grow: false,
      //   Cell: ({ row }) => <span className='text-wrap'>{row.original.updatedBy}</span>
      // },
      {
        accessorKey: 'updatedAt', header: 'Updated At', maxSize: 0, grow: false,
        // Cell: ({ row }) => <span className='text-wrap'>{row.original.updatedAt}</span>
      },
    ],
    [],
  );

  // delete handler
  const handleDelete = async (id) => {
    if (!id) return;
    setShowDeleteDialogue({ status: true, value: id });
  };

  // handle delete confirmation
  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    await DeleteRecord({ id: showDeleteDialogue.value, setIsLoading });
    await fetchData(searchQuery, paginationInfo.pageSize, paginationInfo.pageIndex);
    setShowDeleteDialogue({ status: false, value: null });
  };

  if (isLoading) {
    return (
      <ADMIN_COMPONENTS.ContentWrapper>
        <COMMON_COMPONENTS.Loader wrapped={true} message='Loading Data...' />
      </ADMIN_COMPONENTS.ContentWrapper>
    );
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper>
      <ADMIN_COMPONENTS.DataTable.Header
        title='Manage Exams'
        actions={[
          {
            href: ROUTES.ADMIN_EXAM_MANAGE_ADD.path,
            label: 'Add',
            icon: faPlus,
            variant: 'outline-secondary'
          },
          {
            href: ROUTES.ADMIN_EXAM_MODULE.path,
            label: 'Back',
            icon: faArrowLeft,
            variant: 'outline-secondary'
          },
        ]}
      />

      <ADMIN_COMPONENTS.DataTable.Table
        rowCount={data?.totalRecords || 0}
        onPaginationChange={setPaginationInfo}
        onGlobalFilterChange={setSearchQuery}
        state={{
          globalFilter: searchQuery,
          pagination: paginationInfo,
          isLoading,
        }}
        columns={columns}
        enableSorting={false}
        data={data.records || []}
        renderRowActions={({ row }) => (
          <ADMIN_COMPONENTS.DataTable.RowActions.Main
            actions={(() => {
              const { DeleteAction, EditAction, ViewAction } = ADMIN_COMPONENTS.DataTable.RowActions;
              return [
                DeleteAction({ onClick: () => handleDelete(row.original._id) }),
                EditAction({ href: `${ROUTES.ADMIN_EXAM_MANAGE.path}/${row.original._id}?edit=true` }),
                ViewAction({ href: `${ROUTES.ADMIN_EXAM_MANAGE.path}/${row.original._id}?view=true` })
              ];
            })()}
          />
        )}
      />

      {showDeleteDialogue.status && (
        <COMMON_COMPONENTS.AlertDialogue
          title='Warning'
          positiveMessage='Delete'
          negativeMessage='Cancel'
          positiveCallback={handleDeleteConfirm}
          negativeCallback={() => setShowDeleteDialogue({ status: false, value: null })}
          show={showDeleteDialogue.status}
          handleClose={() => setShowDeleteDialogue({ status: false, value: null })}
        >
          <p>Are you sure you want to delete this record?</p>
          <p>Once deleted, you will not be able to revert the changes!</p>
        </COMMON_COMPONENTS.AlertDialogue>
      )}
    </ADMIN_COMPONENTS.ContentWrapper>
  );
};

ExamsManagePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ExamsManagePage;