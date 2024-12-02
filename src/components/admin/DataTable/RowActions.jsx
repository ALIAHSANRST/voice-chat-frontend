'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// styled components for consistent styling
const ActionsContainer = styled(Box)`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const ActionButton = styled(IconButton)`
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

// predefined action button configurations
export const DeleteAction = ({
  label = 'Delete',
  icon = faTrash,
  href = null,
  onClick = null,
  color = 'error',
  extraProps = {}
}) => ({
  type: 'delete',
  label,
  icon,
  href,
  onClick,
  color,
  extraProps
});

export const EditAction = ({
  label = 'Edit',
  icon = faEdit,
  href = null,
  onClick = null,
  color = 'primary',
  extraProps = {}
}) => ({
  type: 'edit',
  label,
  icon,
  href,
  onClick,
  color,
  extraProps
});

export const ViewAction = ({
  label = 'View',
  icon = faEye,
  href = null,
  onClick = null,
  color = 'default',
  extraProps = {}
}) => ({
  type: 'view',
  label,
  icon,
  href,
  onClick,
  color,
  extraProps
});

/**
 * RowActions Component - Renders customizable action buttons for table rows
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.actions - Array of action configurations. Can use predefined actions
 *                               (DeleteAction, EditAction, ViewAction) or custom actions
 * @param {Object} [props.containerProps] - Additional props for container
 * @param {Object} [props.tooltipProps] - Additional props for all tooltips
 * @param {Object} [props.buttonProps] - Additional props for all action buttons
 * 
 * @example
 * // Using predefined actions
 * <RowActions 
 *   actions={[
 *     DeleteAction({ onClick: handleDelete }),
 *     EditAction({ href: '/edit/1' }),
 *     ViewAction({ onClick: handleView })
 *   ]} 
 * />
 * 
 * @example
 * // Using custom action
 * <RowActions
 *   actions={[
 *     {
 *       type: 'custom',
 *       label: 'Download',
 *       icon: faDownload,
 *       onClick: handleDownload,
 *       color: 'success'
 *     }
 *   ]}
 * />
 */
const RowActions = ({
  actions = [],
  containerProps = {},
  tooltipProps = {},
  buttonProps = {}
}) => {
  // validate required props
  if (!actions || actions.length === 0) return null;

  const renderActionButton = (action, index) => {
    if (!action) return null;

    // determine tooltip placement based on position
    const placement = index % 2 === 0 ? 'right' : 'left';

    return (
      <Tooltip
        key={`action-${action.type}-${index}`}
        arrow
        placement={placement}
        title={action.label}
        {...tooltipProps}
      >
        <ActionButton
          color={action.color}
          onClick={action.onClick}
          href={action.href}
          {...buttonProps}
          {...action.extraProps}
        >
          <FontAwesomeIcon icon={action.icon} size="xs" />
        </ActionButton>
      </Tooltip>
    );
  };

  return (
    <ActionsContainer {...containerProps}>
      {actions.map((action, index) => renderActionButton(action, index))}
    </ActionsContainer>
  );
};

export default RowActions;