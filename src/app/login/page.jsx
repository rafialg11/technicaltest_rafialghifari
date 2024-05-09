'use client';
import Input from '../components/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <main
      className={'bg-gray1 flex min-h-[calc(100vh-4.125rem)] justify-center'}
    >
      <div className={'flex flex-col my-10 mx-auto max-w-96'}>
        <h1 className={'font-semibold text-lg pb-4'}>Welcome Back!</h1>
        <p className={'text-xs mb-8 font-medium'}>
          Sign in below to access your workspace and continue your projects.
          Let's pick up where you left off!
        </p>
        <form className={'flex flex-col container-sm'}>
          <Input label={'Email Address'} placeholder={'Email'} />
          <Input
            label={' Password'}
            placeholder={'Password'}
            type={'password'}
          />
          <input
            type={'submit'}
            value={'Sign Up'}
            className={
              'bg-primary text-white text-xs py-2 rounded mt-5 hover:bg-darker transition duration-300 cursor-pointer'
            }
          />
        </form>
        <p className={'text-center text-xs my-4 font-semibold'}>
          Don't have an account?{' '}
          <span className={'underline'}>
            <Link href={'/signup'}>Sign Up</Link>
          </span>
        </p>
      </div>
    </main>
  );
}
