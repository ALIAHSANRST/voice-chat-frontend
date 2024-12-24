'use client';

export const ADMIN_CONTEXT = {

}

export const COMMON_CONTEXT = {
  AuthenticationContext: require('./common/AuthenticationContext'),
  TranslationContext: require('./common/TranslationContext'),
}

export const USER_CONTEXT = {
  SocketContext: require('./user/SocketContext'),
  VoiceContext: require('./user/VoiceContext'),
}