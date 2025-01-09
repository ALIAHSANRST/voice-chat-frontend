const ROUTES = {
  // COMMON ROUTES
  HOME: { path: '/', isProtected: false, name: 'Home' },
  SIGN_UP: { path: '/auth/sign-up', isProtected: false, name: 'Sign Up' },
  VERIFY_EMAIL: { path: '/auth/verify-email', isProtected: false, name: 'Verify Email' },
  SIGN_IN: { path: '/auth/sign-in', isProtected: false, name: 'Sign In' },
  LOGOUT: { path: '/auth/logout', isProtected: false, name: 'Logout' },
  FORGOT_PASSWORD: { path: '/auth/forgot-password', isProtected: false, name: 'Forgot Password' },
  FORGOT_PASSWORD_RESET: { path: '/auth/forgot-password/reset', isProtected: false, name: 'Forgot Password' },
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
  ADMIN_EXAM_MANAGE_RANDOM: { path: '/admin/exam/manage/[id]/random', isProtected: true, name: 'Random Exam' },
  ADMIN_EXAM_SENTENCES: { path: '/admin/exam/sentences', isProtected: true, name: 'Manage Sentences' },
  ADMIN_EXAM_SENTENCES_ADD: { path: '/admin/exam/sentences/add', isProtected: true, name: 'Add Sentence' },

  // [ADMIN] OTHER ROUTES
  ADMIN_SEND_EMAIL: { path: '/admin/send-email', isProtected: true, name: 'Send Email' },

  // USER ROUTES
  USER_HOME: { path: '/user', isProtected: true, name: 'User' },
  USER_MESSAGES: { path: '/user/messages', isProtected: true, name: 'Messages' },
  USER_MY_LESSON: { path: '/user/my-lesson', isProtected: true, name: 'My Lesson' },
  USER_EXAM_HISTORY: { path: '/user/exam-history', isProtected: true, name: 'Exam History' },
  USER_PROFILE: { path: '/user/profile', isProtected: true, name: 'Profile' },
  USER_FREE_EXAM: { path: '/user/free-exam', isProtected: false, name: 'Free Exam' },
  USER_GIVE_FEEDBACK: { path: '/user/give-feedback', isProtected: true, name: 'Give Feedback' },

  // TEACHER ROUTES
  TEACHER_HOME: { path: '/teacher', isProtected: true, name: 'Teacher' },
  TEACHER_MESSAGES: { path: '/teacher/messages', isProtected: true, name: 'Messages' },
  TEACHER_CALENDAR: { path: '/teacher/calendar', isProtected: true, name: 'Calendar' },
  TEACHER_PROFILE: { path: '/teacher/profile', isProtected: true, name: 'Profile' },
  TEACHER_UPCOMING_CLASSES: { path: '/teacher/upcoming-classes', isProtected: true, name: 'Upcoming Classes' },
  TEACHER_STUDENTS: { path: '/teacher/students', isProtected: true, name: 'Students' },
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