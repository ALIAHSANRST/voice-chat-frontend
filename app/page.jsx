"use client";

import styled from "styled-components";

import { USER_COMPONENTS } from "@/src/components";
import { USER_COLORS } from "@/src/utils/colors";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
`

const HomePage = () => {
  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />
    </MainContainer>
  )
}

export default HomePage;