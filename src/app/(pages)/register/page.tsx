'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google'
import StaticAuthContent from '../../_components/StaticAuthContent/StaticAuthContent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] })

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}



export default function Register() {

    const [successMessage, setSuccessMessage] = useState<string | null>()
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const validationSchema = Yup.object({
        username: Yup.string().required("userName is Required").min(3, "userName must be at least 3 char").max(20, "Length must be less than 20"),
        firstName: Yup.string().required("userName is Required").min(3, "userName must be at least 3 char").max(20, "Length must be less than 20"),
        lastName: Yup.string().required("userName is Required").min(3, "userName must be at least 3 char").max(20, "Length must be less than 20"),
        email: Yup.string().required("Email is required").email("Please Enter a valid Email"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")], "rePassword must match the Password"),
        phone: Yup.string().required("phone is required").matches(
            /^01[0125][0-9]{8}/,
            "please enter a valid phone number"
        )
    })

    const SubmitForm = async (values: User) => {
        setApiError(null)
        setSuccessMessage(null)
        setIsLoading(true)
        

        await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", values).then(({ data }) => {
            setSuccessMessage(data.message)
            console.log(data);
            router.push('/login')


        }).catch((err) => {
            console.log("err", err)
            setApiError(err.response.data.message)
            setIsLoading(false)
        })
        

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: SubmitForm
    })
    return (
        <>
            <div className="grid lg:grid-cols-2 h-screen">
                <div className="col-span-1">
                    <StaticAuthContent />
                </div>

                <div className={`col-span-1 px-10 py-10 ${inter.className}`}>
                    <div className="links flex justify-end gap-6 mb-10 lg:mb-0">
                        <select name="Lang" id="lang">
                            <option value="Eng">English</option>
                            <option value="Arb">Arabic</option>
                        </select>
                        <Link href={"/login"} className='text-[#4461F2] lg:text-xl font-bold md:py-[6px] md:px-[21px]'>Sign in</Link>
                        <Link href={"/register"} className='md:text-xl text-[#4461F2] border border-[#E0E0E9] rounded-[15px] md:py-[6px] md:px-[21px]'>Register</Link>
                    </div>
                    <div className="container flex justify-center items-center h-full">
                        <div className="form gap-8 w-full lg:w-[65%]">
                            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
                                <h3 className='text-2xl font-bold'>Sign up</h3>


                                {/* Inputs Group*/}
                                <div className="inputs-Group flex flex-col gap-4">

                                    {/* FirstName */}
                                    <input
                                        name='firstName'
                                        style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                        type="text"
                                        className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                            ${formik.touched.firstName &&
                                                formik.errors.firstName ?
                                                "border-red-500" : "border-[#F9F9F9]"}`}
                                        placeholder='First Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName &&
                                        <p className='text-red-500 mt-1'>{formik.errors.firstName}</p>
                                    }

                                    {/* LastName */}
                                    <input
                                        name='lastName'
                                        style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                        type="text"
                                        className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                            ${formik.touched.lastName &&
                                                formik.errors.lastName ?
                                                "border-red-500" : "border-[#F9F9F9]"}`}
                                        placeholder='Last Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName &&
                                        <p className='text-red-500 mt-1'>{formik.errors.lastName}</p>
                                    }

                                    {/* UserName */}
                                    <input
                                        name='username'
                                        style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                        type="text"
                                        className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                            ${formik.touched.username &&
                                                formik.errors.username ?
                                                "border-red-500" : "border-[#F9F9F9]"}`}
                                        placeholder='User Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.username && formik.errors.username &&
                                        <p className='text-red-500 mt-1'>{formik.errors.username}</p>
                                    }

                                    {/* Email Input */}
                                    <input
                                        name='email'
                                        style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                        type="email"
                                        className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                        ${formik.touched.email &&
                                                formik.errors.email ?
                                                "border-red-500" : "border-[#F9F9F9]"}`}
                                        placeholder='Enter Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email &&
                                        <p className='text-red-500 mt-1'>{formik.errors.email}</p>
                                    }

                                    {/* Phone */}
                                    <input
                                        name='phone'
                                        style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                        type="text"
                                        className='h-[55px] p-2 rounded-[9.91px] border-2  border-[#F9F9F9]'
                                        placeholder='Phone'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phone && formik.errors.phone &&
                                        <p className='text-red-500 mt-1'>{formik.errors.phone}</p>
                                    }

                                    {/* Password Input */}
                                    <div className='relative '>
                                        <input
                                            name="password"
                                            style={{ boxShadow: "0px 10.09px 20.18px 0px #4461F20D" }}
                                            type="password"
                                            className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                        ${formik.touched.password &&
                                                    formik.errors.password ?
                                                    "border-red-500" : "border-[#F9F9F9]"}`}
                                            placeholder="Password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                        />
                                        <Image width={20} height={20} src={'/password.png'} alt='password Strength' className='absolute right-3 top-1/2 transform -translate-y-1/2' />
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                                    )}

                                    {/* RePassword Input */}
                                    <div className='relative'>
                                        <input style={{ boxShadow: '0px 10.09px 20.18px 0px #4461F20D' }}
                                            name='rePassword'
                                            type="password"
                                            className={`h-[55px] p-2 rounded-[9.91px] border-2 w-full 
                                                ${formik.touched.password &&
                                                    formik.errors.password ?
                                                    "border-red-500" : "border-[#F9F9F9]"}`}
                                            placeholder='Confirm Password'
                                            onChange={formik.handleChange}
                                            value={formik.values.rePassword}
                                            onBlur={formik.handleBlur}
                                        />
                                        <Image width={20} height={20} src={'/password.png'} alt='password Strength' className='absolute right-3 top-1/2 transform -translate-y-1/2' />
                                    </div>
                                    {formik.touched.rePassword && formik.errors.rePassword && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</p>
                                    )}
                                </div>

                                <Link href={"/forgotYourPassword"} className="text-xs text-[#4461F2] text-end">Recover Password ?</Link>

                                <button type='submit' className='bg-[#4461F2] text-white p-2 rounded-[20px]'>Sign up {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>

                                {/* Success & Error Messages */}
                                {apiError && <p className='text-red-500 text-center'>{apiError}</p>}
                                {successMessage && <p className='text-green-500 text-center'>{successMessage}</p>}

                            </form>


                            <div className=" flex gap-3 items-center justify-center mt-8">
                                <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
                                <p> or Continue with</p>
                                <div className="divider  h-[1px] bg-[#E7E7E7] w-28"></div>
                            </div>


                            <div className="social-login flex gap-6 justify-center mt-5">

                                <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image width={20} height={20} alt="google" src={"/Logo Google.png"} />
                                </div>
                                <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image width={20} height={20} alt="google" src={"/Logo.png"} />
                                </div>
                                <div className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
                                    <Image width={20} height={20} alt="google" src={"/Vector.png"} />
                                </div>
                                <div
                                    className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer"
                                >
                                    <Image width={20} height={20} alt="google" src={"/Logo (1).png"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
