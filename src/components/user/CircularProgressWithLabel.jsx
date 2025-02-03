'use client'

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { USER_COLORS } from '@/src/utils/colors';

const CircularProgressWithLabel = ({
  circularProgressProps,
  label,
  value,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" size={66} thickness={3} value={value} {...circularProgressProps} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: USER_COLORS.Home.Container.PrimaryText, fontSize: '0.925rem', fontWeight: '400', fontFamily: 'Montserrat' }}
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      </Box>
      <span style={{
        fontSize: '0.8125rem',
        fontWeight: '400',
        fontFamily: 'Montserrat',
        color: USER_COLORS.Home.Container.SecondaryText,
        textAlign: 'center'
      }}>{label}</span>
    </div>
  );
}

export default CircularProgressWithLabel;