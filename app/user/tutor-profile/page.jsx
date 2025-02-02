'use client'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import styled from "styled-components";
import moment from "moment";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { ROUTES } from "@/src/utils/routes";
import { LOCATIONS } from "@/src/utils/constants";
import { GetTutorProfile } from "./axios";

const COLORS = {
  background: '#F5F7FB',
  cardBackground: '#FFFFFF',
  primary: '#2563EB',
  secondary: '#64748B',
  border: '#E2E8F0',
  text: {
    primary: '#1E293B',
    secondary: '#64748B'
  },
  hover: {
    primary: '#1d4ed8',
    background: '#F8FAFC'
  },
  accent: {
    background: '#EEF2FF',
    border: '#E0E7FF'
  }
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${COLORS.background};
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${COLORS.border};
  border-radius: 1rem;
  background-color: ${COLORS.cardBackground};
`

const ProfileContainer = styled.div`
  background-color: ${COLORS.cardBackground};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${COLORS.primary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${COLORS.hover.primary};
  }

  @media (max-width: 768px) {
    position: relative;
    align-self: flex-start;
    top: 0;
    right: 0;
  }
`

const ProfileHeader = styled.div`
  position: relative;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.25rem;
  background-color: ${COLORS.accent.background};
  border: 1px solid ${COLORS.accent.border};
  border-radius: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    gap: 1rem;
  }
`

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.325rem;
`

const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.675rem;
  color: ${COLORS.text.secondary};
  font-size: 0.875rem;

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

const Introductory = styled.p`
  color: ${COLORS.text.secondary};
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
`

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.border};

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
  }
`

const ProfileImage = styled(COMMON_COMPONENTS.ImageLoader)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${COLORS.cardBackground};
`

const ProfileName = styled.h2`
  color: ${COLORS.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`

const LinkedInLink = styled(Link)`
  color: ${COLORS.primary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${COLORS.hover.primary};
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 120px;

  span:first-child {
    color: ${COLORS.text.secondary};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span:last-child {
    color: ${COLORS.text.primary};
    font-weight: 600;
    font-size: 1.25rem;
  }
`

const DetailSection = styled.div`
  h3 {
    color: ${COLORS.text.primary};
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
  }
`

const ExperienceItem = styled.div`
  padding: 0.75rem;
  background-color: ${COLORS.hover.background};
  border-radius: 0.5rem;
  border: 1px solid ${COLORS.border};

  h4 {
    color: ${COLORS.text.primary};
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1.125rem;
  }

  p {
    color: ${COLORS.text.secondary};
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0;
    margin-top: 0.25rem;
  }
`

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const NoExperience = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${COLORS.hover.background};
  border-radius: 0.5rem;
  color: ${COLORS.text.secondary};
  font-size: 0.95rem;
  border: 1px solid ${COLORS.border};
`

const TutorProfilePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  usePageTitle({
    title: !data?.fullname
      ? translations.TUTOR_PROFILE.TITLE
      : [data?.fullname, translations.TUTOR_PROFILE.TITLE]
  });

  useEffect(() => {
    if (!id) {
      router.push(ROUTES.USER_TUTOR_LOBBY.path);
      return;
    }

    GetTutorProfile({
      setIsLoading,
      setData,
      id: id
    });
  }, [id, router]);

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="lobby" />
      <ContentContainer>
        {
          isLoading &&
          <LoadingContainer>
            <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
          </LoadingContainer>
        }

        {
          !isLoading &&
          <ProfileContainer>
            <ProfileHeader>
              <BackButton onClick={() => router.push(ROUTES.USER_TUTOR_LOBBY.path)}>
                <FontAwesomeIcon icon={faChevronLeft} />
                {translations.COMMON.GO_BACK}
              </BackButton>

              <ProfileImage
                source={data.profile_picture}
                alt={data.fullname}
              />
              <HeaderContent>
                <NameSection>
                  <ProfileName>{data.fullname}</ProfileName>
                  {
                    data.linkedInProfile && (
                      <LinkedInLink href={`https://linkedin.com/in/${data.linkedInProfile}`}
                        target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="lg" />
                      </LinkedInLink>
                    )
                  }
                </NameSection>

                <SubHeader>
                  <span>{translations.TUTOR_PROFILE.TUTOR}</span>
                  {data.location && data.location !== LOCATIONS.UNSPECIFIED && (
                    <>
                      <span>•</span>
                      <span>
                        {
                          data.location === LOCATIONS.JAPAN
                            ? 'Japan'
                            : data.location === LOCATIONS.USA
                              ? 'USA'
                              : data.location
                        }
                      </span>
                    </>
                  )}
                </SubHeader>

                <Introductory>{data.introductory}</Introductory>

                <StatsContainer>
                  <StatItem>
                    <span>{translations.TUTOR_PROFILE.TOTAL_LESSONS}</span>
                    <span>{data.totalCompletedLessons}</span>
                  </StatItem>
                  <StatItem>
                    <span>{translations.TUTOR_PROFILE.TOTAL_STUDENTS}</span>
                    <span>{data.totalStudents}</span>
                  </StatItem>
                </StatsContainer>
              </HeaderContent>
            </ProfileHeader>

            <DetailSection>
              <h3>{translations.TUTOR_PROFILE.EXPERIENCE}</h3>
              {
                data.experience?.length > 0 &&
                <ExperienceGrid>
                  {
                    data.experience.map((exp) => (
                      <ExperienceItem key={exp._id}>
                        <h4>{exp.role}</h4>
                        <p>{exp.industry}</p>
                        <p>
                          {moment(exp.startDate).format('MMMM YYYY')}
                          {
                            exp.endDate
                              ? ` - ${moment(exp.endDate).format('MMMM YYYY')}`
                              : ` - ${translations.TUTOR_PROFILE.PRESENT}`
                          }
                        </p>
                      </ExperienceItem>
                    ))
                  }
                </ExperienceGrid>
              }

              {
                data.experience?.length < 1 &&
                <NoExperience>
                  {translations.TUTOR_PROFILE.NO_EXPERIENCE}
                </NoExperience>
              }
            </DetailSection>
          </ProfileContainer>
        }
      </ContentContainer>
    </MainContainer>
  );
};

export default TutorProfilePage;