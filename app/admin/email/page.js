'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import AdminLayout from "../layout";
import { useAdminContext } from '@/context/adminContext';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Email = () => {

    const { sendEmail } = useAdminContext()

    const initialValues = {
        emailSubject: '',
        emailTitle: '',
        emailBody: '',
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        emailSubject: Yup.string()
            .min(5, 'Subject must be at least 5 characters')
            .required('Email subject is required'),
        emailTitle: Yup.string()
            .min(5, 'Title must be at least 5 characters')
            .required('Email title is required'),
        emailBody: Yup.string()
            .min(10, 'Body must be at least 10 characters')
            .required('Email body is required'),
    });

    // Handle form submission
    const onSubmit = (values, { resetForm }) => {
        console.log('Form data:', values);
        sendEmail({ payload: values, callback: () => { } })
        resetForm();
    };

    return (
        <div>
            <h1>Send Email to All Users</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="emailSubject">Email Subject</label>
                            <Field
                                type="text"
                                id="emailSubject"
                                name="emailSubject"
                                placeholder="Enter email subject"
                                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                            <ErrorMessage
                                name="emailSubject"
                                component="div"
                                style={{ color: 'red', marginTop: '0.5rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="emailTitle">Email Title</label>
                            <Field
                                type="text"
                                id="emailTitle"
                                name="emailTitle"
                                placeholder="Enter email title"
                                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                            <ErrorMessage
                                name="emailTitle"
                                component="div"
                                style={{ color: 'red', marginTop: '0.5rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>Email Body Content</label>
                            <ReactQuill
                                value={values.emailBody}
                                onChange={(content) => setFieldValue('emailBody', content)}
                                style={{ marginTop: '0.5rem' }}
                            />
                            <ErrorMessage
                                name="emailBody"
                                component="div"
                                style={{ color: 'red', marginTop: '0.5rem' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: isSubmitting ? '#ccc' : '#007BFF',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Email'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

Email.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Email;
