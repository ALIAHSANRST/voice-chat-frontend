'use client'
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import AdminLayout from "../layout";
import { useAdminContext } from '@/context/adminContext';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Box, Tooltip, IconButton, Input, ButtonBase } from '@mui/material';
import {
  Clear,
  Search,
  Visibility,
} from '@mui/icons-material';
import Loader from '@/Components/Loader';
import CustomDataTable from '@/Components/CustomDataTable';

const AllScoresAndTranscript = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [search, setSearch] = useState('');

  const { userResults, loading, getAllUserScores } = useAdminContext()

  const GetData = useCallback(
    async () => {
      await getAllUserScores({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        query: search,
      })
    },
    [pagination, search]
  );

  useEffect(() => {
    GetData();
  }, []);

  const HandleSearch = async () => {
    await GetData();
  };

  const HandleClear = async () => {
    setSearch('');
    await GetData();
  };

  const columns = useMemo(
    () => [
      { accessorKey: 'index', header: '#', size: 0 },
      { accessorKey: 'user.username', header: 'Username', size: 0 },
      { accessorKey: 'user.email', header: 'Email', size: 0 },
      { accessorKey: 'score', header: 'Score', size: 0 },
      { accessorKey: 'transcript', header: 'Transcript', size: 0 },
      { accessorKey: 'createdAt', header: 'Attempted At', size: 0 },
    ],
    [],
  );

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container style={{ padding: '1.25rem' }}>
      <Container style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.5rem' }}>
        {
          loading
            ?
            <>
              <div className='d-flex justify-content-center align-items-center flex-column py-3'>
                <span className='mb-2 fs-5 text-secondary text-center'>
                  Loading Data
                </span>
                <Loader />
              </div>
            </>
            :
            <>
              <CustomDataTable
                rowCount={userResults?.totalRecords || 0}
                onPaginationChange={setPagination}
                state={{ isLoading: loading, pagination }}
                columns={columns}
                data={userResults?.exams || []}
                renderTopToolbarCustomActions={() => (
                  <Container className='m-0 p-0'>
                    <Row className='m-0 p-0'>
                      <Col className='m-0 p-0'>
                      </Col>
                      <Col
                        className='m-0 p-0'
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}>
                        <Input
                          placeholder='Search'
                          value={search}
                          className='w-100'
                          startAdornment={
                            <ButtonBase onClick={HandleSearch}>
                              <Search style={{ marginRight: '0.25rem', fontSize: '1.35rem' }} />
                            </ButtonBase>
                          }
                          endAdornment={
                            <ButtonBase onClick={HandleClear}>
                              <Clear style={{ marginRight: '0.25rem', fontSize: '1.35rem' }} />
                            </ButtonBase>
                          }
                          onKeyDown={(e) => { if (e.key === 'Enter') HandleSearch() }}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Container>
                )}
                renderRowActions={({ row, table }) => (
                  <Box sx={{ display: 'flex' }}>
                    <Tooltip arrow placement='right' title='View'>
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setModalData(row.original);
                          setShowModal(true);
                        }}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              />
            </>
        }
      </Container>
      <>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Exam Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Transcript:</strong> {modalData.transcript}</p>
            <p><strong>Score: </strong>
              {
                modalData.score >= 50
                  ? <span className='badge bg-success text-white'>{modalData.score}</span>
                  : <span className='badge bg-danger text-white'>{modalData.score}</span>
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
    </Container>
  );
};

AllScoresAndTranscript.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AllScoresAndTranscript;