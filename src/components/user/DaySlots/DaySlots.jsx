"use client";

import { useState } from "react";
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import moment from "moment";

import { SLOT_DURATION_IN_MINUTES } from "@/src/utils/constants";
import { COMMON_CONTEXT } from "@/src/context";
import { ValidateTimeSlot } from "@/src/utils/helpers";

const COLORS = {
  primary: '#0064FF',
  secondary: '#6B7280',
  border: '#E5E7EB',
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    error: '#dc3545'
  },
  background: {
    white: '#FFFFFF',
    light: '#F9FAFB',
    error: '#FEF2F2'
  },
  accent: {
    blue: '#E5F0FF',
    red: '#FFE5E5'
  }
};

const Container = styled.div`
  border: 1px solid ${COLORS.border};
  border-radius: 0.75rem;
  background-color: ${COLORS.background.white};
  overflow: hidden;
  transition: all 0.2s ease;
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: ${props => props.isOpen ? COLORS.accent.blue : COLORS.background.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${COLORS.accent.blue};
  }

  .left {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: ${COLORS.text.primary};
      margin: 0;
    }

    .slots-count {
      font-size: 0.875rem;
      color: ${COLORS.text.secondary};
    }
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0)'};
  }
`;

const Content = styled.div`
  padding: ${props => props.isOpen ? '1rem 1.25rem' : '0 1.25rem'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const NoSlotsText = styled.div`
  padding: 0.25rem;
  font-size: 0.875rem;
  color: ${COLORS.text.secondary};
`

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const SlotCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${props => props.hasError ? COLORS.accent.red : COLORS.background.light};
  border: 1px solid ${props => props.hasError ? COLORS.text.error : COLORS.border};
  position: relative;
  margin-bottom: ${props => props.hasError ? '1.5rem' : '0'};
  height: 'min-content';

  .slot-number {
    min-width: 28px;
    height: 28px;
    border-radius: 8px;
    background-color: ${COLORS.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .time-info {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 0.75rem;
  }

  .slot-duration {
    font-size: 0.75rem;
    color: ${COLORS.text.secondary};
    padding: 0.25rem 0.5rem;
    background-color: ${COLORS.background.white};
    border-radius: 0.25rem;
    border: 1px solid ${COLORS.border};
  }

  .time-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${COLORS.text.secondary};
    font-size: 0.875rem;

    .arrow {
      color: ${COLORS.primary};
    }
  }

  .error-message {
    color: ${COLORS.text.error};
    font-size: 0.75rem;
    position: absolute;
    bottom: -1.25rem;
    left: 0;
  }
`;

const TimePickerWrapper = styled.div`
  position: relative;
  flex: 1;
  
  .MuiOutlinedInput-root {
    font-size: 0.875rem;
    background-color: white;
    border-radius: 0.5rem;
    
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${COLORS.primary};
      }
    }
    
    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${COLORS.primary};
      }
    }
  }

  .MuiInputBase-input {
    padding: 0.5rem;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${COLORS.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${COLORS.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background-color: ${COLORS.background.white};
  color: ${COLORS.text.secondary};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${COLORS.accent.red};
    color: ${COLORS.text.error};
  }
`;

const DaySlots = ({ day, slots = [], onChange, maxSlots }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const AddSlot = () => {
    if (slots.length >= maxSlots) return;
    onChange([...slots, { start: null }]);
    if (!isOpen) setIsOpen(true);
  };

  const RemoveSlot = (index) => {
    const newSlots = slots.filter((_, i) => i !== index);
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
    onChange(newSlots);
  };

  const UpdateSlot = (index, value) => {
    const newSlots = [...slots];
    newSlots[index] = {
      start: value ? moment(value).format('HH:mm') : null
    };

    const error = ValidateTimeSlot(
      newSlots[index],
      newSlots.filter((_, i) => i !== index),
      translations
    );

    setErrors(prev => ({
      ...prev,
      [index]: error
    }));

    onChange(newSlots);
  };

  const GetEndTime = (startTime) => {
    if (!startTime) return null;
    return moment(startTime, 'HH:mm')
      .add(SLOT_DURATION_IN_MINUTES, 'minutes')
      .format('HH:mm');
  };

  return (
    <Container>
      <DayHeader isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div className="left">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="chevron"
          />
          <h3>{day}</h3>
          <span className="slots-count">
            {slots.length} {slots.length !== 1 ? translations.MANAGE_SLOTS.SLOTS : translations.MANAGE_SLOTS.SLOT}
          </span>
        </div>
        <AddButton
          onClick={(e) => {
            e.stopPropagation();
            AddSlot();
          }}
          disabled={slots.length >= maxSlots}
        >
          <FontAwesomeIcon icon={faClock} />
          {translations.MANAGE_SLOTS.ADD_SLOT}
        </AddButton>
      </DayHeader>
      <Content isOpen={isOpen}>
        {
          slots.length === 0 &&
          <NoSlotsText>
            {translations.MANAGE_SLOTS.NO_SLOTS}
          </NoSlotsText>
        }

        <SlotsGrid>
          {slots.map((slot, index) => (
            <SlotCard key={index} hasError={errors[index]}>
              <span className="slot-number">{index + 1}</span>
              <div className="time-info">
                <TimePickerWrapper>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      value={slot.start ? moment(slot.start, 'HH:mm') : null}
                      onChange={(newValue) => UpdateSlot(index, newValue)}
                      ampm={false}
                      slotProps={{
                        textField: {
                          // size: "small",
                          placeholder: translations.MANAGE_SLOTS.START_TIME,
                          fullWidth: true
                        }
                      }}
                    />
                  </LocalizationProvider>
                </TimePickerWrapper>
                {slot.start && (
                  <>
                    <div className="time-display">
                      <span className="arrow">→</span>
                      <span>{GetEndTime(slot.start)}</span>
                    </div>
                    <span className="slot-duration">
                      {SLOT_DURATION_IN_MINUTES} {translations.MANAGE_SLOTS.MINS}
                    </span>
                  </>
                )}
              </div>
              <RemoveButton onClick={() => RemoveSlot(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </RemoveButton>
              {errors[index] && <span className="error-message">{errors[index]}</span>}
            </SlotCard>
          ))}
        </SlotsGrid>
      </Content>
    </Container>
  );
};

export default DaySlots;