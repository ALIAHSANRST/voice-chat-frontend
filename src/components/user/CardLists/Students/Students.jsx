'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import styled from 'styled-components';

import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COLORS } from "@/src/utils/colors";
import { ROUTES } from "@/src/utils/routes";
import { COMMON_CONTEXT } from "@/src/context";
import { COMMON_COMPONENTS } from "@/src/components";
import { ImageLoader } from "@/src/utils/api";
import { FetchAllStudents } from "./axios";

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
  width: 100%;

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
  width: 100%;
`

const ProfileImage = styled.img`
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
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 0.1rem;
  }
`

const Name = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${USER_COLORS.CardLists.Text.Primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Title = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${USER_COLORS.CardLists.Text.Secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const MessageIcon = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
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

const Students = ({ showViewAll = true, limit = 10 }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  const [data, setData] = useState({ records: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      FetchAllStudents({
        limit: limit,
        page: 1,
        query: null,
        setIsLoading: setIsLoading,
        setData: setData
      });
    }

    fetchData();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Heading>{translations.CARD_LISTS.STUDENTS.TITLE}</Heading>
        {
          showViewAll && !isLoading &&
          <ViewAllLink href={ROUTES.TEACHER_STUDENTS.path}>
            {translations.CARD_LISTS.STUDENTS.VIEW_ALL}
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
            {translations.CARD_LISTS.STUDENTS.NO_STUDENTS}
          </NoDataText>
        </ListContainer>
      }

      {
        data && data.records.length > 0 && !isLoading &&
        <ListContainer>
          {
            data.records.map((item, index) => {
              return (
                <div key={`${item._id}`}>
                  <ItemContainer>
                    <ProfileImage src={ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON} alt={item.fullname} />
                    <TextContainer>
                      <Name title={item.fullname}>
                        {item.fullname}
                      </Name>
                      <Title title={item.email || translations.CARD_LISTS.STUDENTS.UNKNOWN_EMAIL}>
                        {item.email || translations.CARD_LISTS.STUDENTS.UNKNOWN_EMAIL}
                      </Title>
                    </TextContainer>
                    <Link href={`${ROUTES.TEACHER_MESSAGES.path}?id=${item._id}`}>
                      <MessageIcon src={ICON_ASSETS.MESSAGE_LINK_ICON} alt="Message Link" />
                    </Link>
                  </ItemContainer>
                  {
                    index !== data.records.length - 1 && <Divider />
                  }
                </div>
              )
            })
          }
        </ListContainer>
      }
    </Container>
  )
}

export default Students;