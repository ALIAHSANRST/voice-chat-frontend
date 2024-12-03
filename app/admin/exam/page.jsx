'use client';

import { Col, Row } from 'react-bootstrap';

import { ADMIN_COMPONENTS } from '@/src/components';
import { ROUTES } from '@/src/utils/routes';

/**
 * ExamPage Component
 * 
 * Renders the main exam administration page with navigation cards to sub-modules.
 * Implements responsive grid layout for navigation options.
 *
 * Features:
 * - Responsive grid system for different screen sizes (xl-3, lg-4, md-6, sm-12 columns)
 * - Navigation cards for exam management features
 * - Centralized route management through ROUTES constant
 * - Navigation options for viewing results, managing exams, sentences, and rubrics
 *
 * @component
 * @returns {JSX.Element} Rendered exam administration page with navigation cards
 */
const ExamPage = () => {
  // navigation options with route definitions
  const navigationOptions = [
    {
      title: 'View Results',
      href: ROUTES.ADMIN_EXAM_RESULTS.path,
    },
    {
      title: 'Manage Sentences',
      href: ROUTES.ADMIN_EXAM_SENTENCES.path,
    },
    {
      title: 'Manage Exams',
      href: ROUTES.ADMIN_EXAM_MANAGE.path,
    },
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

export default ExamPage;