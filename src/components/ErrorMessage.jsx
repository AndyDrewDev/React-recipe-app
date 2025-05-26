import React from 'react'

const ErrorMessage = React.memo(
  ({ error, onClose }) => {
    if (!error) return null

    return (
      <div className='error-message'>
        <div className='error-content'>
          <i className='fa fa-exclamation-triangle error-icon'></i>
          <span className='error-text'>{error}</span>
          <button className='error-close' onClick={onClose}>
            <i className='fa fa-times'></i>
          </button>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Перерендер тільки якщо змінився error
    return prevProps.error === nextProps.error
  }
)

export default ErrorMessage
