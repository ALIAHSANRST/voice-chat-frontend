'use client';

import { BeatLoader } from 'react-spinners';

const Loader = ({
  color = "#444444",
  size = 12,
  wrapped = false,
  message = 'Loading Data...'
}) => {
  if (wrapped) {
    return (
      <div className='d-flex justify-content-center align-items-center flex-column py-3'>
        {
          message &&
          <span className='mb-2 fs-5 text-secondary'>
            {message}
          </span>
        }
        <BeatLoader color={color} size={size} loading={true} speedMultiplier={1.5} />
      </div>
    )
  }

  return (
    <BeatLoader color={color} size={size} loading={true} speedMultiplier={1.5} />
  )
}

export default Loader