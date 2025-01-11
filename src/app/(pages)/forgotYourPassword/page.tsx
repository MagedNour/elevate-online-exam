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
import VerifyCode from '@/app/_components/verifyCode/VerifyCode';
import ResetPassword from '@/app/_components/resetPassword/ResetPassword';


const inter = Inter({ subsets: ['latin'] })

interface User {

    email: string;

}



export default function ForgotYourPassword() {

    const [successMessage, setSuccessMessage] = useState<string | null>()
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState("forgot")

    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Please Enter a valid Email"),
    })

    const SubmitForm = async (values: User) => {
        setApiError(null)
        setSuccessMessage(null)
        setIsLoading(true)
        localStorage.setItem("resetEmail", values.email);


        await axios.post("https://exam.elevateegy.com/api/v1/auth/forgotPassword", values).then(({ data }) => {
            setSuccessMessage(data.message)
            setIsLoading(false)
            setCurrentPage("verify")


        }).catch((err) => {
            console.log("err", err)
            setApiError(err.response.data.message)
            setIsLoading(false)
        })

    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: SubmitForm
    })

    const renderedContent = () => {
        if (currentPage === "forgot") {
            return (
                /* Forgot Password Form */
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
                                <h3 className='text-2xl font-bold'>Forgot your password?</h3>


                                {/* Inputs Group*/}
                                <div className="inputs-Group flex flex-col gap-4">

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
                                </div>

                                <Link href={"/forgotYourPassword"} className="text-xs text-[#4461F2] text-end">Recover Password ?</Link>

                                <button type='submit' className='bg-[#4461F2] text-white p-2 rounded-[20px]'>Sign in {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>

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
                </div>)
        } else if (currentPage === "verify") {
            return <VerifyCode setCurrentPage={setCurrentPage} />
        } else if (currentPage === "reset") {
            return <ResetPassword />
        }
    }
    return (
        <>
            <div className="grid lg:grid-cols-2 h-screen">

                {/* Static Content */}
                <div className="col-span-1">
                    <StaticAuthContent />
                </div>

                {/* Dynamic Content */}
                {renderedContent()}

            </div>
        </>
    )
}
