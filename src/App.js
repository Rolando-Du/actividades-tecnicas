

import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
} from "reactstrap";


function Formulario() {
  return (
    <Container className="p-5">
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              bio: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required"),
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string().min(8, "Password is too short").required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));

                setSubmitting(false);
              }, 250);
            }}
          >
            {(props) => {
              const {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* y otras más */
              } = props;
              return (
                <Form onSubmit={handleSubmit}>
                  <h1>Form</h1>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Harry Potter"
                      invalid={errors.name && touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      tag={Field}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="baryta_potter@collegeHogwarts.com"
                      invalid={errors.email && touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      tag={Field}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Provide a password"
                      invalid={errors.password && touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      tag={Field}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="bio">Text Area</Label>
                    <Input
                      type="textarea"
                      name="bio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      tag={Field}
                    />
                  </FormGroup>

                  <Button id="btn-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? `Loading` : `Submit`}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </Container>
  );
}
export default Formulario;