import Link from "next/link";
import styled from 'styled-components';

import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COLORS } from "@/src/utils/colors";
import { FormatCardListTime } from "@/src/utils/helpers";
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

const ViewIcon = styled.img`
  width: 1.325rem;
  height: 1.325rem;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`

const Divider = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid ${USER_COLORS.CardLists.Border};

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`

const UpcomingClasses = ({ data, showViewAll = true }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  return (
    <Container>
      <HeaderContainer>
        <Heading>{translations.CARD_LISTS.UPCOMING_CLASSES.TITLE}</Heading>
        {
          showViewAll &&
          <ViewAllLink href={ROUTES.TEACHER_UPCOMING_CLASSES.path}>
            {translations.CARD_LISTS.UPCOMING_CLASSES.VIEW_ALL}
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
                    <Title>{item.title}</Title>
                    <Time>{FormatCardListTime(item.from, item.to)}</Time>
                  </TextContainer>
                  <ViewIcon src={ICON_ASSETS.VIEW_LINK_ICON} alt="View Link" />
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

export default UpcomingClasses;