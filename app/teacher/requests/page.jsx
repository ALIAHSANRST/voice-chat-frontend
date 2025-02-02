'use client'

import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import debounce from 'lodash/debounce';
import moment from "moment";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { REQUEST_STATUSES } from "@/src/utils/constants";
import { GetRequests, UpdateRequestStatus } from "./axios";

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

const RequestsGrid = styled.div`
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

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const RequestCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  border: 1px solid ${USER_COLORS.Requests.Card.Border};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    display: block;
    height: 0.2rem;
    background: ${props => {
    switch (props.status) {
      case REQUEST_STATUSES.PENDING: return USER_COLORS.Requests.Card.Status.Pending.Background;
      case REQUEST_STATUSES.ACCEPTED: return USER_COLORS.Requests.Card.Status.Accepted.Background;
      case REQUEST_STATUSES.REJECTED: return USER_COLORS.Requests.Card.Status.Rejected.Background;
      default: return 'transparent';
    }
  }};
  }
`

const RequestHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0 0.75rem;
  border-bottom: 1px solid ${USER_COLORS.Requests.Card.Border};

  .image-container {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid ${USER_COLORS.Requests.Card.Border};
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex: 1;
    min-width: 0;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: ${USER_COLORS.Requests.Card.PrimaryText};
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
    }

    p {
      font-size: 0.8125rem;
      color: ${USER_COLORS.Requests.Card.SecondaryText};
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
    }
  }
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  margin-left: auto;
  align-self: flex-start;

  &.pending {
    background: ${USER_COLORS.Requests.Card.Status.Pending.Background};
    color: ${USER_COLORS.Requests.Card.Status.Pending.Text};
  }

  &.accepted {
    background: ${USER_COLORS.Requests.Card.Status.Accepted.Background};
    color: ${USER_COLORS.Requests.Card.Status.Accepted.Text};
  }

  &.rejected {
    background: ${USER_COLORS.Requests.Card.Status.Rejected.Background};
    color: ${USER_COLORS.Requests.Card.Status.Rejected.Text};
  }
`

const RequestActions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    flex: 1;
    padding: 0.375rem;
    font-size: 0.8125rem;
    min-height: 2rem;
    font-weight: 500;
    outline: none;
  }
`

const InfoGrid = styled.div`
  display: grid;
  gap: 0.375rem;
  padding-bottom: 0.5rem;
  font-size: 0.8125rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;

    .label {
      color: ${USER_COLORS.Requests.Card.SecondaryText};
    }

    .value {
      color: ${USER_COLORS.Requests.Card.PrimaryText};
      font-weight: 500;
    }
  }
`

const TopicText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${USER_COLORS.Requests.Card.PrimaryText};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${USER_COLORS.Requests.Card.Border}25;
`

const CalculateSessionDate = (requestDate, requestedDay) => {
  const requestMoment = moment(requestDate);
  const currentDayNum = requestMoment.day(); // 0 (Sunday) to 6 (Saturday)
  const targetDayNum = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    .indexOf(requestedDay.toLowerCase());

  let daysToAdd = targetDayNum - currentDayNum;
  if (daysToAdd <= 0) daysToAdd += 7;

  return requestMoment.add(daysToAdd, 'days');
};

const RequestsPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.REQUESTS.TITLE });

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    GetRequests({
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

  const HandleRequestAction = (requestId, action) => {
    UpdateRequestStatus({
      payload: {
        requestId: requestId,
        action: action,
      },
      setIsLoading: setIsLoading,
      setFilters: setFilters
    })
  };

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="requests" />
      <ContentContainer>
        <HeaderContainer>
          <div className="left">
            <h1>{translations.REQUESTS.HEADING}</h1>
            <p>{translations.REQUESTS.DESCRIPTION}</p>
          </div>
          <div className="right">
            <USER_COMPONENTS.InputFields.SearchField
              placeholder={translations.REQUESTS.SEARCH_PLACEHOLDER}
              onChange={HandleSearch}
              containerStyle={{ padding: "0.7rem 1rem" }}
              value={searchValue}
            />
          </div>
        </HeaderContainer>

        {
          !isLoading && data?.requests?.length > 0 &&
          <RequestsGrid>
            {
              data.requests.map((request) => (
                <RequestCard key={request._id} status={request.status.toLowerCase()}>
                  <CardContent>
                    <RequestHeader>
                      <div className="image-container">
                        <COMMON_COMPONENTS.ImageLoader
                          source={request.student.profile_picture}
                          alt={request.student.fullname}
                        />
                      </div>
                      <div className="info">
                        <h3 title={request.student.fullname}>{request.student.fullname}</h3>
                        <p title={request.student?.email}>{request.student?.email}&nbsp;</p>
                      </div>
                      <StatusBadge className={request.status.toLowerCase()} title={`Status: ${request.status.toUpperCase()}`}>
                        {request.status}
                      </StatusBadge>
                    </RequestHeader>

                    <TopicText title={`Topic: ${request.title}`}>{request.title}</TopicText>

                    <InfoGrid>
                      <div>
                        <span className="label">
                          {translations.REQUESTS.SESSION_DATE}
                        </span>
                        <span className="value">
                          {translations.MANAGE_SLOTS.DAYS[request.day]}, {CalculateSessionDate(request.createdAt, request.day).format('DD MMM')}
                        </span>
                      </div>
                      <div>
                        <span className="label">
                          {translations.REQUESTS.SESSION_TIME}
                        </span>
                        <span className="value">{moment(request.slot, 'HH:mm').format('hh:mm A')}</span>
                      </div>
                      <div>
                        <span className="label">
                          {translations.REQUESTS.REQUESTED_ON}
                        </span>
                        <span className="value">{moment(request.createdAt).format('DD MMM, hh:mm A')}</span>
                      </div>
                    </InfoGrid>

                    <RequestActions>
                      <USER_COMPONENTS.OutlinedButton
                        text={translations.REQUESTS.REJECT}
                        disabled={request.status !== REQUEST_STATUSES.PENDING}
                        onClick={() => HandleRequestAction(request._id, REQUEST_STATUSES.REJECTED)}
                      />
                      <USER_COMPONENTS.Button
                        text={translations.REQUESTS.ACCEPT}
                        disabled={request.status !== REQUEST_STATUSES.PENDING}
                        onClick={() => HandleRequestAction(request._id, REQUEST_STATUSES.ACCEPTED)}
                      />
                    </RequestActions>
                  </CardContent>
                </RequestCard>
              ))}
          </RequestsGrid>
        }

        {
          !isLoading && data?.requests?.length === 0 &&
          <NoRecordsFoundContainer>
            <p>{translations.REQUESTS.NO_REQUESTS_FOUND}</p>
          </NoRecordsFoundContainer>
        }

        {
          isLoading &&
          <LoadingContainer>
            <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
          </LoadingContainer>
        }

        {
          !isLoading && data?.requests?.length > 0 &&
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

export default RequestsPage 