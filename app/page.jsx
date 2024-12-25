"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { COMMON_ASSETS, HOMEPAGE_ASSETS, ICON_ASSETS } from "@/src/utils/assets";
import { ROUTES } from "@/src/utils/routes";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from "@/src/context";

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.6s ease;
  position: relative;
  width: 2rem;
  height: 2rem;

  @media (max-width: 768px) {
    display: block;
    align-self: flex-start;
  }

  div {
    position: absolute;
    width: 1.5rem;
    height: 0.2rem;
    background-color: #0066FF;
    transition: all 0.3s ease;
    border-radius: 0.25rem;
    opacity: 0.5;
    left: 0.25rem;
  }

  div:first-child {
    top: 0.5rem;
  }

  div:nth-child(2) {
    top: 0.9rem;
  }

  div:last-child {
    top: 1.3rem;
  }

  &[data-is-hamburger-menu-open="true"] {
    div:first-child {
      top: 0.9rem;
      transform: rotate(45deg);
    }

    div:nth-child(2) {
      opacity: 0;
    }

    div:last-child {
      top: 0.9rem;
      transform: rotate(-45deg);
    }
  }
`

const HamburgerMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  padding: 1.5rem;
  gap: 1rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
  font-family: 'Montserrat', sans-serif;
  background-color: #F4F6F9;
`

const HeaderBackgroundGradient = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.style.height};
  object-fit: cover;
  z-index: 1;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 81.5rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
    max-width: 100%;
    gap: 1rem;
  }
`

const NavLogo = styled.img`
  max-height: 3rem;
`

const NavItemContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  a {
    font-size: 0.875rem;
    cursor: pointer;
    color: #1A1A1A;
    text-decoration: none;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const NavRegisterButton = styled.div`
  @media (max-width: 768px) {
    display: none;
  }

  a {
    border: 1px solid #0066FF;
    background: white;
    padding: 0.25rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;

    @media (max-width: 768px) {
      padding: 0.25rem;
    }

    &:hover {
      background: #F4F6F9;
      box-shadow: 0px 10px 20px 0px #002B6B20;
    }

    span {
      font-weight: 700;
      color: #0066FF;
      font-size: 1rem;
      padding: 0 1.25rem;

      @media (max-width: 768px) {
        font-size: 0.875rem;
        padding: 0 0.75rem;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.875rem;
      background: #0066FF;
      border-radius: 0.5rem;

      @media (max-width: 768px) {
        padding: 0.75rem;
      }
    }
  }
`

const HeroSectionWrapper = styled.div`
  margin: 0 auto;
  padding: 3.875rem 0;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 0 2rem 0;
    width: 100%;
    max-width: 100%;
  }
`

const HeroSectionTaglineContainer = styled.div`
  background: white;
  border-radius: 50rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  color: #1A1A1A;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    margin: 0 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span:first-child {
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  span:last-child {
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`

const HeroSectionTitle = styled.h1`
  color: #1A1A1A;
  font-size: 4.325rem;
  font-weight: 600;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2.325rem;
    padding: 0 2rem;
  }
`

const HeroSectionDescription = styled.p`
  color: #414D60;
  font-size: 1rem;
  text-align: center;
  max-width: 26.875rem;
  margin: 0 auto;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    width: 100%;
    max-width: 100%;
    padding: 0 1.5rem;
  }
`

const HeroSectionImageContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  img {
    width: 100%;
    max-width: 17.5rem;
    object-fit: cover;
    animation: scroll 10s linear infinite alternate;

    @media (max-width: 768px) {
      max-width: 6rem;
    }
  }

  &:hover img {
    animation-play-state: paused;
  }
`

const WhyChooseSectionWrapper = styled.div`
  margin: 4.875rem auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    margin: 3rem auto 4rem auto;
    gap: 1.5rem;
  }
`

const WhyChooseSectionTitleContainer = styled.div`
  max-width: 33rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 3.1875rem;
    color: #1A1A1A;
    font-weight: 600;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.325rem;
    }
  }

  p {
    color:#414D60;
    font-size: 1rem;
    text-align: center;
    font-weight: 400;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`

