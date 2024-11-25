'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEraser, faG, faHome, faUserPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';

import { INITIAL_VALUES } from './values';
import LightLogo from "@/public/images/logo/light.jpeg";
import { useAuthenticationContext } from '@/src/context/AuthenticationContext';
import usePageTitle from '@/src/hooks/usePageTitle';
import { SignInSchema } from '@/src/validation';

const SignInPage = () => {
  usePageTitle('Sign In')

  const router = useRouter()
  const { SignInLocal, currentUser } = useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!currentUser) return
    // router.push(`/${currentUser.account_type}`)

    if (currentUser?.account_type === 'admin') {
      router.push(`/${currentUser.account_type}`)
    } else {
      router.push('/user/user-guide')
    }
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

    SignInLocal({ payload: values, callback: callback, isAdmin: isAdmin })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema,
    onSubmit: HandleSubmit,
    onReset: () => {
      setInitialValues({ ...INITIAL_VALUES })
      formik.resetForm(formik.initialValues)
    }
  })

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
          <Formik enableReinitialize>
            <Form className="d-flex flex-column" onSubmit={formik.handleSubmit} method='POST'>
              <h3 className='mb-4 text-muted fw-normal'>Sign In to Your Account</h3>

              <Container className="p-0 mb-3">
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  disabled={formik.isSubmitting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              </Container>

              <Container className="p-0 mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} className='cursor-pointer rounded-end'>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </InputGroup>
              </Container>

              <Form.Check
                type="checkbox"
                id="asAdmin"
                label="Continue as Admin"
                onChange={() => setIsAdmin(!isAdmin)}
                checked={isAdmin}
              />

              <div className="d-flex gap-3 mt-3 w-100">
                <Link className='btn btn-outline-secondary' href={'/'}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <button className='btn btn-outline-danger w-100' type='reset'>
                  <FontAwesomeIcon icon={faEraser} className='me-3' />
                  Reset
                </button>
                <Link className='btn btn-outline-primary w-100' href={'/sign-up'}>
                  <FontAwesomeIcon icon={faUserPlus} className="me-3" />
                  Sign Up
                </Link>
                <button className='btn btn-success w-100' type='submit' disabled={formik.isSubmitting}>
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
                <Button variant='outline-secondary' className='w-100' href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`}>
                  <FontAwesomeIcon icon={faG} className='me-3' />
                  Sign up with Google
                </Button>
                <Button variant='outline-secondary' className='w-100' href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/line`}>
                  <FontAwesomeIcon icon={faLine} className='me-3' />
                  Sign up with Line
                </Button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage