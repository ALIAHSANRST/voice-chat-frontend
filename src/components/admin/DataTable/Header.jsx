'use client';

import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// styled components for consistent styling
const HeaderContainer = styled(Container)`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--bs-primary);
`;

const ActionButton = styled(Button)`
  text-transform: none;
  width: fit-content;
  font-size: 0.875rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 1rem;
  margin: 0;
  gap: 0.5rem;
`;

const Separator = styled.hr`
  padding: 0;
  margin: 1rem 0 0.5rem 0;
  color: var(--bs-muted);
`;

/**
 * Header Component - A reusable header component for data tables
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title text to display
 * @param {boolean} [props.separator=true] - Whether to show separator line below header
 * @param {Array} [props.actions] - Array of action button configurations
 * @param {Object} [props.containerProps] - Additional props for container
 * @param {Object} [props.titleProps] - Additional props for title
 * @param {Object} [props.separatorProps] - Additional props for separator
 * @returns {React.ReactElement} Header component with title and action buttons
 */
const Header = ({
  title,
  separator = true,
  actions = [],
  containerProps = {},
  titleProps = {},
  separatorProps = {}
}) => {
  // validate required props
  if (!title) return null;

  return (
    <>
      <HeaderContainer {...containerProps}>
        <Title {...titleProps}>
          {title}
        </Title>
        <div className="d-flex gap-2">
          {actions?.map((action, index) => (
            <ActionButton
              key={`action-${index}`}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              {...action.extraProps}
            >
              {action.icon && <FontAwesomeIcon icon={action.icon} />}
              {action.label}
            </ActionButton>
          ))}
        </div>
      </HeaderContainer>
      {separator && <Separator {...separatorProps} />}
    </>
  );
};

export default Header;