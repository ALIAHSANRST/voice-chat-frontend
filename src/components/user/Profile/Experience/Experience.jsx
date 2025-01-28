'use strict';

import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { COMMON_CONTEXT } from "@/src/context";
import { USER_COMPONENTS } from "@/src/components";
import { USER_VALIDATION } from "@/src/validation";
import { ICON_ASSETS } from "@/src/utils/assets";
import { ROLES } from "@/src/utils/constants";
import { EMPTY_EXPERIENCE, INITIAL_VALUES } from "./values";
import { SaveChanges } from "./axios";

const COLORS = {
  background: '#FFFFFF',
  border: '#DADEE3',
  textPrimary: '#1A1A1A',
  textSecondary: '#858C94',
  hover: '#F5F5F5',
  error: '#DC3545',
  success: '#28A745',
  active: '#0064FF',
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  font-family: 'Montserrat';

  @media (max-width: 768px) {
    gap: 1.25rem;
    padding: 1.25rem;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    gap: 1.25rem;
    padding: 1.25rem 0;
  }
`

const Heading = styled.h2`
  font-size: 1.1875rem;
  font-weight: 600;
  color: ${COLORS.textPrimary};
  margin-bottom: 0.675rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
`

const SubHeading = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${COLORS.textSecondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ExperienceCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  span {
    color: ${COLORS.textSecondary};
    font-size: 0.875rem;
  }
`

const ExperienceEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  border: 1px solid ${COLORS.border};
  border-radius: 0.75rem;
  position: relative;
  background: ${COLORS.background};
  transition: all 0.2s ease;

  &:before {
    content: 'Experience # ${props => props.index + 1}';
    position: absolute;
    top: -0.75rem;
    left: 1rem;
    background: ${COLORS.background};
    padding: 0 0.5rem;
    color: ${COLORS.textSecondary};
    font-size: 0.875rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`

const RemoveButton = styled.button`
  position: absolute;
  top: -0.75rem;
  right: 0.75rem;
  background: ${COLORS.background};
  border: 1.5px solid ${COLORS.border};
  cursor: pointer;
  color: ${COLORS.textSecondary};
  font-size: 1rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2; 

  &:hover {
    color: ${COLORS.error};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  i {
    font-size: 0.875rem;
    font-weight: bold;
  }
`

const Experience = () => {
  const AddExperienceButton = styled(USER_COMPONENTS.Button)`
    background: transparent;
    border: 2px dashed ${COLORS.border};
    color: ${COLORS.textSecondary};
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${COLORS.hover};
      border-color: ${COLORS.textSecondary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `

  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser, setCurrentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.account_type === ROLES.TEACHER) {
        setInitialValues({ experience: currentUser?.experience || [] });
      }
    }
  }, [currentUser]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: USER_VALIDATION.Profile.ExperienceSchema,
    onSubmit: (values) => {
      SaveChanges({
        payload: values,
        setIsSubmitting,
        currentUser,
        setCurrentUser,
      });
    },
    onReset: () => {
      formik.setValues({ ...initialValues });
    },
  });

  const addExperience = () => {
    if (formik.values.experience?.length >= 10) return;
    formik.setFieldValue('experience', [...formik.values.experience, EMPTY_EXPERIENCE]);
  };

  const removeExperience = (index) => {
    const newExperience = formik.values.experience?.filter((_, i) => i !== index);
    formik.setFieldValue('experience', newExperience);
  };

  return (
    <Formik enableReinitialize>
      <form onSubmit={formik.handleSubmit}>
        <DataContainer>
          <div>
            <Heading>{translations.PROFILE.EXPERIENCE.TITLE}</Heading>
            <SubHeading>{translations.PROFILE.EXPERIENCE.SUB_HEADING}</SubHeading>
          </div>

          <ExperienceContainer>
            <ExperienceCounter>
              <span>
                {translations.PROFILE.EXPERIENCE.COUNTER.replace(
                  '{current}',
                  formik.values.experience?.length
                )}
              </span>
            </ExperienceCounter>

            {formik.values.experience?.map((exp, index) => (
              <ExperienceEntry key={index} index={index}>
                <RemoveButton
                  type="button"
                  onClick={() => removeExperience(index)}
                  disabled={isSubmitting}
                  title={translations.PROFILE.EXPERIENCE.REMOVE_TOOLTIP}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </RemoveButton>
                <FlexContainer>
                  <USER_COMPONENTS.InputFields.TextInputField
                    type="text"
                    label={translations.PROFILE.EXPERIENCE.INDUSTRY.LABEL}
                    placeholder={translations.PROFILE.EXPERIENCE.INDUSTRY.PLACEHOLDER}
                    name={`experience.${index}.industry`}
                    inputWrapperStyle={{ width: '100%' }}
                    value={exp.industry}
                    onChange={formik.handleChange}
                    error={formik.errors.experience?.[index]?.industry}
                    leftIcon={ICON_ASSETS.BUILDING_ICON}
                  />
                  <USER_COMPONENTS.InputFields.TextInputField
                    type="text"
                    label={translations.PROFILE.EXPERIENCE.ROLE.LABEL}
                    placeholder={translations.PROFILE.EXPERIENCE.ROLE.PLACEHOLDER}
                    name={`experience.${index}.role`}
                    inputWrapperStyle={{ width: '100%' }}
                    value={exp.role}
                    onChange={formik.handleChange}
                    error={formik.errors.experience?.[index]?.role}
                    leftIcon={ICON_ASSETS.BRIEFCASE_ICON}
                  />
                </FlexContainer>
                <FlexContainer>
                  <USER_COMPONENTS.InputFields.TextInputField
                    type="date"
                    label={translations.PROFILE.EXPERIENCE.START_DATE.LABEL}
                    placeholder={translations.PROFILE.EXPERIENCE.START_DATE.PLACEHOLDER}
                    name={`experience.${index}.startDate`}
                    inputWrapperStyle={{ width: '100%' }}
                    value={exp.startDate}
                    onChange={formik.handleChange}
                    error={formik.errors.experience?.[index]?.startDate}
                    leftIcon={ICON_ASSETS.CALENDAR_ICON}
                  />
                  <USER_COMPONENTS.InputFields.TextInputField
                    type="date"
                    label={translations.PROFILE.EXPERIENCE.END_DATE.LABEL}
                    placeholder={translations.PROFILE.EXPERIENCE.END_DATE.PLACEHOLDER}
                    name={`experience.${index}.endDate`}
                    inputWrapperStyle={{ width: '100%' }}
                    value={exp.endDate}
                    onChange={formik.handleChange}
                    error={formik.errors.experience?.[index]?.endDate}
                    leftIcon={ICON_ASSETS.CALENDAR_ICON}
                    showRequiredStar={false}
                  />
                </FlexContainer>
              </ExperienceEntry>
            ))}

            <AddExperienceButton
              text={`${translations.PROFILE.EXPERIENCE.ADD_BUTTON} ${formik.values.experience?.length >= 10
                ? translations.PROFILE.EXPERIENCE.MAX_LIMIT
                : ''
                }`}
              type="button"
              onClick={addExperience}
              disabled={isSubmitting || formik.values.experience?.length >= 10}
              icon={ICON_ASSETS.PLUS_ICON}
            />
          </ExperienceContainer>
        </DataContainer>

        <ActionsContainer>
          <USER_COMPONENTS.OutlinedButton
            text={translations.PROFILE.EXPERIENCE.ACTIONS.RESET}
            style={{ background: 'transparent', fontSize: '1rem' }}
            disabled={isSubmitting}
            onClick={formik.handleReset}
          />
          <USER_COMPONENTS.Button
            text={translations.PROFILE.EXPERIENCE.ACTIONS.SAVE}
            type="submit"
            disabled={isSubmitting}
          />
        </ActionsContainer>
      </form>
    </Formik>
  );
};

export default Experience;