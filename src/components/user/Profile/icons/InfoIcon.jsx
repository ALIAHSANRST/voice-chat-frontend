const InfoIcon = ({
  width = 24,
  height = 25,
  color = '#B95000',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_6790_1722" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="21">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM12 13.5C11.45 13.5 11 13.05 11 12.5V8.5C11 7.95 11.45 7.5 12 7.5C12.55 7.5 13 7.95 13 8.5V12.5C13 13.05 12.55 13.5 12 13.5ZM11 15.5V17.5H13V15.5H11Z" fill="black" />
      </mask>
      <g mask="url(#mask0_6790_1722)">
        <rect y="0.5" width="24" height="24" fill={color} />
      </g>
    </svg>
  )
}

export default InfoIcon;