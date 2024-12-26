'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { GetSuggestion } from "./ExamResultSuggestions";
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COMPONENTS } from "@/src/components";
import { ROUTES } from "@/src/utils/routes";
import { COMMON_CONTEXT } from "@/src/context";

import FeedbackModal from "./Feedback.modal"

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`

const HeadingText = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const SubHeadingText = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.925rem;
  }
`

const ScoreHeadingText = styled.h2`
  font-size: 1.625rem;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const ResultContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 67.25rem;
  gap: 1.5rem;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 0.75rem;
    max-width: 100%;
  }
`

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  border-radius: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem 1rem; 
    gap: 1.25rem;
  }
`

const ScoreTextContainer = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ScoreText = styled.p`
  font-family: Montserrat;
  font-size: 2rem;
  font-weight: 600;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const ScoreDescription = styled.p`
  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const FeedbackContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: stretch;

  @media (max-width: 768px) {
    gap: 0.75rem;
    flex-direction: column;
  }
`

const FeedbackBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  border-radius: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const FeedbackTitle = styled.p`
  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const FeedbackText = styled.p`
  font-family: Montserrat;
  font-size: 1.125rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.75rem;
    flex-direction: column;
    
    button {
      max-width: 100% !important;
    }
  }
`

const ExamResult = ({ data }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const router = useRouter();
  const [result, setResult] = useState(null);

  const [showFeedbackModal, setShowFeedbackModal] = useState(true);

  useEffect(() => {
    const score = Math.round((data?.finalScore / data?.totalMarks) * 100)
    const description = data?.rubrics?.find(rubric =>
      score <= rubric.upper_percentage && score >= rubric.lower_percentage
    )?.level_description || translations.FREE_EXAM.RESULT.NO_FEEDBACK;
    const suggestion = GetSuggestion(score);

    setResult({
      score,
      description,
      suggestion
    });
  }, []);

  return (
    <ResultWrapper>

      {
        showFeedbackModal && (
          <USER_COMPONENTS.Modal.Main modalContainerStyle={{ maxWidth: '37.5rem', width: '100%' }}
            title={translations.GIVE_FEEDBACK.HEADING} subtitle={translations.GIVE_FEEDBACK.DESCRIPTION}>
            <FeedbackModal setShowFeedbackModal={setShowFeedbackModal} />
          </USER_COMPONENTS.Modal.Main>
        )
      }

      <HeadingContainer>
        <HeadingText>{translations.FREE_EXAM.RESULT.TEXT_1}</HeadingText>
        <SubHeadingText>{translations.FREE_EXAM.RESULT.TEXT_2}</SubHeadingText>
      </HeadingContainer>
      <ScoreHeadingText>{translations.FREE_EXAM.RESULT.TEXT_3}</ScoreHeadingText>
      <ResultContainer>
        <ScoreContainer>
          <img src={ICON_ASSETS.EXAM_RESULT_ICON} alt="exam-result-icon" />
          <ScoreTextContainer>
            <ScoreText>
              {result?.score || 0}%
            </ScoreText>
            <ScoreDescription>{translations.FREE_EXAM.RESULT.TEXT_4}</ScoreDescription>
          </ScoreTextContainer>
        </ScoreContainer>
        <FeedbackContainer>
          <FeedbackBox>
            <FeedbackTitle>{translations.FREE_EXAM.RESULT.TEXT_5}</FeedbackTitle>
            <FeedbackText>
              {result?.description || translations.FREE_EXAM.RESULT.NO_FEEDBACK}
            </FeedbackText>
          </FeedbackBox>
          <FeedbackBox>
            <FeedbackTitle>{translations.FREE_EXAM.RESULT.TEXT_6}</FeedbackTitle>
            <FeedbackText>
              {result?.suggestion || translations.FREE_EXAM.RESULT.NO_SUGGESTION}
            </FeedbackText>
          </FeedbackBox>
        </FeedbackContainer>
      </ResultContainer>
      <ButtonContainer>
        <USER_COMPONENTS.OutlinedButton
          text={translations.FREE_EXAM.RESULT.TEXT_7}
          style={{ fontSize: '1rem', width: '100%', maxWidth: '12.5rem' }}
          onClick={() => router.push(ROUTES.USER_EXAM_HISTORY.path)}
        />
        <USER_COMPONENTS.Button
          text={translations.FREE_EXAM.RESULT.TEXT_8}
          style={{ fontSize: '1rem', width: '100%', maxWidth: '12.5rem' }}
          onClick={() => router.push(ROUTES.USER_HOME.path)}
        />
      </ButtonContainer>
    </ResultWrapper>
  )
}

export default ExamResult;