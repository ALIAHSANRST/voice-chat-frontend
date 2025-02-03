'use client';

export const ADMIN_COMPONENTS = {
  ContentWrapper: require('./admin/ContentWrapper').default,
  DataTable: {
    Table: require('./admin/DataTable/DataTable').default,
    Header: require('./admin/DataTable/Header').default,
    RowActions: {
      Main: require('./admin/DataTable/RowActions').default,
      ...require('./admin/DataTable/RowActions'),
    },
  },
  SubModuleCard: require('./admin/SubModuleCard').default,
  SomethingWentWrong: require('./admin/SomethingWentWrong').default,
  FormActionsFooter: require('./admin/FormActionsFooter').default,
  FormMetaInfo: require('./admin/FormMetaInfo').default,
};

export const COMMON_COMPONENTS = {
  Auth: {
    SideCard: require('./common/auth/SideCard').default,
    FormCard: require('./common/auth/FormCard').default,
    InputField: require('./common/auth/InputField').default,
    UserModeToggle: require('./common/auth/UserModeToggle').default,
    Button: require('./common/auth/Button').default,
    SocialMedia: require('./common/auth/SocialMedia').default,
    OrSeperator: require('./common/auth/OrSeperator').default,
    AlternativeFlow: require('./common/auth/AlternativeFlow').default,
    GoBack: require('./common/auth/GoBack').default,
  },
  Loader: require('./common/Loader').default,
  LoaderFullScreen: require('./common/LoaderFullScreen').default,
  TextField: require('./common/TextField').default,
  Toast: require('./common/Toast'),
  AlertDialogue: require('./common/AlertDialogue').default,
  LanguageSelect: require('./common/LanguageSelect').default,
  ImageLoader: require('./common/ImageLoader').default,
};

export const USER_COMPONENTS = {
  HeaderNavBar: require('./user/NavBar/HeaderNavBar').default,
  OutlinedButton: require('./user/OutlinedButton').default,
  Stepper: require('./user/Stepper').default,
  Button: require('./common/auth/Button').default,
  CircularProgressWithLabel: require('./user/CircularProgressWithLabel').default,
  Modal: {
    Main: require('./user/Modal/Modal').default,
    CheckBox: require('./user/Modal/CheckBox').default,
    DotList: require('./user/Modal/DotList').default,
  },
  Calendar: require('./user/Calendar/Calendar').default,
  CardLists: {
    Students: require('./user/CardLists/Students/Students').default,
    StudentCard: require('./user/CardLists/Students/Students').StudentCard,
    Teachers: require('./user/CardLists/Teachers/Teachers').default,
    TeacherCard: require('./user/CardLists/Teachers/Teachers').TeacherCard,
    UpcomingClasses: require('./user/CardLists/UpcomingClasses/UpcomingClasses').default,
    UpcomingClassCard: require('./user/CardLists/UpcomingClasses/UpcomingClasses').UpcomingClassCard,
  },
  AudioVisualizer: {
    Bar: require('./user/AudioVisualizer/BarAudioVisualizer').default,
    Circular: require('./user/AudioVisualizer/CircularAudioVisualizer').default,
  },
  InputFields: {
    SearchField: require('./user/InputFields/SearchField').default,
    TextInputField: require('./user/InputFields/TextInputField').default,
  },
  Profile: {
    SideBar: require('./user/Profile/Sidebar').default,
    InfoAlert: require('./user/Profile/InfoAlert').default,
    PersonalInformation: require('./user/Profile/PersonalInformation/PersonalInformation').default,
    ChangePassword: require('./user/Profile/ChangePassword/ChangePassword').default,
    Experience: require('./user/Profile/Experience/Experience').default,
  },
  Message: {
    Main: require('./user/Message/Message').default,
  },
  DaySlots: require('./user/DaySlots/DaySlots').default,
  UpcomingClasses: {
    Main: require('./user/UpcomingClasses/UpcomingClasses').default,
    ViewDetails: require('./user/UpcomingClasses/ViewDetails/ViewDetails').default,
  },
};