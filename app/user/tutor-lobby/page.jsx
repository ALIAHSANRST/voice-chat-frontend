'use client'

import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import styled from "styled-components";
import debounce from 'lodash/debounce';

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { ICON_ASSETS } from "@/src/utils/assets";
import { LOCATIONS } from "@/src/utils/constants";
import { ROUTES } from "@/src/utils/routes";
import { GetTutorsForLobby, GetTeacherSlots, RequestTeahcer } from "./axios";

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

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ModalDropDownContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const ModalActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`

const RequestButton = styled.div`
  flex: 1;
  align-self: stretch;
  button {
    width: 100%;
    font-size: 0.875rem;
    padding: 0 1rem;
    height: 100%;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [teacherSlots, setTeacherSlots] = useState({});
  const [requestForm, setRequestForm] = useState({
    title: '',
    day: '',
    slot: ''
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    day: '',
    slot: ''
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

  const HandleRequestClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
    setIsLoadingSlots(true);
    setRequestForm({ title: '', day: '', slot: '' });

    GetTeacherSlots({
      setIsLoading: setIsLoadingSlots,
      setData: setTeacherSlots,
      userId: teacher._id,
    });
  };

  const CloseModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setSelectedTeacher(null);
    setTeacherSlots({});
    setRequestForm({ title: '', day: '', slot: '' });
    setFormErrors({ title: '', day: '', slot: '' });
    setIsSubmitting(false);
  };

  const ValidateModalField = (name, value) => {
    switch (name) {
      case 'title':
        const trimmedTitle = value.trim();
        if (!trimmedTitle) return translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.REQUIRED;
        if (trimmedTitle.length < 3) return translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.MIN_LENGTH.replace('{length}', 3);
        if (trimmedTitle.length > 50) return translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.MAX_LENGTH.replace('{length}', 50);
        return '';
      case 'day':
        return !value ? translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.REQUIRED : '';
      case 'slot':
        return !value ? translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.REQUIRED : '';
      default:
        return '';
    }
  };

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({
      ...prev,
      [name]: value
    }));

    const error = ValidateModalField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (name === 'day') {
      setRequestForm(prev => ({
        ...prev,
        [name]: value,
        slot: ''
      }));
      setFormErrors(prev => ({
        ...prev,
        [name]: error,
        slot: ''
      }));
    }
  };

  const HandleModalSubmit = async () => {
    const errors = {
      title: ValidateModalField('title', requestForm.title),
      day: ValidateModalField('day', requestForm.day),
      slot: ValidateModalField('slot', requestForm.slot)
    };

    setFormErrors(errors);
    if (Object.values(errors).some(error => error)) return;

    await RequestTeahcer({
      setIsLoading: setIsSubmitting,
      data: {
        teacherId: selectedTeacher._id,
        title: requestForm.title,
        day: requestForm.day,
        slot: requestForm.slot
      },
    })

    CloseModal();

    GetTutorsForLobby({
      limit: filters.limit,
      page: filters.page,
      query: filters.search,
      setIsLoading: setIsLoading,
      setData: setData
    });
  };

  const getAvailableDays = () => {
    return Object.entries(teacherSlots)
      .filter(([_, slots]) => slots.length > 0)
      .map(([day]) => ({
        value: day,
        label: translations.MANAGE_SLOTS.DAYS[day]
      }));
  };

  const getAvailableSlots = () => {
    if (!requestForm.day || !teacherSlots[requestForm.day]) return [];

    return teacherSlots[requestForm.day].map(slot => ({
      value: slot.start,
      label: `${slot.start}`
    }));
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
              onChange={HandleSearch}
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
                        ? <USER_COMPONENTS.OutlinedButton text={translations.TUTOR_LOBBY.REQUESTED} />
                        : <USER_COMPONENTS.Button
                          text={translations.TUTOR_LOBBY.REQUEST}
                          onClick={() => HandleRequestClick(teacher)}
                        />
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

            <button
              onClick={() => HandlePageChange(filters.page + 1)}
              disabled={filters.page === data?.totalPages || isLoading}
            >
              {translations.COMMON.NEXT}
            </button>
          </PaginationContainer>
        }
      </ContentContainer>

      {
        isModalOpen && (
          <USER_COMPONENTS.Modal.Main
            title={translations.TUTOR_LOBBY.REQUEST_MODAL.TITLE}
            modalContainerStyle={{
              padding: '2rem',
              maxWidth: '47.5rem',
              width: '100%',
              overflowY: 'unset',
            }}
            subtitle={translations.TUTOR_LOBBY.REQUEST_MODAL.SUBTITLE.replace('{tutor_name}', selectedTeacher?.fullname)}
            onClose={CloseModal}>
            {
              isLoadingSlots
                ? <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
                : <ModalContentContainer>
                  <USER_COMPONENTS.InputFields.TextInputField
                    label={translations.TUTOR_LOBBY.REQUEST_MODAL.TITLE_LABEL}
                    placeholder={translations.TUTOR_LOBBY.REQUEST_MODAL.TITLE_PLACEHOLDER}
                    name="title"
                    value={requestForm.title}
                    onChange={HandleInputChange}
                    error={formErrors.title}
                  />

                  <ModalDropDownContainer>
                    <USER_COMPONENTS.InputFields.TextInputField
                      type="dropdown"
                      label={translations.TUTOR_LOBBY.REQUEST_MODAL.DAY_LABEL}
                      placeholder={translations.TUTOR_LOBBY.REQUEST_MODAL.DAY_PLACEHOLDER}
                      name="day"
                      value={requestForm.day}
                      onChange={HandleInputChange}
                      values={getAvailableDays()}
                      inputWrapperStyle={{ flex: 1 }}
                      error={formErrors.day}
                    />

                    <USER_COMPONENTS.InputFields.TextInputField
                      type="dropdown"
                      label={translations.TUTOR_LOBBY.REQUEST_MODAL.SLOT_LABEL}
                      placeholder={translations.TUTOR_LOBBY.REQUEST_MODAL.SLOT_PLACEHOLDER}
                      name="slot"
                      value={requestForm.slot}
                      onChange={HandleInputChange}
                      values={getAvailableSlots()}
                      disabled={!requestForm.day}
                      inputWrapperStyle={{ flex: 1 }}
                      error={formErrors.slot}
                      onClick={() => {
                        if (requestForm.day) return;
                        COMMON_COMPONENTS.Toast.showErrorToast(translations.TUTOR_LOBBY.REQUEST_MODAL.ERRORS.SELECT_DAY_FIRST)
                      }}
                    />
                  </ModalDropDownContainer>

                  <ModalActionsContainer>
                    <USER_COMPONENTS.OutlinedButton
                      text={translations.COMMON.CANCEL}
                      onClick={CloseModal}
                      disabled={isSubmitting}
                    />
                    <USER_COMPONENTS.Button
                      text={isSubmitting ? '' : translations.TUTOR_LOBBY.REQUEST_MODAL.SUBMIT}
                      onClick={HandleModalSubmit}
                      disabled={isSubmitting}>
                      {isSubmitting && <COMMON_COMPONENTS.Loader color="white" />}
                    </USER_COMPONENTS.Button>
                  </ModalActionsContainer>
                </ModalContentContainer>
            }
          </USER_COMPONENTS.Modal.Main>
        )}
    </MainContainer>
  )
}

export default TutorLobbyPage