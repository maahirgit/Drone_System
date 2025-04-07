import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Paper,
    Button,
    Typography,
    Box,
    FormControlLabel,
    Checkbox,
    Link,
    TextField
} from '@mui/material';
import drone2 from '../../../assets/auth/drone page.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const VENDOR_ROLE_ID = "67f2c3133a243990cb063089";
    const CUSTOMER_ROLE_ID = "67f2c2dc3a243990cb063087";
    const ADMIN_ROLE_ID = "67f39dc2d9cb921ebc26cbf5";

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/user/loginUser", data);

            if (response.status === 200) {
                const userId = response.data.data;

                // Fetch full user info with populated Role_id
                const userRes = await axios.get(`/user/getUser/${userId}`);
                const userData = userRes.data.data;
                
                localStorage.setItem("userId", userId);
                localStorage.setItem("userInfo", JSON.stringify(userData));
                
                toast.success("Login successful!", {
                    className: "toast-success",
                    autoClose: 500,
                    hideProgressBar: false,
                });
                
                console.log("userData:", userData);
                console.log("Role id ",userData.Role_id)

                setTimeout(() => {
                    if (userData.Role_id._id === VENDOR_ROLE_ID) {
                        navigate("/VendorDashboard");
                    } else if (userData.Role_id._id === CUSTOMER_ROLE_ID) {
                        navigate("/");
                    }else if (userData.Role_id._id === ADMIN_ROLE_ID){
                        navigate("/AdminDashboard")
                    } else {
                        toast.error("Invalid user role. Contact admin.");
                    }
                }, 500);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    toast.error("User not found. Please register first.", {
                        autoClose: 1500,
                        hideProgressBar: false,
                    });
                } else if (error.response.status === 401) {
                    toast.error("Incorrect password. Please try again.", {
                        autoClose: 1500,
                        hideProgressBar: false,
                    });
                } else {
                    toast.error("Login failed. Please try again later.", {
                        autoClose: 1500,
                        hideProgressBar: false,
                    });
                }
            } else {
                toast.error("Network error. Please check your connection.", {
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            }
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${drone2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Paper
                elevation={6}
                style={{
                    padding: 20,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    LOG IN TO FLY SYNC
                </Typography>

                <Typography variant="body2" style={{ margin: '20px 0' }}>
                    or
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        variant="outlined"
                        {...register("Email", { required: "Email is required" })}
                        error={!!errors.Email}
                        helperText={errors.Email?.message}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        {...register("Password", { required: "Password is required" })}
                        error={!!errors.Password}
                        helperText={errors.Password?.message}
                    />

                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1}>
                        <FormControlLabel
                            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                            label="Remember me"
                        />
                        <Link href="/ForgetPassword" variant="body2">
                            Forgot password?
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 10 }}
                    >
                        Log In
                    </Button>
                </form>

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />
            </Paper>
        </Box>
    );
};

export default Login;
