'use client'

import styled from "styled-components";
import { USER_COLORS } from "@/src/utils/colors";

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const CheckBoxInput = styled.input`
  width: 1rem;
  height: 1rem;
`

const CheckBoxLabel = styled.label`
  font-family: 'Montserrat';
  font-size: 0.875rem;
  color: ${USER_COLORS.Modal.Text};
  margin: 0;
  user-select: none;
  cursor: pointer;
`

const CheckBox = ({
  label,
  htmlFor,
  isChecked = false,
  onChange = () => { }
}) => {
  return (
    <CheckBoxContainer>
      <CheckBoxInput
        type="checkbox"
        id={htmlFor}
        checked={isChecked}
        onChange={onChange}
      />
      <CheckBoxLabel htmlFor={htmlFor}>
        {label}
      </CheckBoxLabel>
    </CheckBoxContainer>
  )
}

export default CheckBox;