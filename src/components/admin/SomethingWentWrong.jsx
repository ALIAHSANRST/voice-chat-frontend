'use client'

import React from 'react'

import { ADMIN_COMPONENTS } from '@/src/components'

/**
 * SomethingWentWrong Component
 * 
 * A reusable error display component that shows an error message in a centered layout
 * with customizable styling options.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.message='Something Went Wrong!'] - Error message to display
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {string} [props.messageClassName] - Additional CSS classes for the message text
 * @param {React.ReactNode} [props.icon] - Optional icon to display above message
 * @param {Function} [props.onRetry] - Optional retry handler function
 */
const SomethingWentWrong = ({
  message = 'Something Went Wrong!',
  className = '',
  messageClassName = '',
  icon,
  onRetry
}) => {
  return (
    <ADMIN_COMPONENTS.ContentWrapper>
      <div className={`d-flex justify-content-center align-items-center flex-column py-3 ${className}`}>
        {icon && <div className="mb-3">{icon}</div>}
        <span className={`fs-5 text-secondary ${messageClassName}`}>
          {message}
        </span>
        {onRetry && (
          <button
            className="btn btn-primary mt-3"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        )}
      </div>
    </ADMIN_COMPONENTS.ContentWrapper>
  )
}

export default SomethingWentWrong