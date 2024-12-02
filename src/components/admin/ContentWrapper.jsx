'use client';

import { Container } from 'react-bootstrap';
import styled from 'styled-components';

// styled components for consistent styling
const OuterContainer = styled(Container)`
  padding: 1.25rem;
`;

const InnerContainer = styled(Container)`
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

/**
 * ContentWrapper - A reusable component that provides consistent padding and styling for content
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be wrapped
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.outerProps] - Additional props for outer container
 * @param {Object} [props.innerProps] - Additional props for inner container
 * @param {boolean} [props.outerOnly] - Use only outer container
 * @param {boolean} [props.innerOnly] - Use only inner container
 * @returns {React.ReactElement} Wrapped content with consistent styling
 */
const ContentWrapper = ({
  children,
  className = '',
  outerProps = {},
  innerProps = {},
  outerOnly = false,
  innerOnly = false
}) => {
  // validate required props
  if (!children) return null;

  if (outerOnly) {
    return (
      <OuterContainer className={className} {...outerProps}>
        {children}
      </OuterContainer>
    );
  }

  if (innerOnly) {
    return (
      <InnerContainer className={className} {...innerProps}>
        {children}
      </InnerContainer>
    );
  }

  return (
    <OuterContainer className={className} {...outerProps}>
      <InnerContainer {...innerProps}>
        {children}
      </InnerContainer>
    </OuterContainer>
  );
};

export default ContentWrapper;