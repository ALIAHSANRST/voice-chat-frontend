'use client';

export const ADMIN_VALIDATION = {
  Exam: require('./admin/exam/index.validate').default,
  Feedback: require('./admin/feedback.validate'),
  Email: require('./admin/email.validate'),
}

export const COMMON_VALIDATION = {
  Authentication: require('./common/authentication.validate'),
}

export const USER_VALIDATION = {
  Feedback: require('./user/feedback.validate'),
  Profile: require('./user/profile.validate'),
}