 import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Row style={{justifyContent: 'center'}}>
        <Col xs={8} className='mt-5'>
          <Card className="p-4">
            <h1 className='mb-4'>Sign Up</h1>
            <RegisterationForm/>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

function RegisterationForm() {

  const [values, handleInput, reset, validateForm, errors] = useForm();

  const submitForm = (event)=>{
    event.preventDefault();
    if (validateForm()) {
      alert("Form submited successfully")
    }
  }

  return(
  <Form onSubmit={submitForm}>

    <InputField
      label="Full name"
      type="text"
      name="fullname"
      placeholder="Enter your name"
      value={values.fullname}
      onChange={handleInput}
      error={errors.fullname}
    />
    
    <InputField
      label="Email ID"
      type="email"
      name="email"
      placeholder="Enter your email"
      value={values.email}
      onChange={handleInput}
      error={errors.email}
    />

    <InputField
      label="Password"
      type="password"
      name="password"
      placeholder="Enter a strong password"
      value={values.password}
      onChange={handleInput}
      error={errors.password}
    />

    <InputField
      label="Confirm Password"
      type="password"
      name="confirmPassword"
      placeholder="Repeat your password"
      value={values.confirmPassword}
      onChange={handleInput}
      error={errors.confirmPassword}
    />
    <div className='mt-3'>
      <Button type="submit">
        Register
      </Button>
      {' '}
      <Button onClick={reset} variant='outline-secondary'>
        Reset
      </Button>
    </div>
  </Form>
  );
  }

const InputField = ({label, error, ...props})=> {
  return <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} className={error ? "is-invalid" : ""} />
    {
      error && <div className='text-danger'>{error}</div>
    }
  </Form.Group>
}

const useForm = ()=>{

  const [values, setValues] = useState({
    fullname:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const [errors, setErrors] = useState({});

  const handleInput = (event)=>{
    setValues({
      ...values,
      [event.target.name]:event.target.value}
    );
  }

  const reset = () => {
    setValues({
      fullname:"",
      email:"",
      password:"",
      confirmPassword:""
    })
    setErrors({});
  }

  const validateForm = ()=> {
    const newErrors = {};
    setErrors({});

    if (values.fullname.length < 3) {
        newErrors.fullname = 'Too short';
    }

    if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        newErrors.email='Not a valid email'
    }

    if (values.password.length < 8 ) {
        newErrors.password='Too short'
    } else if (values.password !== values.confirmPassword) {
        newErrors.confirmPassword="Password doesn't match"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  return [values, handleInput, reset, validateForm, errors]
}