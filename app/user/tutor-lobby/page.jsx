'use client'

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useEffect, useState } from "react";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { ICON_ASSETS } from "@/src/utils/assets";
import { LOCATIONS } from "@/src/utils/constants";
import { GetTutorsForLobby } from "./axios";
import Link from "next/link";
import { ROUTES } from "@/src/utils/routes";

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
      color: ${USER_COLORS.TutorLobby.Header.PrimaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1.375rem;
      }
    }

    p {
      font-size: 1rem;
      color: ${USER_COLORS.TutorLobby.Header.SecondaryText};
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
    border: 1px solid ${USER_COLORS.TutorLobby.Pagination.Border};
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    color: ${USER_COLORS.TutorLobby.Pagination.SecondaryText};
    font-weight: 600;

    @media (max-width: 768px) {
      padding: 0.25rem 0.75rem;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background: ${USER_COLORS.TutorLobby.Pagination.Background};
      color: ${USER_COLORS.TutorLobby.Pagination.Text};
      border: none;
    }
  }
`

const BaseContainerA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${USER_COLORS.TutorLobby.NoRecordsFound.Border};
  border-radius: 1rem;
  background-color: ${USER_COLORS.TutorLobby.NoRecordsFound.Background};
`

const NoRecordsFoundContainer = styled(BaseContainerA)`
  p {
    color: ${USER_COLORS.TutorLobby.NoRecordsFound.Text};
    padding: 0;
    margin: 0;
    font-size: 1.125rem;
  }
`

const LoadingContainer = styled(BaseContainerA)``

const TutorCardGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const TutorCard = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${USER_COLORS.TutorLobby.Card.Background};
  border: 1px solid ${USER_COLORS.TutorLobby.Card.Border};
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: relative;
`

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
`

const TutorName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${USER_COLORS.TutorLobby.Card.PrimaryText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    max-width: 12.5rem;
  }
`

const DetailsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: ${USER_COLORS.TutorLobby.Card.SecondaryText};
  font-size: 0.875rem;
`

const LinkedInLink = styled.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${USER_COLORS.TutorLobby.Card.LinkedIn};
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const ActionSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`

const MessageIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`

const RequestButton = styled.div`
  flex: 1;
  button {
    width: 100%;
  }
`

const TutorLobbyPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.TUTOR_LOBBY.TITLE });

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    GetTutorsForLobby({
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

  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters(prev => ({
        ...prev,
        search: value,
        page: 1
      }));
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="lobby" />
      <ContentContainer>
        <HeaderContainer>
          <div className="left">
            <h1>{translations.TUTOR_LOBBY.HEADING}</h1>
            <p>{translations.TUTOR_LOBBY.DESCRIPTION}</p>
          </div>
          <div className="right">
            <USER_COMPONENTS.InputFields.SearchField
              placeholder={translations.TUTOR_LOBBY.SEARCH_PLACEHOLDER || "Search tutors..."}
              onChange={handleSearch}
              containerStyle={{ padding: "0.7rem 1rem" }}
              value={searchValue}
            />
          </div>
        </HeaderContainer>

        {
          !isLoading && data?.teachers?.length > 0 &&
          <TutorCardGrid>
            {data.teachers.map((teacher) => (
              <TutorCard key={teacher._id}>
                {teacher.linkedInProfile && (
                  <LinkedInLink
                    href={`https://linkedin.com/in/${teacher.linkedInProfile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`LinkedIn`}>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </LinkedInLink>
                )}
                <ImageSection>
                  <ProfileImage
                    src={ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON}
                    alt={teacher.fullname}
                  />
                </ImageSection>
                <InfoSection>
                  <TutorName title={teacher.fullname}>
                    {teacher.fullname}
                  </TutorName>
                  <DetailsRow>
                    <span>
                      {translations.TUTOR_LOBBY.TUTOR}
                    </span>
                    {teacher.location && teacher.location !== LOCATIONS.UNSPECIFIED && (
                      <>
                        <span>•</span>
                        <span>
                          {
                            teacher.location === LOCATIONS.JAPAN
                              ? 'Japan'
                              : teacher.location === LOCATIONS.USA
                                ? 'USA'
                                : teacher.location
                          }
                        </span>
                      </>
                    )}
                  </DetailsRow>
                </InfoSection>
                <ActionSection>
                  <Link href={`${ROUTES.USER_MESSAGES.path}?id=${teacher._id}`} passHref>
                    <MessageIcon
                      src={ICON_ASSETS.MESSAGE_LINK_ICON}
                      alt="Message Link"
                      title={translations.TUTOR_LOBBY.MESSAGE.replace('{tutor_name}', teacher.fullname)}
                    />
                  </Link>
                  <RequestButton>
                    {
                      teacher.is_requested
                        ? <USER_COMPONENTS.Button text={translations.TUTOR_LOBBY.REQUEST} />
                        : <USER_COMPONENTS.OutlinedButton text={translations.TUTOR_LOBBY.REQUESTED} />
                    }
                  </RequestButton>
                </ActionSection>
              </TutorCard>
            ))}
          </TutorCardGrid>
        }

        {
          !isLoading && data?.teachers?.length === 0 &&
          <NoRecordsFoundContainer>
            <p>{translations.TUTOR_LOBBY.NO_TUTORS_FOUND}</p>
          </NoRecordsFoundContainer>
        }

        {
          isLoading &&
          <LoadingContainer>
            <COMMON_COMPONENTS.Loader wrapped message={'Loading...'} />
          </LoadingContainer>
        }

        {
          !isLoading && data?.teachers?.length > 0 &&
          <PaginationContainer>
            <button onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1 || isLoading}>
              {translations.TUTOR_LOBBY.PREV}
            </button>

            {
              GetPaginationGroup().map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={filters.page === pageNumber ? 'active' : ''}
                  disabled={isLoading}
                >{pageNumber}</button>
              ))
            }

            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === data?.totalPages || isLoading}
            >
              {translations.TUTOR_LOBBY.NEXT}
            </button>
          </PaginationContainer>
        }
      </ContentContainer>
    </MainContainer>
  )
}

export default TutorLobbyPage