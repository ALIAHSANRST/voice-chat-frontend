"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from 'styled-components';
import moment from 'moment';

import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COLORS } from "@/src/utils/colors";
import { ROUTES } from "@/src/utils/routes";
import { COMMON_CONTEXT } from "@/src/context";
import { COMMON_COMPONENTS } from "@/src/components";
import { FetchAllUpcomingClasses } from "./axios";
import { ROLES } from "@/src/utils/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Montserrat';

  @media (max-width: 768px) {
    gap: 0.675rem;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`

const Heading = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${USER_COLORS.CardLists.Text.Heading};

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const ViewAllLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${USER_COLORS.CardLists.Text.Link};
  text-decoration: none;
`

const ListContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1rem;
  background-color: ${USER_COLORS.CardLists.Background};
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: 0.75rem;
  }
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const ProfileImage = styled(COMMON_COMPONENTS.ImageLoader)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.25rem;
  object-fit: cover;
  aspect-ratio: 1/1;

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 768px) {
    gap: 0.1rem;
  }
`

const Title = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${USER_COLORS.CardLists.Text.Primary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Time = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${USER_COLORS.CardLists.Text.Secondary};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const ViewIcon = styled(Link)`
  margin-left: auto;
  
  img {
    width: 1.325rem;
    height: 1.325rem;
    cursor: pointer;

    @media (max-width: 768px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`

const Divider = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid ${USER_COLORS.CardLists.Border};

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`

const NoDataText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  color: ${USER_COLORS.CardLists.Text.Secondary};
`

const FormatTime = ({ day, date, time }) => {
  const currentDate = moment();
  const classDate = moment(date);

  const isToday = currentDate.isSame(classDate, 'day');
  const isTomorrow = currentDate.add(1, 'day').isSame(classDate, 'day');

  const formattedTime = moment(time, 'HH:mm').format('h:mm A');

  if (isToday) {
    return `Today, ${formattedTime}`;
  } else if (isTomorrow) {
    return `Tomorrow, ${formattedTime}`;
  } else {
    return `${classDate.format('MMM D, YYYY')}, ${formattedTime}`;
  }
}

export const UpcomingClassCard = ({ item, translations, role, pastMode }) => {
  return (
    <ItemContainer>
      <ProfileImage source={
        role === ROLES.TEACHER
          ? item.student.profile_picture
          : item.teacher.profile_picture
      } alt={item.title} />
      <TextContainer>
        <Title>{item.title}</Title>
        <Time>{FormatTime(item.scheduledFor)}</Time>
      </TextContainer>
      <ViewIcon
        target="_blank"
        href={
          role === ROLES.TEACHER
            ? pastMode
              ? ROUTES.TEACHER_COMPLETED_CLASSES.path + `/${item._id}`
              : ROUTES.TEACHER_UPCOMING_CLASSES.path + `/${item._id}`
            : pastMode
              ? ROUTES.TEACHER_COMPLETED_CLASSES.path + `/${item._id}`
              : ROUTES.USER_UPCOMING_CLASSES.path + `/${item._id}`
        } passHref>
        <img src={ICON_ASSETS.VIEW_LINK_ICON} alt="View Link" title={translations.COMMON.VIEW_DETAILS} />
      </ViewIcon>
    </ItemContainer>
  );
};

const UpcomingClasses = ({ showViewAll = true, limit = 10, pastMode = false }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [data, setData] = useState({ records: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      FetchAllUpcomingClasses({
        limit: limit,
        page: 1,
        query: null,
        setIsLoading: setIsLoading,
        setData: setData,
        pastMode: pastMode
      });
    }

    fetchData();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Heading>{
          pastMode
            ? translations.CARD_LISTS.UPCOMING_CLASSES.PAST_MODE.TITLE
            : translations.CARD_LISTS.UPCOMING_CLASSES.TITLE
        }</Heading>
        {
          showViewAll && !isLoading &&
          <ViewAllLink href={
            currentUser.account_type === ROLES.STUDENT
              ? (pastMode ? ROUTES.USER_COMPLETED_CLASSES.path : ROUTES.USER_UPCOMING_CLASSES.path)
              : (pastMode ? ROUTES.TEACHER_COMPLETED_CLASSES.path : ROUTES.TEACHER_UPCOMING_CLASSES.path)
          }>
            {translations.CARD_LISTS.UPCOMING_CLASSES.VIEW_ALL}
          </ViewAllLink>
        }
      </HeaderContainer>

      {
        isLoading &&
        <ListContainer>
          <COMMON_COMPONENTS.Loader message={null} wrapped />
        </ListContainer>
      }

      {
        data && data.records.length === 0 && !isLoading &&
        <ListContainer>
          <NoDataText>
            {translations.CARD_LISTS.UPCOMING_CLASSES.NO_CLASSES}
          </NoDataText>
        </ListContainer>
      }

      {
        data && data.records.length > 0 && !isLoading &&
        <ListContainer>
          {
            data.records.map((item, index) => (
              <div key={`${item._id}`}>
                <UpcomingClassCard
                  key={item._id}
                  item={item}
                  translations={translations}
                  role={currentUser.account_type}
                  pastMode={pastMode}
                />
                {
                  index !== data.records.length - 1 && <Divider />
                }
              </div>
            ))
          }
        </ListContainer>
      }
    </Container>
  )
}

export default UpcomingClasses;