const WhyChooseSectionSegmentWrapper = styled.div`
  display: flex;
  gap: 3.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    flex-direction: column;
  }
`

const WhyChooseSectionLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-self: flex-end;
  z-index: 4;

  @media (max-width: 768px) {
    align-self: center;
  }

  #bottom-hand-drawn-arrow {
    max-width: 5.625rem;
    margin-right: -1.75rem;
    align-self: flex-end;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-top: 1rem;
      align-self: start;
      transform: rotate(135deg);
    }
  }
`

const WhyChooseSectionLeftTopCard = styled.div`
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 25px 100px 0px #002B6B40;
  border: 1px solid #EDEEF0;
  max-width: 16.25rem;

  div {
    p:first-child {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
      text-align: center;
    }

    p:last-child {
      color: #545D69;
      font-size: 0.75rem;
      font-weight: 400;
      margin: 0;
      text-align: center;
    }
  }
`

const WhyChooseSectionLeftBottomCard = styled.div`
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  box-shadow: 10px 25px 100px 0px #002B6B40;
  border: 1px solid #EDEEF0;
  max-width: 16.25rem;

  div {
    p:first-child {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
    }

    p:last-child {
      color: #545D69;
      font-size: 0.75rem;
      font-weight: 400;
      margin: 0;
    }
  }
`

const WhyChooseSectionMiddleWrapper = styled.div`
  position: relative;

  @media (max-width: 768px) {
    align-self: center;
  }

  img {
    width: 100%;
    max-width: 22.5rem;
    object-fit: cover;
    z-index: 4;
    position: relative;

    @media (max-width: 768px) {
      max-width: 50vw;
    }
  }
`

const WhyChooseSectionMiddleCircleOne = styled.div`
  background: #0064FF12;
  border: 1px solid #0064FF99;
  border-radius: 100%;
  width: 25rem;
  height: 25rem;
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: 768px) {
    width: 60vw;
    height: 60vw;
  }
`

const WhyChooseSectionMiddleCircleTwo = styled.div`
  background: #0064FF0D;
  border: 1px solid #8AB9FF;
  border-radius: 100%;
  width: 33.25rem;
  height: 33.25rem;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 73vw;
    height: 73vw;
  }
`

const WhyChooseSectionMiddleCircleThree = styled.div`
  background: #0064FF0D;
  border: 1px solid #8AB9FF;
  border-radius: 100%;
  width: 40rem;
  height: 40rem;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 87vw;
    height: 87vw;
  }
`

const WhyChooseSectionRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-self: flex-start;
  z-index: 4;
  margin-top: -2rem;

  @media (max-width: 768px) {
    align-self: center;
    margin-top: 0;
  }

  #top-hand-drawn-arrow {
    max-width: 5.625rem;

    @media (max-width: 768px) {
      margin-bottom: 1rem;
      align-self: flex-end;
      transform: rotate(135deg);
    }
  }
`

const WhyChooseSectionRightTopCard = styled.div`
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  box-shadow: 10px 25px 100px 0px #002B6B40;
  border: 1px solid #EDEEF0;
  max-width: 16.25rem;

  div {
    p:first-child {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.5rem;
      margin: 0;
    }
  }
`

const WhyChooseSectionRightBottomCard = styled.div`
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  box-shadow: 10px 25px 100px 0px #002B6B40;
  border: 1px solid #EDEEF0;
  max-width: 16.25rem;

  div {
    p:first-child {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
      text-align: center;
    }

    p:last-child {
      color: #545D69;
      font-size: 0.75rem;
      font-weight: 400;
      margin: 0;
      text-align: center;
    }
  }
`

const WhiteBackground = styled.div`
  background: white;
`

const HowItWorksSectionWrapper = styled.div`
  padding: 5.5rem 2rem;
  margin: 0 auto;
  display: flex;
  gap: 5rem;
  max-width: 81.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    flex-direction: column;
  }
`

const HowItWorksSectionLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 37.5rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1.5rem;
    max-width: 100%;
  }
`

const HowItWorksSectionTitle = styled.h1`
  color: #1A1A1A;
  font-size: 3.1875rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const HowItWorksSectionStepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`

const HowItWorksSectionStepContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const HowItWorksSectionStepNumber = styled.div`
  font-size: 6.75rem;
  font-weight: 600;
  color: #0064FF;
  opacity: 0.15;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`

const HowItWorksSectionStepContentContainer = styled.div`
  box-shadow: 0px 5px 15px 0px #00000026;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #F4F6F9;
  background: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 0.75rem;
    gap: 0.5rem;
  }

  img {
    max-width: 3.5rem;

    @media (max-width: 768px) {
      max-width: 2.75rem;
    }
  }

  div {
    p:first-child {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    p:last-child {
      color: #545D69;
      font-size: 0.8125rem;
      font-weight: 400;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }
`

const HowItWorksSectionRightContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1rem;
    width: 100%;
  }

  #how-it-works-photo-one {
    width: 100%;
    object-fit: cover;

    @media (max-width: 768px) {
      max-width: 100%;
      filter: brightness(0.5);
    }
  }

  #how-it-works-photo-two {
    width: 100%;
    object-fit: cover;

    @media (max-width: 768px) {
      display: none;
    }
  }
`

const HowItWorksSectionRightStatsContainer = styled.div`
  width: 17rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 1.25rem;
  box-shadow: 10px 25px 100px 0px #002B6B40;
  border: 1px solid #EDEEF0;
  position: absolute;
  top: calc(100% + 1.5rem);
  right: -2.25rem;
  left: 0;
  z-index: 4;

  @media (max-width: 768px) {
    top: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    width: calc(100% - 3rem);
  }

  div:first-child {
    display: flex;
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  div:last-child {
    p:first-child {
      color: #0066FF;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
    }

    p:last-child {
      color: #545D69;
      font-size: 0.8125rem;
      font-weight: 600;
      margin: 0;
    }
  }
`

const WhatOurClientsSaySectionContainer = styled.div`
  padding: 5.5rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 81.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }

  h1 {
    color: #1A1A1A;
    font-size: 3.1875rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.325rem;
    }
  }
`

const WhatOurClientsSaySectionTestimonialContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column-reverse;
  }
`

const WhatOurClientsSaySectionTestimonialCard = styled.div`
  flex: 1.5;
  background: #1E242C;
  border-radius: 1.25rem;
  padding: 3rem;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  div:nth-child(1) {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    span:nth-child(1) {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    span:nth-child(2) {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      background: white;

      @media (max-width: 768px) {
        width: 0.25rem;
        height: 0.25rem;
      }
    }

    span:nth-child(3) {
      color: #AAB1BA;
      font-size: 1.25rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  div:nth-child(2) {
    color: white;
    font-size: 2.5rem;
    font-weight: 400;
    text-align: center;
    line-height: 3rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  div:nth-child(3) {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;

      @media (max-width: 768px) {
        padding: 0.75rem;
      }
    }

    div:nth-child(1) {
      background: white;
    }

    div:nth-child(2) {
      background: #0064FF;
    }
  }
`

const FAQSectionContainer = styled.div`
  padding: 5.5rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 81.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }

  h1 {
    color: #1A1A1A;
    font-size: 3.1875rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1.325rem;
    }
  }
`

const FAQSectionContentContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
  }
`

const FAQSectionContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const FAQSectionContentQuestionContainer = styled.div`
  border: 1px solid #EBEEF2;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 0.75rem;
    gap: 0.5rem;
  }
`

const FAQSectionContentQuestionContentContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  div:nth-child(1) {
    background: #F4F6F9;
    border-radius: 50%;
    min-width: 3.5rem;
    min-height: 3.5rem;
    color: #2C3A4B;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      min-width: 2.5rem;
      min-height: 2.5rem;
      font-size: 1rem;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p:nth-child(1) {
      color: #1A1A1A;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.5rem;
      margin: 0;
    }

    p:nth-child(2) {
      color: #545D69;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      p:nth-child(1) {
        font-size: 1rem;
      }
    }
  }
`

const FooterBackgroundGradient = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const FooterWrapperContainer = styled.div`
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 81.5rem;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    padding-top: 2rem;
  }
