'use client'
import styled from "styled-components";

import { ICON_ASSETS } from "@/src/utils/assets";
import { USER_COLORS } from "@/src/utils/colors";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${USER_COLORS.SearchField.Border};
  background-color: ${USER_COLORS.SearchField.Background};
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${USER_COLORS.SearchField.BorderActive};
  }
`;

const SearchIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${USER_COLORS.SearchField.Text};
  font-size: 1rem;

  &::placeholder {
    color: ${USER_COLORS.SearchField.Placeholder};
  }
`;

const SearchField = ({
  placeholder,
  value,
  onChange,
  containerStyle,
  inputStyle,
}) => {
  return (
    <Container style={containerStyle}>
      <SearchIcon src={ICON_ASSETS.SEARCH_ICON} alt="search" />
      <SearchInput type="text" placeholder={placeholder} value={value} onChange={onChange} style={inputStyle} />
    </Container>
  )
}

export default SearchField;