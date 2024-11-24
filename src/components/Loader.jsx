import { BeatLoader } from 'react-spinners';

const Loader = ({
  color = "#444444",
  size = 12
}) => {
  return (
    <BeatLoader color={color} size={size} loading={true} speedMultiplier={1.5} />
  )
}

export default Loader