import React, { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { Formik, ErrorMessage } from "formik"

import validate, {
  moreThanTree,
  lessThanHundred,
  validEmail,
  passwordRule,
} from "../../utils/validators"

import {
  FormContainer,
  StyledFormWrapper,
  StyledTitle,
  SignInButton,
  WhiteTitle,
  OverlayContainer,
  StyledOverlay,
  OverlayRightPanel,
  StyledP,
  StyledBody,
  ContentContainer,
} from "../Login Page/styles"

import InputField from "../../Components/InputField"
import Error from "../../Components/Error"

const CompanyRegistration = (props) => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const submit = (values) => {
     navigate("/")
    // dispatch({ type: "SEND_LOGIN_CREDENTIALS", value: { email, password } })
    // Здесь диспатчить экшен с имейлом и паролем, а в саге, которая слушает этот экшен, отсылать аксиос запрос
  }

  const signIn = () => {
    navigate("/login")
  }

  return (
    <StyledBody>
      <ContentContainer>
        <FormContainer>
          <StyledFormWrapper>
            <StyledTitle>Company Registration</StyledTitle>
            <Formik
              onSubmit={submit}
              initialValues={{
                companyName: "",
                email: "",
                password: "",
              }}
              validate={(values) =>
                validate([
                  {
                    name: "companyName",
                    value: values.companyName,
                    functions: [moreThanTree, lessThanHundred],
                  },
                  {
                    name: "email",
                    value: values.email,
                    functions: validEmail,
                  },
                  {
                    name: "password",
                    value: values.password,
                    functions: passwordRule,
                  },
                ])
              }
            >
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <InputField
                    name='companyName'
                    placeholder='Company Name'
                    type='text'
                    onChange={handleChange}
                  />
                  <ErrorMessage name='companyName' component={Error} />
                  <InputField
                    name='email'
                    placeholder='Email'
                    type='text'
                    onChange={handleChange}
                  />
                  <ErrorMessage name='email' component={Error} />

                  <InputField
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={handleChange}
                  />
                  <ErrorMessage name='password' component={Error} />
                  <SignInButton type='submit' >Sign Up</SignInButton>
                </form>
              )}
            </Formik>
          </StyledFormWrapper>
        </FormContainer>
        <OverlayContainer>
          <StyledOverlay>
            <OverlayRightPanel>
              <WhiteTitle>Welcome Back!</WhiteTitle>

              <StyledP>
                To keep connected with us please login with your personal info
              </StyledP>
              <SignInButton onClick={signIn}>Sign In</SignInButton>
            </OverlayRightPanel>
          </StyledOverlay>
        </OverlayContainer>
      </ContentContainer>
    </StyledBody>
  )
}

CompanyRegistration.propTypes = {}

export default CompanyRegistration