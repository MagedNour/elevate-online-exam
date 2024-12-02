'use client'
import React, { useState } from 'react'
import StaticAuthContent from '@/app/_components/StaticAuthContent/StaticAuthContent';
import Link from 'next/link';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';



const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Please Enter a valid Email"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
    })

    const SubmitForm = async (values: { email: string, password: string }) => {
        setApiError(null)
        setIsLoading(true)
        const res = await signIn("credentials", { email: values.email, password: values.password, callbackUrl: "/", redirect: false });
        if (res?.error) {
            console.log(res.error);

            setApiError(res.error);
            setIsLoading(false)
        }else if (res?.ok) {
            // Success case: Manually redirect to the home page
            window.location.href = res.url || "/";
        }

    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: SubmitForm
    })

    return (
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
                        <form className='flex flex-col gap-6' onSubmit={formik.handleSubmit}>
                            <h3 className='text-2xl font-bold'>Sign in</h3>

                            {/* Inputs Group*/}
                            <div className="inputs-group flex flex-col gap-6">
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
                                <div className='relative'>
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
                            </div>
                            {apiError && <p className="text-red-500 mt-2">{apiError}</p>}

                            <Link href={"/forgotYourPassword"} className="text-xs text-[#4461F2] text-end">Recover Password ?</Link>
                            <button type='submit' className='bg-[#4461F2] text-white p-2 rounded-[20px]'>Sign in {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                        </form>
                        <div className=" flex gap-3 items-center justify-center mt-8">
                            <div className="divider h-[1px] bg-[#E7E7E7] w-28"></div>
                            <p> or Continue with</p>
                            <div className="divider  h-[1px] bg-[#E7E7E7] w-28"></div>
                        </div>
                        <div className="social-login flex gap-4 justify-center mt-5">

                            <div onClick={() => signIn("google", { callbackUrl: "/" })} className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer">
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
    )
}
