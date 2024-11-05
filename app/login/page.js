'use client'
import React from 'react'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

const page = () => {
    const { login } = useAuthContext()
    const router = useRouter()
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                const callback = (success) => {
                    setSubmitting(false);
                    if (success) {
                        router.push('/test');
                    }
                }
                login({ payload: values, callback })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className="container w-50 d-flex flex-column justify-content-center vh-100">
                        <h3>Login to your Account</h3>

                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
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
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </FloatingLabel>

                        <div className='mb-2'>
                            <Link href={'/signup'} className="link" ><p> Create a new account</p></Link>
                        </div>

                        <Button type="submit" className="w-100" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default page
