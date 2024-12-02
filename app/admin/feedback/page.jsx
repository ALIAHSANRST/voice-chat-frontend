'use client';

import { Col, Row } from 'react-bootstrap';

import { ADMIN_COMPONENTS } from '@/src/components';
import { ROUTES } from '@/src/utils/routes';

/**
 * FeedbackPage Component
 * 
 * Renders the main feedback administration page with navigation cards to sub-modules.
 * Implements responsive grid layout for navigation options.
 *
 * Features:
 * - Responsive grid system for different screen sizes (xl-3, lg-4, md-6, sm-12 columns)
 * - Navigation cards for feedback management features
 * - Centralized route management through ROUTES constant
 * - Navigation options for managing feedback questions and viewing responses
 *
 * @component
 * @returns {JSX.Element} Rendered feedback administration page with navigation cards
 */
const FeedbackPage = () => {
  // navigation options with route definitions
  const navigationOptions = [
    {
      title: 'Manage Questions',
      href: ROUTES.ADMIN_FEEDBACK_QUESTIONS.path,
    },
    {
      title: 'View Responses',
      href: ROUTES.ADMIN_FEEDBACK_RESPONSES.path,
    }
  ];

  return (
    <ADMIN_COMPONENTS.ContentWrapper>
      <Row className="g-4">
        {navigationOptions.map(item => (
          <Col
            key={`feedback-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            xl={3}
            lg={4}
            md={6}
            sm={12}
          >
            <ADMIN_COMPONENTS.SubModuleCard
              title={item.title}
              href={item.href}
              data-testid={`feedback-card-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          </Col>
        ))}
      </Row>
    </ADMIN_COMPONENTS.ContentWrapper>
  );
};

export default FeedbackPage;