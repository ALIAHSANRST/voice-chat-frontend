import React from 'react';
import { Form } from 'react-bootstrap';

const TextField = ({
  label,
  placeholder,
  name,
  formik,
  disable = false,
  hasFieldArrayError = false,
  value = '',
  error = null,
  type = 'text',
  as = 'input'
}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={formik.handleChange}
        value={hasFieldArrayError ? value : formik.values[name]}
        disabled={disable}
        as={as}
        rows={5}
      />

      {
        formik.errors[name] && formik.touched[name]
          ? <Form.Text className='text-danger'>{formik.errors[name]}</Form.Text>
          : null
      }

      {
        hasFieldArrayError
          ? formik.getFieldMeta(name).error
            ? <Form.Text className='text-danger'>{formik.getFieldMeta(name).error}</Form.Text>
            : null
          : ''
      }
    </Form.Group>
  );
};

export default TextField;