import { BeatLoader } from 'react-spinners';

const LoaderFullScreen = ({
  color = "#444444",
  size = 12,
  message = "Loading..."
}) => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <BeatLoader color={color} size={size} loading={true} speedMultiplier={1.5} />
      <p className='mt-2 text-muted fs-4'>
        {message}
      </p>
    </div>
  )
}

export default LoaderFullScreen