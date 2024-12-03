const ROUTES = {
  // COMMON ROUTES
  HOME: { path: '/', isProtected: false, name: 'Home' },
  SIGN_UP: { path: '/auth/sign-up', isProtected: false, name: 'Sign Up' },
  SIGN_IN: { path: '/auth/sign-in', isProtected: false, name: 'Sign In' },
  LOGOUT: { path: '/auth/logout', isProtected: false, name: 'Logout' },
  LINE_OAUTH_RESPONSE: { path: '/auth/line/response', isProtected: false, name: 'Line OAuth' },
  GOOGLE_OAUTH_RESPONSE: { path: '/auth/google/response', isProtected: false, name: 'Google OAuth' },

  // ADMIN ROUTES
  ADMIN_HOME: { path: '/admin', isProtected: true, name: 'Admin' },

  // [ADMIN] FEEDBACK ROUTES
  ADMIN_FEEDBACK_MODULE: { path: '/admin/feedback', isProtected: true, name: 'Feedback' },
  ADMIN_FEEDBACK_QUESTIONS: { path: '/admin/feedback/questions', isProtected: true, name: 'Manage Questions' },
  ADMIN_FEEDBACK_QUESTIONS_ADD: { path: '/admin/feedback/questions/add', isProtected: true, name: 'Add Question' },
  ADMIN_FEEDBACK_RESPONSES: { path: '/admin/feedback/responses', isProtected: true, name: 'View Responses' },

  // [ADMIN] EXAM ROUTES
  ADMIN_EXAM_MODULE: { path: '/admin/exam', isProtected: true, name: 'Exam' },
  ADMIN_EXAM_RESULTS: { path: '/admin/exam/results', isProtected: true, name: 'View Results' },
  ADMIN_EXAM_MANAGE: { path: '/admin/exam/manage', isProtected: true, name: 'Manage Exams' },
  ADMIN_EXAM_MANAGE_ADD: { path: '/admin/exam/manage/add', isProtected: true, name: 'Add Exam' },
  ADMIN_EXAM_SENTENCES: { path: '/admin/exam/sentences', isProtected: true, name: 'Manage Sentences' },
  ADMIN_EXAM_SENTENCES_ADD: { path: '/admin/exam/sentences/add', isProtected: true, name: 'Add Sentence' },

  // [ADMIN] OTHER ROUTES
  ADMIN_SEND_EMAIL: { path: '/admin/send-email', isProtected: true, name: 'Send Email' },

  // USER ROUTES
  USER_HOME: { path: '/user', isProtected: true, name: 'User' },
  USER_GUIDE: { path: '/user/user-guide', isProtected: true, name: 'User Guide' },
}

const GetPublicRoutes = () => {
  return Object.values(ROUTES).filter((route) => !route.isProtected).map((route) => route.path);
}

const GetProtectedRoutes = () => {
  return Object.values(ROUTES).filter((route) => route.isProtected).map((route) => route.path);
}

export {
  GetPublicRoutes,
  GetProtectedRoutes,
  ROUTES,
};