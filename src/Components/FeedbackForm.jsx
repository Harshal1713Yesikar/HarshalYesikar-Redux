import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackForm = ({ onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    feedback: Yup.string().required('Feedback is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      feedback: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Feedback submitted:', values);
      onClose();
    },
  });

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          <FaTimes />
        </button>
        <h2>Feedback Form</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formik.values.name} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <span style={{ color: 'red' }}>{formik.errors.name}</span>
            ) : null}
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formik.values.email} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}
          </div>
          <div>
            <label>Feedback:</label>
            <textarea 
              id="feedback"
              name="feedback" 
              value={formik.values.feedback} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
            />
            {formik.touched.feedback && formik.errors.feedback ? (
              <span style={{ color: 'red' }}>{formik.errors.feedback}</span>
            ) : null}
          </div>
          <button type="submit" disabled={!formik.isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    maxWidth: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default FeedbackForm;
