/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.trsing().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    ocupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }); 
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined: "span 4" },
                            }}
                            >
                                {isRegister && (
                                    <>
                                        <TextField
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={
                                                Boolean(touched.firstName) && Boolean(errors.firstName)
                                            }
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField 
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="firstName"
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Location"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.location}
                                            name="location"
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Occupation"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.occupation}
                                            name="occupation"
                                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                            helperText={touched.occupation && errors.occupation}
                                            sx={{ gridColumn: "span 4" }}
                                            />
                                        <Box
                                            gridColumn="span4"
                                            border={`1px solid ${palette.neutral.medium}`}
                                            borderRadius="5px"
                                            p="1rem"
                                            >
                                                <Dropzone
                                                    acceptedFiles=".jpg,.jpeg,.png"
                                                    multiple={false}
                                                    onDrop={(AcceptedFiles) =>
                                                        setFieldValue("picture", acceptedFiles[0])
                                                    }
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": {cursor: "pointer" } }}
                                                            >
                                                                <input {...getInputProps()} />
                                                                {!values.picture ?  (
                                                                    <p>Add Picture Here</p>
                                                                ) : (
                                                                    <FlexBetween>
                                                                        <Typography>{values.pictures.name}</Typography>
                                                                        <EditOutlinedIcon />
                                                                    </FlexBetween>
                                                                )}
                                                            </Box>
                                                        )}
                                                    </Dropzone>
                                            </Box>
                                     </>
                                )}

                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="firstName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                            </Box>
                    </form>
                )}
            </Formik>
    )
}