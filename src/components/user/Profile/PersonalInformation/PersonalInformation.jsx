'use strict';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Formik, useFormik } from "formik";
import styled from "styled-components";

import { COMMON_CONTEXT } from "@/src/context";
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_VALIDATION } from "@/src/validation";
import { INITIAL_VALUES } from "./values";
import { SaveChanges } from "./axios";

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

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  aspect-ratio: 1/1;

  @media (max-width: 768px) {
    width: 3.75rem;
    height: 3.75rem;
  }
`

const ImageButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.375rem;
  }
`

const ImageInfoText = styled.span`
  font-size: 0.8125rem;
  font-weight: 400;
  color: ${COLORS.textSecondary};

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

const HiddenInput = styled.input`
  display: none;
`

const PersonalInformation = () => {
  const router = useRouter();

  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        fullname: currentUser.fullname,
        email: currentUser.email,
        profilePhoto: currentUser.profile_picture || '',
      });
    }
  }, [currentUser]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: USER_VALIDATION.Profile.PersonalInformationSchema,
    onSubmit: () => {
      SaveChanges({
        payload: { ...formik.values },
        setIsSubmitting: setIsSubmitting,
        router: router,
      });
    },
    onReset: () => {
      formik.setValues({ ...initialValues });
    }
  });

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.toLowerCase();
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      COMMON_COMPONENTS.Toast.showErrorToast(translations.PROFILE.PERSONAL_INFORMATION.ERRORS.FILE_TYPE);
      return;
    }

    if (file.size > 1048576) {
      COMMON_COMPONENTS.Toast.showErrorToast(translations.PROFILE.PERSONAL_INFORMATION.ERRORS.FILE_SIZE);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result;
      formik.setFieldValue('profilePhoto', base64String);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Formik enableReinitialize>
      <form onSubmit={formik.handleSubmit}>
        <DataContainer>
          <div>
            <Heading>{translations.PROFILE.PERSONAL_INFORMATION.TITLE}</Heading>
            <SubHeading>{translations.PROFILE.PERSONAL_INFORMATION.SUB_HEADING}</SubHeading>
          </div>

          <ImageUploadContainer>
            <ProfileImage
              alt={'Profile Image'}
              src={formik.values.profilePhoto || ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON} />
            <ImageButtonContainer>
              <ImageInfoText>
                {translations.PROFILE.PERSONAL_INFORMATION.UPLOAD_IMAGE.INFO}
              </ImageInfoText>
              <HiddenInput
                type="file"
                ref={fileInputRef}
                accept=".jpg,.png"
                onChange={handleFileChange}
              />
              <USER_COMPONENTS.OutlinedButton
                text={translations.PROFILE.PERSONAL_INFORMATION.UPLOAD_IMAGE.TEXT}
                onClick={handleUploadImage}
                style={{ maxWidth: 'fit-content' }}
                disabled={isSubmitting}
                type={'button'}
              />
            </ImageButtonContainer>
          </ImageUploadContainer>

          <FlexContainer>
            <USER_COMPONENTS.InputFields.TextInputField
              type={'text'}
              label={translations.PROFILE.PERSONAL_INFORMATION.FULL_NAME.LABEL}
              placeholder={translations.PROFILE.PERSONAL_INFORMATION.FULL_NAME.PLACEHOLDER}
              inputWrapperStyle={{ width: '100%' }}
              leftIcon={ICON_ASSETS.USER_OUTLINED_ICON}
              error={formik.errors.fullname}
              name={'fullname'}
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
            <USER_COMPONENTS.InputFields.TextInputField
              type={'email'}
              label={translations.PROFILE.PERSONAL_INFORMATION.EMAIL.LABEL}
              placeholder={translations.PROFILE.PERSONAL_INFORMATION.EMAIL.PLACEHOLDER}
              inputWrapperStyle={{ width: '100%' }}
              leftIcon={ICON_ASSETS.SMS_OUTLINED_ICON}
              disabled={isSubmitting}
              error={formik.errors.email}
              name={'email'}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FlexContainer>
        </DataContainer>
        <ActionsContainer>
          <USER_COMPONENTS.OutlinedButton
            text={translations.PROFILE.PERSONAL_INFORMATION.RESET}
            style={{ background: 'transparent', fontSize: '1rem' }}
            disabled={isSubmitting}
            onClick={formik.handleReset}
          />
          <USER_COMPONENTS.Button
            text={translations.PROFILE.PERSONAL_INFORMATION.SAVE_CHANGES}
            type={'submit'}
            disabled={isSubmitting}
          />
        </ActionsContainer>
      </form>
    </Formik>
  )
}

export default PersonalInformation;