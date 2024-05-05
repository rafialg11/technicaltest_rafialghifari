'use client';
import Input from "@/app/components/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const passwordRules = [
    {
        label: "Contains at least 8 characters",
        regex: /.{8,}/,
    },
    {
        label: "Includes both uppercase and lowercase letters",
        regex: /^(?=.*[a-z])(?=.*[A-Z])/,
    },
    {
        label: "Contains numbers (e.g., 1, 2, 3)",
        regex: /\d/,
    },
    {
        label: "Includes symbols (e.g., @, #, $)",
        regex: /[!@#$%^&*]/,
    },
];

function validatePassword(password) {
    const errors = [];
    passwordRules.forEach((rule) => {
        if (!rule.regex.test(password)) {
            errors.push(rule.label);
        }
    });
    return errors;
}

export default function Register() {
    const [password, setPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const handlePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        if (passwordValue === '') {
            setPasswordErrors(passwordRules.map((rule) => rule.label));
            setShowErrors(false);
        } else {
            const errors = validatePassword(passwordValue);
            setPasswordErrors(errors);
            setShowErrors(true);
        }
    };

    return (
        <main className={'bg-gray1 flex min-h-[calc(100vh-4.125rem)] justify-center'}>
            <div className={'flex flex-col my-10 mx-auto max-w-96'}>
                <h1 className={'font-semibold text-lg pb-4'}>Sign up to Maia</h1>
                <form className={'flex flex-col container-sm novalidate'}>
                    <Input label={'Your Name'} placeholder={'Your Name'}/>
                    <Input label={'Email Address'} placeholder={'Email'} type={'email'}/>
                    <div className={'p-4 bg-cream text-xs text-gray-600 mb-2 rounded-md'}>Oops! It seems this email is
                        already in use. Please try another email address or sign in with your existing account
                    </div>
                    <Input label={'Create Password'} placeholder={'Password'} type={'password'} value={password} func={handlePassword}/>
                    {showErrors && (
                        <div className={'p-4 bg-cream text-xs text-gray-600 rounded-md space-y-2'}>
                            {passwordRules.map((rule, index) => (
                                <div key={index} className={'flex align-middle'}>
                                    {passwordErrors.includes(rule.label)? (
                                        <Image src={'/uncheck.svg'} alt={'uncheck'} width={12} height={12} className={'mr-2'}/>
                                    ) : (
                                        <Image src={'/check.svg'} alt={'check'} width={12} height={12} className={'mr-2'}/>
                                    )}
                                    <p>{rule.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <input type={'submit'} value={'Sign Up'}
                           className={'bg-primary text-white text-xs py-2 rounded-md mt-5 hover:bg-darker transition duration-300 cursor-pointer'}/>
                </form>
                <p className={'text-center text-xs mt-8 font-semibold'}>By creating an account you agree with our <span
                    className={'underline'}><a href={"https://www.youtube.com/watch?v=xvFZjo5PgG0"}>Terms of Service</a></span> and
                    <span className={'underline'}><a href={"https://www.youtube.com/watch?v=xvFZjo5PgG0"}> Privacy Policy</a></span></p>
                <p className={'text-center text-xs my-4 font-semibold'}>Already have an account? <span className={'underline'}><Link
                    href={"/login"}>Sign In</Link></span></p>
            </div>
        </main>
    );
}