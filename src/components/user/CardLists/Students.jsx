import Link from "next/link";
import styled from 'styled-components';

import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COLORS } from "@/src/utils/colors";
import { ROUTES } from "@/src/utils/routes";
import { COMMON_CONTEXT } from "@/src/context";

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

  @media (max-width: 768px) {
    gap: 0.1rem;
  }
`

const Name = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${USER_COLORS.CardLists.Text.Primary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Title = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${USER_COLORS.CardLists.Text.Secondary};

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

const Students = ({ data, showViewAll = true }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  return (
    <Container>
      <HeaderContainer>
        <Heading>{translations.CARD_LISTS.STUDENTS.TITLE}</Heading>
        {
          showViewAll &&
          <ViewAllLink href={ROUTES.TEACHER_STUDENTS.path}>
            {translations.CARD_LISTS.STUDENTS.VIEW_ALL}
          </ViewAllLink>
        }
      </HeaderContainer>

      <ListContainer>
        {
          data.map((item, index) => {
            return (
              <div key={`${item.title}-${item.from}`}>
                <ItemContainer>
                  <ProfileImage src={item.photoURL} alt={item.title} />
                  <TextContainer>
                    <Name>{item.name}</Name>
                    <Title>{item.title}</Title>
                  </TextContainer>
                  <MessageIcon src={ICON_ASSETS.MESSAGE_LINK_ICON} alt="Message Link" />
                </ItemContainer>
                {
                  index !== data.length - 1 && <Divider />
                }
              </div>
            )
          })
        }
      </ListContainer>
    </Container>
  )
}

export default Students;