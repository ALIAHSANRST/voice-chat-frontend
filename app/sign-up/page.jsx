'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEraser, faG, faHome, faSignInAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';

import { INITIAL_VALUES } from './values';
import LightLogo from "@/public/images/logo/light.jpeg";
import { useAuthenticationContext } from '@/src/context/AuthenticationContext';
import usePageTitle from '@/src/hooks/usePageTitle';
import { SignUpSchema } from '@/src/validation';

const SignUpPage = () => {
  usePageTitle('Sign Up')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()
  const { SignUpLocal, currentUser } = useAuthenticationContext()

  useEffect(() => {
    if (!currentUser) return
    router.push(`/${currentUser.account_type}`)
  }, [currentUser])

  const HandleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const callback = (currentUser) => {
      console.log(`currentUser: `, currentUser)

      setSubmitting(false);
      if (!currentUser) return;

      if (currentUser?.account_type === 'admin') {
        router.push('/admin');
      } else if (currentUser?.account_type === 'user') {
        // router.push('/user');
        router.push('/user/user-guide');
      } else {
        router.push('/');
      }
    }

    SignUpLocal({ payload: values, callback: callback })
  }

  return (
    <Container className='my-5'>
      <Row className='border border-muted rounded-3 bg-white shadow-sm'>
        <Col lg={5} md={12} className='d-flex p-5 flex-column justify-content-center align-items-center gap-3'>
          <Image src={LightLogo} alt="Globalie" style={{
            width: "15rem",
            height: "auto",
          }} />

          <p className='text-muted fs-4'>
            Welcome to <span className='fw-bold'>Globalie</span>
          </p>
        </Col>
        <Col lg={7} md={12} className='p-lg-5 p-md-4 p-sm-4' style={{ backgroundColor: "#f5f5f5" }}>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={SignUpSchema}
            onSubmit={HandleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm
            }) => (
              <Form className="d-flex flex-column" onSubmit={handleSubmit} method='POST'>
                <h3 className='mb-4 text-muted fw-normal'>Create an Account</h3>

                <Container className="p-0 mb-3">
                  <Form.Label htmlFor="fullname">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullname}
                    isInvalid={touched.fullname && !!errors.fullname}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                </Container>

                <Container className="p-0 mb-3">
                  <Form.Label htmlFor="email">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Container>

                <Container className="p-0 mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)} className='cursor-pointer rounded-end'>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </InputGroup>
                </Container>

                <Container className="p-0 mb-3">
                  <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    />
                    <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer rounded-end'>
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </InputGroup>
                </Container>

                <Row className='g-3'>
                  <Col lg={6} md={12}>
                    <Container className="p-0 mb-3">
                      <Form.Label htmlFor="industry">Industry</Form.Label>
                      <Form.Control
                        type="text"
                        name="industry"
                        placeholder="Industry"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.industry}
                        isInvalid={touched.industry && !!errors.industry}
                      />
                      <Form.Control.Feedback type="invalid">{errors.industry}</Form.Control.Feedback>
                    </Container>
                  </Col>

                  <Col lg={6} md={12}>
                    <Container className="p-0 mb-3">
                      <Form.Label htmlFor="role">Role</Form.Label>
                      <Form.Control
                        type="text"
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                        isInvalid={touched.role && !!errors.role}
                      />
                      <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                    </Container>
                  </Col>
                </Row>

                <Container className="p-0 mb-3">
                  <Form.Label htmlFor="region">Region</Form.Label>
                  <Form.Control
                    type="text"
                    name="region"
                    placeholder="Region"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.region}
                    isInvalid={touched.region && !!errors.region}
                  />
                  <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                </Container>

                <div className="d-flex gap-3 mt-3 w-100">
                  <Link className='btn btn-outline-secondary' href={'/'}>
                    <FontAwesomeIcon icon={faHome} />
                  </Link>
                  <button className='btn btn-outline-danger w-100' onClick={() => resetForm()}>
                    <FontAwesomeIcon icon={faEraser} className='me-3' />
                    Reset
                  </button>
                  <Link className='btn btn-outline-primary w-100' href={'/sign-in'}>
                    <FontAwesomeIcon icon={faSignInAlt} className="me-3" />
                    Sign In
                  </Link>
                  <button className='btn btn-success w-100' onClick={handleSubmit} disabled={isSubmitting}>
                    <FontAwesomeIcon icon={faCheck} className="me-3" />
                    Submit
                  </button>
                </div>

                <div className='d-flex gap-3 my-4 w-100 align-items-center'>
                  <div className='w-100' style={{
                    borderTop: "1px solid #ccc",
                    height: "1px"
                  }}></div>
                  <p className='text-muted m-0'>OR</p>
                  <div className='w-100' style={{
                    borderTop: "1px solid #ccc",
                    height: "1px"
                  }}></div>
                </div>

                <div className='d-flex gap-3 w-100'>
                  <button className='btn btn-outline-secondary w-100'>
                    <FontAwesomeIcon icon={faG} className='me-3' />
                    Sign up with Google
                  </button>
                  <button className='btn btn-outline-secondary w-100'>
                    <FontAwesomeIcon icon={faLine} className='me-3' />
                    Sign up with Line
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage