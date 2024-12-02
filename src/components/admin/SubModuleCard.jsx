'use client';

import { ChevronRight } from '@mui/icons-material';
import Link from 'next/link';
import styled from 'styled-components';

// styled components
const CardWrapper = styled(Link)`
  margin: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--bs-border-color);
  text-decoration: none;
  font-size: 1.125rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--bs-gray-100);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.span`
  color: var(--bs-body-color);
  font-weight: ${props => props.bold ? '600' : '400'};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: var(--bs-primary);
`;

/**
 * SubModuleCard Component - A reusable card component for sub-module navigation
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title text to display
 * @param {string} props.href - The navigation link URL
 * @param {boolean} [props.boldTitle=false] - Whether to display title in bold
 * @param {Object} [props.wrapperProps] - Additional props for card wrapper
 * @param {Object} [props.titleProps] - Additional props for title
 * @param {Object} [props.iconProps] - Additional props for icon
 * @returns {React.ReactElement} SubModuleCard component
 */
const SubModuleCard = ({
  title,
  href,
  boldTitle = false,
  wrapperProps = {},
  titleProps = {},
  iconProps = {}
}) => {
  // validate required props
  if (!title || !href) return null;

  return (
    <CardWrapper href={href} {...wrapperProps}>
      <Title bold={boldTitle} {...titleProps}>
        {title}
      </Title>
      <IconWrapper {...iconProps}>
        <ChevronRight />
      </IconWrapper>
    </CardWrapper>
  );
};

export default SubModuleCard;