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
  Loader: require('./common/Loader').default,
  LoaderFullScreen: require('./common/LoaderFullScreen').default,
  TextField: require('./common/TextField').default,
  Toast: require('./common/Toast'),
  AlertDialogue: require('./common/AlertDialogue').default,
};

export const USER_COMPONENTS = {
  CallButton: require('./user/CallButton').default,
  MuteButton: require('./user/MuteButton').default,
  VideoControls: require('./user/VideoControls').default,
  VoiceChat: require('./user/VoiceChat').default,
  VoiceToText: require('./user/VoiceToText').default,
};