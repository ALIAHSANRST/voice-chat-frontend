'use client';

export const ADMIN_VALIDATION = {
  Email: require('./admin/email.validate'),
  ExamScript: require('./admin/examScript.validate'),
  Feedback: require('./admin/feedback.validate'),
  Exam: require('./admin/exam/index.validate').default
}

export const COMMON_VALIDATION = {
  Authentication: require('./common/authentication.validate'),
}

export const USER_VALIDATION = {
  Feedback: require('./user/feedback.validate'),
}