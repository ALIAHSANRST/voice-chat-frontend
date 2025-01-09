'use strict';

import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, useFormik } from "formik";
import styled from "styled-components";

import { COMMON_CONTEXT } from "@/src/context";
import { USER_COMPONENTS } from "@/src/components";
import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_VALIDATION } from "@/src/validation";
import { INITIAL_VALUES } from "./values";
import { SaveChanges } from "./axios";
import InfoAlert from "../InfoAlert";

const COLORS = {
  background: '#FFFFFF',
  border: '#DADEE3',
  textPrimary: '#1A1A1A',
  textSecondary: '#858C94'
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

const ChangePassword = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: USER_VALIDATION.Profile.ChangePasswordSchema,
    onSubmit: () => {
      SaveChanges({
        payload: formik.values,
        setIsSubmitting: setIsSubmitting,
      });
    },
    onReset: () => {
      formik.setValues({ ...INITIAL_VALUES });
    }
  });

  return (
    <Formik enableReinitialize>
      <form onSubmit={formik.handleSubmit}>
        <DataContainer>
          {
            currentUser?.register_type !== 'local' &&
            <USER_COMPONENTS.Profile.InfoAlert text={translations.PROFILE.CHANGE_PASSWORD.INFO_ALERT} />
          }
          <div>
            <Heading>{translations.PROFILE.CHANGE_PASSWORD.TITLE}</Heading>
            <SubHeading>{translations.PROFILE.CHANGE_PASSWORD.SUB_HEADING}</SubHeading>
          </div>
          <FlexContainer>
            <USER_COMPONENTS.InputFields.TextInputField
              type={showCurrentPassword ? 'text' : 'password'}
              label={translations.PROFILE.CHANGE_PASSWORD.CURRENT_PASSWORD.LABEL}
              placeholder={translations.PROFILE.CHANGE_PASSWORD.CURRENT_PASSWORD.PLACEHOLDER}
              inputWrapperStyle={{ width: '100%' }}
              leftIcon={ICON_ASSETS.LOCK_OUTLINED_ICON}
              rightIcon={
                currentUser?.register_type === 'local' &&
                <FontAwesomeIcon
                  style={{ cursor: 'pointer', opacity: 0.8, color: COLORS.neutral_black }}
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              }
              disabled={isSubmitting || currentUser?.register_type !== 'local'}
              error={formik.errors.currentPassword}
              name={'currentPassword'}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
            />
            <USER_COMPONENTS.InputFields.TextInputField
              type={showNewPassword ? 'text' : 'password'}
              label={translations.PROFILE.CHANGE_PASSWORD.NEW_PASSWORD.LABEL}
              placeholder={translations.PROFILE.CHANGE_PASSWORD.NEW_PASSWORD.PLACEHOLDER}
              inputWrapperStyle={{ width: '100%' }}
              leftIcon={ICON_ASSETS.LOCK_OUTLINED_ICON}
              rightIcon={
                currentUser?.register_type === 'local' && <FontAwesomeIcon
                  style={{ cursor: 'pointer', opacity: 0.8, color: COLORS.neutral_black }}
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                />
              }
              disabled={isSubmitting || currentUser?.register_type !== 'local'}
              error={formik.errors.newPassword}
              name={'newPassword'}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
          </FlexContainer>
        </DataContainer>
        <ActionsContainer>
          <USER_COMPONENTS.OutlinedButton
            text={translations.PROFILE.CHANGE_PASSWORD.RESET}
            style={{ background: 'transparent', fontSize: '1rem' }}
            disabled={isSubmitting || currentUser?.register_type !== 'local'}
            onClick={formik.handleReset}
          />
          <USER_COMPONENTS.Button
            text={translations.PROFILE.CHANGE_PASSWORD.SAVE_CHANGES}
            type={'submit'}
            disabled={isSubmitting || currentUser?.register_type !== 'local'}
          />
        </ActionsContainer>
      </form>
    </Formik>
  )
}

export default ChangePassword;