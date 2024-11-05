'use client'
import React from 'react'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    industry: Yup.string().required('Industry is required'),
    role: Yup.string().required('Role is required'),
    region: Yup.string().required('Region is required'),
});

const page = () => {
    const { signup } = useAuthContext()
    const router = useRouter()
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                industry: '',
                role: '',
                region: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                const callback = (success) => {
                    setSubmitting(false);
                    console.log(success, 'success')
                    if (success) {
                        router.push('/test');
                    }
                }
                signup({ payload: values, callback })
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
                        <h3>Create an Account</h3>

                        <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                        </FloatingLabel>

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

                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingIndustry" label="Industry" className="mb-3">
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
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingRole" label="Role" className="mb-3">
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
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingRegion" label="Region" className="mb-3">
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
                        </FloatingLabel>

                        <div className='mb-2'>
                            <Link href={'/login'} className="link" ><p> already have an account ? login</p></Link>
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
