import { LOCATIONS } from "@/src/utils/constants";

const INITIAL_VALUES_BASE = {
  fullname: '',
  email: '',
  profilePhoto: '',
}

const STUDENT_INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE,
}

const TEACHER_INITIAL_VALUES = {
  ...INITIAL_VALUES_BASE,
  linkedInProfile: '',
  location: { value: LOCATIONS.UNSPECIFIED, label: 'Unspecified' },
  introductory: '',
}

const LOCATION_DROPDOWN_OPTIONS = [
  { value: LOCATIONS.USA, label: 'United States' },
  { value: LOCATIONS.JAPAN, label: 'Japan' },
  { value: LOCATIONS.UNSPECIFIED, label: 'Unspecified' },
];

export {
  STUDENT_INITIAL_VALUES,
  TEACHER_INITIAL_VALUES,
  LOCATION_DROPDOWN_OPTIONS,
};