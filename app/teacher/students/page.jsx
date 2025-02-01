'use client'

import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import debounce from 'lodash/debounce';

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { GetStudents } from "./axios";

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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: 'Montserrat', sans-serif;

    h1 {
      font-size: 1.625rem;
      font-weight: 600;
      color: ${USER_COLORS.Requests.Header.PrimaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1.375rem;
      }
    }

    p {
      font-size: 1rem;
      color: ${USER_COLORS.Requests.Header.SecondaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  }

  .right {
    width: 100%;
    max-width: 300px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: unset;
    }
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid ${USER_COLORS.Requests.Pagination.Border};
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    color: ${USER_COLORS.Requests.Pagination.SecondaryText};
    font-weight: 600;

    @media (max-width: 768px) {
      padding: 0.25rem 0.75rem;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background: ${USER_COLORS.Requests.Pagination.Background};
      color: ${USER_COLORS.Requests.Pagination.Text};
      border: none;
    }
  }
`

const BaseContainerA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${USER_COLORS.Requests.NoRecordsFound.Border};
  border-radius: 1rem;
  background-color: ${USER_COLORS.Requests.NoRecordsFound.Background};
`

const NoRecordsFoundContainer = styled(BaseContainerA)`
  p {
    color: ${USER_COLORS.Requests.NoRecordsFound.Text};
    padding: 0;
    margin: 0;
    font-size: 1.125rem;
  }
`

const LoadingContainer = styled(BaseContainerA)``

const StudentsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.CardLists.Background};
  padding: 1rem;
`

const StudentsPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.STUDENTS.TITLE });

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    GetStudents({
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

  const HandlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const DebouncedSearch = useCallback(
    debounce((value) => {
      setFilters(prev => ({
        ...prev,
        search: value,
        page: 1
      }));
    }, 500),
    []
  );

  const HandleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    DebouncedSearch(value);
  };

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />
      <ContentContainer>
        <HeaderContainer>
          <div className="left">
            <h1>{translations.STUDENTS.HEADING}</h1>
            <p>{translations.STUDENTS.DESCRIPTION}</p>
          </div>
          <div className="right">
            <USER_COMPONENTS.InputFields.SearchField
              placeholder={translations.STUDENTS.SEARCH_PLACEHOLDER}
              onChange={HandleSearch}
              containerStyle={{ padding: "0.7rem 1rem" }}
              value={searchValue}
            />
          </div>
        </HeaderContainer>

        {
          !isLoading && data?.students?.length > 0 &&
          <StudentsGrid>
            {
              data.students.map(student => (
                <CardWrapper>
                  <USER_COMPONENTS.CardLists.StudentCard
                    key={student._id}
                    student={student}
                    translations={translations}
                  />
                </CardWrapper>
              ))
            }
          </StudentsGrid>
        }

        {
          !isLoading && data?.students?.length === 0 &&
          <NoRecordsFoundContainer>
            <p>{translations.STUDENTS.NO_STUDENTS_FOUND}</p>
          </NoRecordsFoundContainer>
        }

        {
          isLoading &&
          <LoadingContainer>
            <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
          </LoadingContainer>
        }

        {
          !isLoading && data?.students?.length > 0 &&
          <PaginationContainer>
            <button onClick={() => HandlePageChange(filters.page - 1)}
              disabled={filters.page === 1 || isLoading}>
              {translations.COMMON.PREV}
            </button>

            {
              GetPaginationGroup().map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => HandlePageChange(pageNumber)}
                  className={filters.page === pageNumber ? 'active' : ''}
                  disabled={isLoading}
                >{pageNumber}</button>
              ))
            }

            <button onClick={() => HandlePageChange(filters.page + 1)}
              disabled={filters.page === data?.totalPages || isLoading}>
              {translations.COMMON.NEXT}
            </button>
          </PaginationContainer>
        }
      </ContentContainer>
    </MainContainer>
  )
}

export default StudentsPage