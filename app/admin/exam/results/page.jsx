'use client'

import { Modal, Button } from 'react-bootstrap';
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
  FetchAllRecords,
  DeleteRecord
} from './axios';
import { usePageTitle } from '@/src/hooks';
import { ROUTES } from '@/src/utils/routes';

/**
 * ExamResultsPage Component
 * 
 * Displays a paginated table of exam results with search, delete and view capabilities.
 * Implements debounced search and optimized re-renders using React hooks.
 * 
 * Features:
 * - Paginated data table with configurable page size
 * - Debounced search functionality
 * - Row actions: Delete, View
 * - Loading states
 * - Delete confirmation dialogue
 */
const ExamResultsPage = () => {
  // set page title
  usePageTitle({
    title: [
      ROUTES.ADMIN_EXAM_RESULTS.name,
      ADMIN_CONSTANTS.MODULE_TITLE
    ]
  });

  // state management
  const [data, setData] = useState({ records: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({
    pageIndex: 0,
    pageSize: ADMIN_CONSTANTS.DATA_TABLE_PAGE_SIZE,
  });

  const [showDeleteDialogue, setShowDeleteDialogue] = useState({
    status: false,
    value: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleCloseModal = () => setShowModal(false);

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
        accessorKey: 'name', header: 'Attempted By', grow: true,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.user.fullname} <br />
          <small className='text-muted'>({row.original.user.email})</small>
        </span>
      },
      {
        accessorKey: 'finalScore', header: 'Score', maxSize: 0, grow: false,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.finalScore}/{row.original.totalMarks}</span>
      },
      {
        accessorKey: 'createdAt', header: 'Attempted At', maxSize: 0, grow: false,
        Cell: ({ row }) => <span className='text-wrap'>{row.original.createdAt}</span>
      },
    ],
    [],
  );

  // delete handler
  const handleDelete = async (id) => {
    if (!id) return;
    setShowDeleteDialogue({ status: true, value: id });
  };

  // view handler
  const handleView = (data) => {
    setModalData(data);
    setShowModal(true);
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
      <ADMIN_COMPONENTS.DataTable.Header title='Manage Exam Results' />

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
              const { ViewAction, DeleteAction } = ADMIN_COMPONENTS.DataTable.RowActions;
              return [
                DeleteAction({ onClick: () => handleDelete(row.original._id) }),
                ViewAction({ onClick: () => handleView(row.original) }),
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

      <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Result Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Transcript:</strong> {modalData.transcript || 'Empty...'}</p>
            <p><strong>Score: </strong>
              {
                modalData.finalScore >= 65
                  ? <span className='badge bg-success text-white'>{modalData.finalScore}/{modalData.totalMarks}</span>
                  : <span className='badge bg-danger text-white'>{modalData.finalScore}/{modalData.totalMarks}</span>
              }
            </p>
            <p>
              <small>
                <strong>Attempted At:</strong> <span className='text-secondary'>{modalData.createdAt}</span>
              </small>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </ADMIN_COMPONENTS.ContentWrapper>
  );
};

ExamResultsPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ExamResultsPage;