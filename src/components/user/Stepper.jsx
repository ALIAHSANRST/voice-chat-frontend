import { USER_COLORS } from "@/src/utils/colors";
import { Step, StepLabel, Stepper as MuiStepper } from "@mui/material";

const Stepper = ({
  steps,
  activeStep,
  orientation = 'horizontal',
}) => {
  return (
    <MuiStepper
      activeStep={activeStep}
      orientation={orientation}
      sx={{
        '& .MuiStepLabel-vertical': {
          padding: 0,
        },
        '& .MuiStepLabel-iconContainer': {
          '& svg': {
            border: `1px solid ${USER_COLORS.Home.Stepper.Border}`,
            borderRadius: '100%',
          },
          '& svg circle': {
            fill: 'white',
          },
          '& svg text': {
            fill: USER_COLORS.Home.Stepper.Text,
            fontSize: '1rem',
            fontWeight: '700',
          }
        }
      }}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel sx={{
            '& .MuiStepLabel-label': {
              fontFamily: 'Montserrat',
              fontSize: '1rem',
              fontWeight: '600',
              color: USER_COLORS.Home.Stepper.Text,
            }
          }}>{step}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  )
}

export default Stepper;