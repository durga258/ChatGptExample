import * as Yup from 'yup'

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(8)
      .required("please enter password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain alphabitics, numbers, symbols and should be minimum 8 charecterstics"
      ),
    confirmPassword: Yup.string()
      .min(8)
      .oneOf([Yup.ref("password")], "Your password dont not match")
      .required("Confirm Password is required"),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(8).required('please enter password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    'Must contain alphabitics, numbers, symbols and should be minimum 8 charecterstics')
  })

  export {signupValidationSchema,loginValidationSchema}