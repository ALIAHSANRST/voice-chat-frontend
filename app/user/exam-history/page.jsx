'use client'

import styled from "styled-components";
import moment from "moment";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { useEffect, useState } from "react";
import { GetExamHistory } from "./axios";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
`

const ContentContainer = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const TableHeaderContainer = styled.div`
  display: flex;

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: 'Montserrat', sans-serif;

    h1 {
      font-size: 1.625rem;
      font-weight: 600;
      color: ${USER_COLORS.ExamHistory.PrimaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1.375rem;
      }
    }

    p {
      font-size: 1rem;
      color: ${USER_COLORS.ExamHistory.SecondaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  }
`

const TableBodyContainer = styled.div`
  table {
    width: 100%;
    border-collapse: separate;
    font-family: 'Montserrat', sans-serif;
    border-spacing: 0 0.75rem;

    @media (max-width: 768px) {
      border-spacing: 0 0.5rem;
    }
  }

  thead {
    tr {
      th {
        font-size: 0.875rem;
        font-weight: 600;
        color: ${USER_COLORS.ExamHistory.SecondaryText};
        text-align: left;
        padding: 0.75rem 2rem 0 2rem;
        text-align: center;

        @media (max-width: 768px) {
          padding: 0.5rem 1.5rem;
        }
      }

      th:first-child {
        text-align: left;
      }

      th:last-child {
        text-align: right;
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 1rem;
        font-weight: 600;
        color: ${USER_COLORS.ExamHistory.TableRecordRow.Text};
        padding: 1.5rem 2rem;
        background-color: ${USER_COLORS.ExamHistory.TableRecordRow.Background};
        border-top: 1px solid ${USER_COLORS.ExamHistory.TableRecordRow.Border};
        border-bottom: 1px solid ${USER_COLORS.ExamHistory.TableRecordRow.Border};
        text-align: center;

        @media (max-width: 768px) {
          padding: 1rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }

      td:first-child {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        border-left: 1px solid ${USER_COLORS.ExamHistory.TableRecordRow.Border};
        text-align: left;

        @media (max-width: 768px) {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }
      }

      td:last-child {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-right: 1px solid ${USER_COLORS.ExamHistory.TableRecordRow.Border};
        text-align: right;

        @media (max-width: 768px) {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      }
    }
  }
`

const ScoreBadgeContainer = styled.div`
  padding: 0.25rem 1.5rem;
  border-radius: 20rem;
  background-color: ${props => props.style.backgroundColor};
  color: ${props => props.style.color};
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.25rem 1rem;
  }
`

const TablePaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid ${USER_COLORS.ExamHistory.TableRecordRow.Border};
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    color: ${USER_COLORS.ExamHistory.SecondaryText};
    font-weight: 600;

    @media (max-width: 768px) {
      padding: 0.25rem 0.75rem;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background: ${USER_COLORS.ExamHistory.TableRecordRow.PrimaryBadge.Background};
      color: ${USER_COLORS.ExamHistory.TableRecordRow.PrimaryBadge.Text};
      border: none;
    }
  }
`

const ExamHistoryPage = () => {
  usePageTitle({ title: 'Exam History' })

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    GetExamHistory({
      limit: filters.limit,
      page: filters.page,
      query: filters.search,
      setIsLoading: setIsLoading,
      setData: setData
    })
  }, [filters]);

  const GetPaginationGroup = () => {
    let start = Math.max(filters.page - 2, 1);
    let end = Math.min(start + 4, data?.totalPages);

    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="history" />
      <ContentContainer>
        <TableHeaderContainer>
          <div className="left">
            <h1>History</h1>
            <p>View a record of your past activities and performances.</p>
          </div>
        </TableHeaderContainer>

        {
          !isLoading && data?.examHistory?.length > 0 &&
          <TableBodyContainer>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {data?.examHistory?.map((item) => (
                  <tr key={item._id}>
                    <td>{moment(item.createdAt).format('DD MMMM YYYY')}</td>
                    <td>{moment(item.time).format('hh:mm A')}</td>
                    <td>
                      <ScoreBadgeContainer style={{
                        backgroundColor: item.finalScore <= 65
                          ? USER_COLORS.ExamHistory.TableRecordRow.DangerBadge.Background
                          : USER_COLORS.ExamHistory.TableRecordRow.PrimaryBadge.Background,
                        color: item.finalScore <= 65
                          ? USER_COLORS.ExamHistory.TableRecordRow.DangerBadge.Text
                          : USER_COLORS.ExamHistory.TableRecordRow.PrimaryBadge.Text
                      }}>
                        {item.finalScore}%
                      </ScoreBadgeContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableBodyContainer>
        }

        {
          !isLoading && data?.examHistory?.length === 0 &&
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem',
            border: '1px solid #EBEEF2',
            borderRadius: '1rem',
            backgroundColor: 'white'
          }}>
            <p>No Records Found!</p>
          </div>
        }

        {
          isLoading &&
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem',
            border: '1px solid #EBEEF2',
            borderRadius: '1rem',
            backgroundColor: 'white'
          }}>
            <COMMON_COMPONENTS.Loader wrapped message={'Loading...'} />
          </div>
        }

        {
          !isLoading && data?.examHistory?.length > 0 &&
          <TablePaginationContainer>
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1 || isLoading}
            >
              Prev
            </button>

            {GetPaginationGroup().map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={filters.page === pageNumber ? 'active' : ''}
                disabled={isLoading}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === data?.totalPages || isLoading}
            >
              Next
            </button>
          </TablePaginationContainer>
        }
      </ContentContainer>
    </MainContainer>
  )
}

export default ExamHistoryPage