`

const NewsletterSectionContainer = styled.div`
  width: 100%;
  box-shadow: 0px 16px 40px 0px #0064FF14;
  border-radius: 1.5rem;
  padding: 4rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  #join-us-gradient-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    overflow: hidden;
    border-radius: 1.5rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 4;

    p:nth-child(1) {
      max-width: 41.875rem;
      color: #1A1A1A;
      text-align: center;
      font-size: 2.375rem;
      font-weight: 600;
      margin: 0;
      line-height: 3rem;

      @media (max-width: 768px) {
        font-size: 1.325rem;
        line-height: 1.5rem;
      }
    }

    p:nth-child(2) {
      max-width: 35rem;
      color: #6D7580;
      text-align: center;
      font-size: 1rem;
      font-weight: 400;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }

  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 4;
    width: 100%;

    #join-us-input-field {
      width: 20rem;
    }

    #join-us-button {
      align-self: stretch;
      padding: 0rem 2rem;
    }

    @media (max-width: 768px) {
      flex-direction: column;

      #join-us-input-field {
        width: 100%;
      }

      #join-us-button {
        padding: 0.75rem 1rem;
      }
    }
  }
`

const FooterSectionContainer = styled.footer`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5rem 0;
  z-index: 5;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 0;
    padding-top: 3rem;
  }
`

const FooterSectionLogoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }
  }
`

const FooterSectionLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #414D60;
    cursor: pointer;
  }

  span:nth-child(1) {
    font-size: 1.1875rem;
    font-weight: 600;
    color: #1A1A1A;
  }

  @media (max-width: 768px) {
    gap: 0.425rem;
    align-items: center;
  }
`

const FooterSectionCopyrightContainer = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: #394452;
  padding-bottom: 2.25rem;
  z-index: 6;

  @media (max-width: 768px) {
    padding-bottom: 1rem;
  }
`

const HomePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const router = useRouter();

  usePageTitle({ title: [translations.HOME_PAGE.TITLE] });

  const SectionOneRef = useRef(null);
  const SectionOneImagesContainerRef = useRef(null);

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(0);

  const handleResize = () => {
    const backgroundGradient = document.querySelector('img[alt="background gradient"]');
    if (backgroundGradient) {
      backgroundGradient.style.height = `calc(${SectionOneRef.current?.getBoundingClientRect().height}px + ${SectionOneImagesContainerRef.current?.getBoundingClientRect().height / 2}px)`;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 1000);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [isHamburgerMenuOpen]);

  return (
    <MainContainer>
      <HeaderBackgroundGradient
        alt="background gradient"
        src={HOMEPAGE_ASSETS.BACKGROUND_GRADIENT}
        style={{
          height: `calc(${SectionOneRef.current?.getBoundingClientRect().height}px + ${SectionOneImagesContainerRef.current?.getBoundingClientRect().height / 2}px)`
        }} />

      <div ref={SectionOneRef} style={{ position: 'relative', zIndex: 2 }}>
        <Nav>
          <NavLogo src={COMMON_ASSETS.WIDE_LOGO} alt="globalie logo" />
          <NavItemContainer>
            {
              [
                { title: translations.HOME_PAGE.NAV[0], link: '/' },
                { title: translations.HOME_PAGE.NAV[1], link: '/' },
                { title: translations.HOME_PAGE.NAV[2], link: '/' },
                { title: translations.HOME_PAGE.NAV[3], link: '/' },
                { title: translations.HOME_PAGE.NAV[4], link: '/' },
              ].map((item, index) => (
                <Link key={`${index}_${item.title}`} href={item.link}>{item.title}</Link>
              ))
            }
          </NavItemContainer>
          <NavRegisterButton>
            <Link href={ROUTES.SIGN_UP.path}>
              <span>{translations.HOME_PAGE.REGISTER_NOW}</span>
              <div>
                <img src={HOMEPAGE_ASSETS.REGISTER_ARROW_ICON} alt="register arrow icon" />
              </div>
            </Link>
          </NavRegisterButton>
          <HamburgerMenu id="hamburger-menu" onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)} data-is-hamburger-menu-open={!isHamburgerMenuOpen}>
            <div />
            <div />
            <div />
          </HamburgerMenu>
        </Nav>

        {
          !isHamburgerMenuOpen &&
          <HamburgerMenuContainer>
            <NavItemContainer style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1rem',
              display: 'flex',
            }}>
              {
                [
                  { title: translations.HOME_PAGE.NAV[0], link: '/' },
                  { title: translations.HOME_PAGE.NAV[1], link: '/' },
                  { title: translations.HOME_PAGE.NAV[2], link: '/' },
                  { title: translations.HOME_PAGE.NAV[3], link: '/' },
                  { title: translations.HOME_PAGE.NAV[4], link: '/' },
                ].map((item, index) => (
                  <Link key={`${index}_${item.title}`} href={item.link}>{item.title}</Link>
                ))
              }
            </NavItemContainer>
            <NavRegisterButton style={{
              alignSelf: 'flex-start',
              display: 'flex',
            }}>
              <Link href={ROUTES.SIGN_UP.path}>
                <span>{translations.HOME_PAGE.REGISTER_NOW}</span>
                <div>
                  <img src={HOMEPAGE_ASSETS.REGISTER_ARROW_ICON} alt="register arrow icon" />
                </div>
              </Link>
            </NavRegisterButton>
          </HamburgerMenuContainer>
        }

        <HeroSectionWrapper>
          <HeroSectionTaglineContainer>
            <span>{translations.HOME_PAGE.TAGLINE[0]}</span>
            <span>{translations.HOME_PAGE.TAGLINE[1]}</span>
          </HeroSectionTaglineContainer>
          <HeroSectionTitle>
            {translations.HOME_PAGE.HERO_SECTION[0]}
          </HeroSectionTitle>
          <HeroSectionDescription>
            {translations.HOME_PAGE.HERO_SECTION[1]}
          </HeroSectionDescription>
          <USER_COMPONENTS.Button text={translations.HOME_PAGE.HERO_SECTION[2]}
            onClick={() => router.push(ROUTES.USER_FREE_EXAM.path)} />
        </HeroSectionWrapper>
      </div>

      <HeroSectionImageContainer ref={SectionOneImagesContainerRef}>
        {
          [
            HOMEPAGE_ASSETS.PERSON_ONE,
            HOMEPAGE_ASSETS.PERSON_TWO,
            HOMEPAGE_ASSETS.PERSON_THREE,
            HOMEPAGE_ASSETS.PERSON_FOUR,
            HOMEPAGE_ASSETS.PERSON_ONE,
            HOMEPAGE_ASSETS.PERSON_TWO,
            HOMEPAGE_ASSETS.PERSON_THREE,
            HOMEPAGE_ASSETS.PERSON_FOUR,
          ].map((item, index) => (
            <img key={`${index}_${item}`} src={item} alt={`person ${index + 1}`} />
          ))
        }
      </HeroSectionImageContainer>

      <WhyChooseSectionWrapper>
        <WhyChooseSectionTitleContainer>
          <h2>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[0]}</h2>
          <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[1]}</p>
        </WhyChooseSectionTitleContainer>

        <WhyChooseSectionSegmentWrapper>
          <WhyChooseSectionLeftContainer>
            <WhyChooseSectionLeftTopCard>
              <span style={{ padding: '0.5rem' }}>
                <img src={HOMEPAGE_ASSETS.EXPERIENCED_TEACHER_ICON} alt="experienced teacher icon" />
              </span>
              <div>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[2]}</p>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[3]}</p>
              </div>
              <USER_COMPONENTS.Button text={translations.HOME_PAGE.WHY_CHOOSE_SECTION[4]} style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.375rem',
              }} />
            </WhyChooseSectionLeftTopCard>
            <WhyChooseSectionLeftBottomCard>
              <span style={{ padding: '0.5rem' }}>
                <img src={HOMEPAGE_ASSETS.AUDIENCE_COUNT_ICON} alt="audience count icon" />
              </span>
              <div>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[5]}</p>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[6]}</p>
              </div>
            </WhyChooseSectionLeftBottomCard>
            <img src={HOMEPAGE_ASSETS.BOTTOM_HAND_DRAWN_ARROW} alt="bottom hand drawn arrow" id='bottom-hand-drawn-arrow' />
          </WhyChooseSectionLeftContainer>

          <WhyChooseSectionMiddleWrapper>
            <WhyChooseSectionMiddleCircleOne />
            <WhyChooseSectionMiddleCircleTwo />
            <WhyChooseSectionMiddleCircleThree />
            <img src={HOMEPAGE_ASSETS.PERSON_FIVE} alt="person five" />
          </WhyChooseSectionMiddleWrapper>

          <WhyChooseSectionRightContainer>
            <img src={HOMEPAGE_ASSETS.TOP_HAND_DRAWN_ARROW} alt="top hand drawn arrow" id='top-hand-drawn-arrow' />
            <WhyChooseSectionRightTopCard>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.CUSTOMIZED_EXAMS_ICON} alt="customized exams icon" />
              </span>
              <div>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[7]}</p>
              </div>
            </WhyChooseSectionRightTopCard>
            <WhyChooseSectionRightBottomCard>
              <span style={{ padding: '0.5rem', }}>
                <img src={HOMEPAGE_ASSETS.FLEXIBLE_SCHEDULE_ICON} alt="flexible schedule icon" />
              </span>
              <div>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[8]}</p>
                <p>{translations.HOME_PAGE.WHY_CHOOSE_SECTION[9]}</p>
              </div>
              <USER_COMPONENTS.Button text={translations.HOME_PAGE.WHY_CHOOSE_SECTION[10]} style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: '0.375rem',
              }} />
            </WhyChooseSectionRightBottomCard>
          </WhyChooseSectionRightContainer>
        </WhyChooseSectionSegmentWrapper>
      </WhyChooseSectionWrapper>

      <WhiteBackground>
        <HowItWorksSectionWrapper>
          <HowItWorksSectionLeftContainer>
            <HowItWorksSectionTitle>
              {translations.HOME_PAGE.HOW_IT_WORKS_SECTION.TITLE}
            </HowItWorksSectionTitle>

            <HowItWorksSectionStepsContainer>
              {
                [
                  {
                    stepNumber: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[0].stepNumber,
                    stepIcon: HOMEPAGE_ASSETS.STEP_ONE_ICON,
                    stepTitle: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[0].stepTitle,
                    stepDescription: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[0].stepDescription,
                  },
                  {
                    stepNumber: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[1].stepNumber,
                    stepIcon: HOMEPAGE_ASSETS.STEP_TWO_ICON,
                    stepTitle: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[1].stepTitle,
                    stepDescription: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[1].stepDescription,
                  },
                  {
                    stepNumber: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[2].stepNumber,
                    stepIcon: HOMEPAGE_ASSETS.STEP_THREE_ICON,
                    stepTitle: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[2].stepTitle,
                    stepDescription: translations.HOME_PAGE.HOW_IT_WORKS_SECTION.STEPS[2].stepDescription,
                  },
                ].map((item, index) => (
                  <HowItWorksSectionStepContainer key={`${index}_${item.stepNumber}_hiw`}
                    style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', }}>
                    <HowItWorksSectionStepNumber>
                      {item.stepNumber}
                    </HowItWorksSectionStepNumber>
                    <HowItWorksSectionStepContentContainer>
                      <img src={item.stepIcon} alt={`step ${item.stepNumber} icon`} />
                      <div>
                        <p>{item.stepTitle}</p>
                        <p>{item.stepDescription}</p>
                      </div>
                    </HowItWorksSectionStepContentContainer>
                  </HowItWorksSectionStepContainer>
                ))
              }
            </HowItWorksSectionStepsContainer>
          </HowItWorksSectionLeftContainer>

          <HowItWorksSectionRightContainer>
            <div style={{ position: 'relative', width: '100%' }}>
              <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_ONE} alt='how it works photo one' id='how-it-works-photo-one' />
              <HowItWorksSectionRightStatsContainer>
                <div>
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_THREE} alt='how it works photo three' />
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_FOUR} alt='how it works photo four' style={{ marginLeft: '-0.75rem' }} />
                  <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_FIVE} alt='how it works photo five' style={{ marginLeft: '-0.75rem' }} />
                </div>
                <div>
                  <p>{translations.HOME_PAGE.HOW_IT_WORKS_SECTION.TEXT_1}</p>
                  <p>{translations.HOME_PAGE.HOW_IT_WORKS_SECTION.TEXT_2}</p>
                </div>
              </HowItWorksSectionRightStatsContainer>
            </div>
            <img src={HOMEPAGE_ASSETS.HOW_IT_WORKS_PHOTO_TWO} alt='how it works photo two' id='how-it-works-photo-two' />
          </HowItWorksSectionRightContainer>
        </HowItWorksSectionWrapper>
      </WhiteBackground>

      <WhatOurClientsSaySectionContainer>
        <h1>{translations.HOME_PAGE.TESTIMONIAL_SECTION.TITLE}</h1>
        <WhatOurClientsSaySectionTestimonialContainer>
          <WhatOurClientsSaySectionTestimonialCard>
            <div>
              <span>Manuel Rikob</span>
              <span></span>
              <span>CEO of Intel</span>
            </div>
            <div>
              "Working with Master in me has been an incredibly
              painless and enjoyable
              experience."
            </div>
            <div>
              <div>
                <img src={HOMEPAGE_ASSETS.ARROW_LEFT_LINE_ICON} alt='arrow left line icon' />
              </div>
              <div>
                <img src={HOMEPAGE_ASSETS.ARROW_RIGHT_LINE_ICON} alt='arrow right line icon' />
              </div>
            </div>
          </WhatOurClientsSaySectionTestimonialCard>
          <img src={HOMEPAGE_ASSETS.CLIENT_PHOTO_ONE} alt='client photo one' style={{
            width: '100%',
            objectFit: 'cover',
            flex: 1,
          }} />
        </WhatOurClientsSaySectionTestimonialContainer>
      </WhatOurClientsSaySectionContainer>

      <WhiteBackground>
        <FAQSectionContainer>
          <h1>{translations.HOME_PAGE.FAQ_SECTION.TITLE}</h1>
          <FAQSectionContentContainer>
            {
              (() => {
                const questions = translations.HOME_PAGE.FAQ_SECTION.QUESTIONS;

                const firstHalfQuestions = questions.slice(0, Math.floor(questions.length / 2));
                const secondHalfQuestions = questions.slice(Math.floor(questions.length / 2));

                return [firstHalfQuestions, secondHalfQuestions];
              })().map((segment, segmentIndex) => {
                return (
                  <FAQSectionContentColumn key={`${segmentIndex}_faq_column`}>
                    {
                      segment.map((item, index) => {
                        const absoluteIndex = segmentIndex * Math.ceil(segment.length) + index;
                        const isOpen = openFAQIndex === absoluteIndex;

                        return (
                          <FAQSectionContentQuestionContainer
                            key={`${index}_${item.questionTitle}`}
                            onClick={() => setOpenFAQIndex(isOpen ? -1 : absoluteIndex)}
                            style={{
                              border: isOpen ? '1px solid #8AB9FF' : '1px solid #EBEEF2',
                              background: isOpen ? '#E6F0FF' : '#ffffff',
                              cursor: 'pointer'
                            }}>
                            <FAQSectionContentQuestionContentContainer>
                              <div style={{
                                background: isOpen ? '#ffffff' : '#F4F6F9',
                                color: isOpen ? '#002B6B' : '#2C3A4B',
                              }}>{item.questionNumber}</div>
                              <div>
                                <p>{item.questionTitle}</p>
                                {isOpen && <p>{item.questionDescription}</p>}
                              </div>
                            </FAQSectionContentQuestionContentContainer>
                            <img src={
                              isOpen
                                ? HOMEPAGE_ASSETS.FAQ_CLOSE_QUESTION_ICON
                                : HOMEPAGE_ASSETS.FAQ_OPEN_QUESTION_ICON
                            } alt='faq toggle icon' />
                          </FAQSectionContentQuestionContainer>
                        )
                      })
                    }
                  </FAQSectionContentColumn>
                )
              })
            }
          </FAQSectionContentContainer>
        </FAQSectionContainer>
      </WhiteBackground>

      <div style={{ position: 'relative' }}>
        <FooterBackgroundGradient src={HOMEPAGE_ASSETS.FOOTER_GRADIENT_BACKGROUND} alt='footer gradient background' />
        <FooterWrapperContainer>
          <NewsletterSectionContainer>
            <div id='join-us-gradient-background'>
              <img src={HOMEPAGE_ASSETS.JOIN_US_GRADIENT_BACKGROUND} alt='join us gradient background' />
            </div>
            <div>
              <p>{translations.HOME_PAGE.JOIN_US_SECTION.TITLE}</p>
              <p>{translations.HOME_PAGE.JOIN_US_SECTION.DESCRIPTION}</p>
            </div>
            <div>
              <COMMON_COMPONENTS.Auth.InputField
                name={'email'}
                placeholder={translations.HOME_PAGE.JOIN_US_SECTION.EMAIL_PLACEHOLDER}
                type={'email'}
                leftIcon={ICON_ASSETS.SMS_ICON}
                inputWrapperId={'join-us-input-field'}
              />
              <USER_COMPONENTS.Button text={translations.HOME_PAGE.JOIN_US_SECTION.JOIN_US} id={'join-us-button'} />
            </div>
          </NewsletterSectionContainer>

          <FooterSectionContainer>
            <FooterSectionLogoColumn>
              <img src={COMMON_ASSETS.WIDE_LOGO} alt='logo icon' style={{ height: '3rem' }} />
              <div>
                <img src={HOMEPAGE_ASSETS.INSTAGRAM_ICON} alt='instagram icon' />
                <img src={HOMEPAGE_ASSETS.TELEGRAM_ICON} alt='telegram icon' />
                <img src={HOMEPAGE_ASSETS.TIKTOK_ICON} alt='tiktok icon' />
                <img src={HOMEPAGE_ASSETS.YOUTUBE_ICON} alt='youtube icon' />
              </div>
            </FooterSectionLogoColumn>
            <FooterSectionLinkColumn>
              <span>{translations.HOME_PAGE.FOOTER_SECTION.QUICK_LINKS_TITLE}</span>
              {
                translations.HOME_PAGE.FOOTER_SECTION.QUICK_LINKS.map((item, index) => (
                  <span key={`${index}_${item}`}>{item}</span>
                ))
              }
            </FooterSectionLinkColumn>
            <FooterSectionLinkColumn>
              <span>{translations.HOME_PAGE.FOOTER_SECTION.OTHERS_TITLE}</span>
              {
                translations.HOME_PAGE.FOOTER_SECTION.OTHERS.map((item, index) => (
                  <span key={`${index}_${item}`}>{item}</span>
                ))
              }
              <COMMON_COMPONENTS.LanguageSelect />
            </FooterSectionLinkColumn>
          </FooterSectionContainer>

          <FooterSectionCopyrightContainer>
            &copy; {new Date().getFullYear()} {translations.HOME_PAGE.FOOTER_SECTION.COPYRIGHT}
          </FooterSectionCopyrightContainer>
        </FooterWrapperContainer>
      </div>
    </MainContainer>
  )
}

export default HomePage;