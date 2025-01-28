'use strict';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Formik, useFormik } from "formik";
import styled from "styled-components";

import { COMMON_CONTEXT } from "@/src/context";
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_VALIDATION } from "@/src/validation";
import { ROLES, REGISTER_TYPES } from "@/src/utils/constants";
import { LOCATION_DROPDOWN_OPTIONS, STUDENT_INITIAL_VALUES, TEACHER_INITIAL_VALUES } from "./values";
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

const PlatformChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #F5F5F5;
  border-radius: 2rem;
  width: fit-content;
  user-select: none;
`

const PlatformLogo = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`

const PlatformText = styled.span`
  font-size: 0.875rem;
  color: ${COLORS.textPrimary};
  font-weight: 500;
`

const GetPlatformIcon = (platform) => {
  switch (platform) {
    case REGISTER_TYPES.GOOGLE:
      return ICON_ASSETS.GOOGLE_ICON;
    case REGISTER_TYPES.LINE:
      return ICON_ASSETS.LINE_ICON;
    case REGISTER_TYPES.LINKED_IN:
      return ICON_ASSETS.LINKEDIN_ICON;
    default:
      return null;
  }
};

const GetPlatformText = (platform) => {
  switch (platform) {
    case REGISTER_TYPES.GOOGLE:
      return 'Google';
    case REGISTER_TYPES.LINE:
      return 'Line';
    case REGISTER_TYPES.LINKED_IN:
      return 'LinkedIn';
    default:
      return '';
  }
};

const PersonalInformation = () => {
  const router = useRouter();

  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser, setCurrentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [initialValues, setInitialValues] = useState(
    currentUser?.account_type === ROLES.TEACHER
      ? TEACHER_INITIAL_VALUES
      : STUDENT_INITIAL_VALUES
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      const base_object = {
        fullname: currentUser.fullname,
        email: currentUser.email,
        profilePhoto: currentUser.profile_picture || '',
      }

      if (currentUser.account_type === ROLES.TEACHER) {
        setInitialValues({
          ...base_object,
          linkedInProfile: currentUser?.linkedInProfile || '',
          location: currentUser?.location || '',
          introductory: currentUser?.introductory || '',
        });
      } else if (currentUser.account_type === ROLES.STUDENT) {
        setInitialValues({ ...base_object });
      }
    }
  }, [currentUser]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: currentUser?.account_type === ROLES.TEACHER
      ? USER_VALIDATION.Profile.TeacherPersonalInformationSchema
      : USER_VALIDATION.Profile.StudentPersonalInformationSchema,
    onSubmit: () => {
      SaveChanges({
        payload: { ...formik.values },
        setIsSubmitting: setIsSubmitting,
        router: router,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <Formik enableReinitialize>
      <form onSubmit={formik.handleSubmit} onKeyDown={handleKeyDown}>
        <DataContainer>
          <div>
            <Heading>{translations.PROFILE.PERSONAL_INFORMATION.TITLE}</Heading>
            <SubHeading>{translations.PROFILE.PERSONAL_INFORMATION.SUB_HEADING}</SubHeading>
          </div>

          {
            currentUser?.register_type !== REGISTER_TYPES.LOCAL &&
            <PlatformChip>
              <PlatformLogo
                src={GetPlatformIcon(currentUser?.register_type)}
                alt="Platform Icon"
              />
              <PlatformText>
                {`Signed in via ${GetPlatformText(currentUser?.register_type)}`}
              </PlatformText>
            </PlatformChip>
          }

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
          {
            currentUser?.account_type === ROLES.TEACHER &&
            <>
              <FlexContainer>
                <USER_COMPONENTS.InputFields.TextInputField
                  type={'text'}
                  label={translations.PROFILE.PERSONAL_INFORMATION.LINKED_IN.LABEL}
                  placeholder={translations.PROFILE.PERSONAL_INFORMATION.LINKED_IN.PLACEHOLDER}
                  inputWrapperStyle={{ width: '100%' }}
                  leftIcon={ICON_ASSETS.USER_OUTLINED_ICON}
                  error={formik.errors.linkedInProfile}
                  name={'linkedInProfile'}
                  value={formik.values.linkedInProfile}
                  onChange={formik.handleChange}
                  showRequiredStar={false}
                />

                <USER_COMPONENTS.InputFields.TextInputField
                  type={'dropdown'}
                  values={LOCATION_DROPDOWN_OPTIONS}
                  label={translations.PROFILE.PERSONAL_INFORMATION.LOCATION.LABEL}
                  placeholder={translations.PROFILE.PERSONAL_INFORMATION.LOCATION.PLACEHOLDER}
                  inputWrapperStyle={{ width: '100%' }}
                  leftIcon={ICON_ASSETS.USER_OUTLINED_ICON}
                  error={formik.errors.location}
                  name={'location'}
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  showRequiredStar={false}
                />
              </FlexContainer>

              <FlexContainer>
                <USER_COMPONENTS.InputFields.TextInputField
                  type={'textarea'}
                  label={translations.PROFILE.PERSONAL_INFORMATION.INTRODUCTORY.LABEL}
                  placeholder={translations.PROFILE.PERSONAL_INFORMATION.INTRODUCTORY.PLACEHOLDER}
                  inputWrapperStyle={{ width: '100%' }}
                  leftIcon={ICON_ASSETS.USER_OUTLINED_ICON}
                  error={formik.errors.introductory}
                  name={'introductory'}
                  value={formik.values.introductory}
                  onChange={formik.handleChange}
                  showRequiredStar={false}
                />
              </FlexContainer>
            </>
          }
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