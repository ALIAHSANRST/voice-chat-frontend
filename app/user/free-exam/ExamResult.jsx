'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { GetSuggestion } from "./ExamResultSuggestions";
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COMPONENTS } from "@/src/components";
import { ROUTES } from "@/src/utils/routes";

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
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
`

const SubHeadingText = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;
`

const ResultContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 67.25rem;
  gap: 1.5rem;
  flex-direction: column;
`

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  border-radius: 1rem;
`

const ScoreTextContainer = styled.div`
  text-align: center;
`

const ScoreText = styled.p`
  font-family: Montserrat;
  font-size: 2rem;
  font-weight: 600;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;
`

const ScoreDescription = styled.p`
  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;
`

const FeedbackContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: stretch;
`

const FeedbackBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  border-radius: 1rem;
  flex: 1;
`

const FeedbackTitle = styled.p`
  font-family: Montserrat;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${USER_COLORS.FreeExam.Text.Primary};
  margin: 0;
`

const FeedbackText = styled.p`
  font-family: Montserrat;
  font-size: 1.125rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
`

const ExamResult = ({ data }) => {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const score = Math.round((data?.finalScore / data?.totalMarks) * 100)
    const description = data?.rubrics?.find(rubric =>
      score <= rubric.upper_percentage && score >= rubric.lower_percentage
    )?.level_description || 'No Feedback Available!';
    const suggestion = GetSuggestion(score);

    setResult({
      score,
      description,
      suggestion
    });
  }, []);

  return (
    <ResultWrapper>
      <HeadingContainer>
        <HeadingText>Congratulations on Completing Your Exam!</HeadingText>
        <SubHeadingText>Take a moment to review your performance and feedback.</SubHeadingText>
      </HeadingContainer>
      <HeadingText>Here's how you performed based on your reading.</HeadingText>
      <ResultContainer>
        <ScoreContainer>
          <img src={ICON_ASSETS.EXAM_RESULT_ICON} alt="exam-result-icon" />
          <ScoreTextContainer>
            <ScoreText>
              {result?.score || 0}%
            </ScoreText>
            <ScoreDescription>The score is determined by your pronunciation, clarity, and fluency!</ScoreDescription>
          </ScoreTextContainer>
        </ScoreContainer>
        <FeedbackContainer>
          <FeedbackBox>
            <FeedbackTitle>Detailed Feedback</FeedbackTitle>
            <FeedbackText>
              {result?.description || 'No Feedback Available!'}
            </FeedbackText>
          </FeedbackBox>
          <FeedbackBox>
            <FeedbackTitle>Suggestions</FeedbackTitle>
            <FeedbackText>
              {result?.suggestion || 'No Suggestion Available!'}
            </FeedbackText>
          </FeedbackBox>
        </FeedbackContainer>
      </ResultContainer>
      <ButtonContainer>
        <USER_COMPONENTS.OutlinedButton
          text={'Give Feedback'}
          style={{ fontSize: '1rem', width: '100%', maxWidth: '12.5rem' }}
          onClick={() => router.push(ROUTES.USER_GIVE_FEEDBACK.path)}
        />
        <USER_COMPONENTS.Button
          text={'Return to Home'}
          style={{ fontSize: '1rem', width: '100%', maxWidth: '12.5rem' }}
          onClick={() => router.push(ROUTES.USER_HOME.path)}
        />
      </ButtonContainer>
    </ResultWrapper>
  )
}

export default ExamResult;