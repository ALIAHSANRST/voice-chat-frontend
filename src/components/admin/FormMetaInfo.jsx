'use client'

import { Col, Row } from 'react-bootstrap'

import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from "@/src/components"

/**
 * FormMetaInfo Component
 * 
 * A reusable component that displays metadata information about a form/record including
 * when it was created/updated and by whom. The information is displayed in a grid layout
 * using disabled text fields.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.updatedAt=''] - Timestamp when the record was last updated
 * @param {string} [props.createdAt=''] - Timestamp when the record was created
 * @param {string} [props.updatedBy=''] - User who last updated the record
 * @param {string} [props.createdBy=''] - User who created the record
 * @returns {React.ReactElement} Grid layout showing record metadata
 */
const FormMetaInfo = ({
  updatedAt = '',
  createdAt = '',
  updatedBy = '',
  createdBy = ''
}) => {
  return (
    <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mt-3'>
      <Row>
        {
          updatedBy &&
          <Col xl={3} lg={4} md={6} sm={12}>
            <COMMON_COMPONENTS.TextField
              name='updatedBy'
              disable={true}
              label='Updated By'
              value={updatedBy}
            />
          </Col>
        }
        {
          updatedAt &&
          <Col xl={3} lg={4} md={6} sm={12}>
            <COMMON_COMPONENTS.TextField
              name='updatedAt'
              disable={true}
              label='Updated At'
              value={updatedAt}
            />
          </Col>
        }
        {
          createdBy &&
          <Col xl={3} lg={4} md={6} sm={12}>
            <COMMON_COMPONENTS.TextField
              name='createdBy'
              disable={true}
              label='Created By'
              value={createdBy}
            />
          </Col>
        }
        {
          createdAt &&
          <Col xl={3} lg={4} md={6} sm={12}>
            <COMMON_COMPONENTS.TextField
              name='createdAt'
              disable={true}
              label='Created At'
              value={createdAt}
            />
          </Col>
        }
      </Row>
    </ADMIN_COMPONENTS.ContentWrapper>
  )
}

export default FormMetaInfo