'use client';
import Input from '../components/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/loadingAnimation.json';
import Navigation from '@/app/components/nav';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      router.push('/');
    } catch (error) {
      //error message if user is not verified
      console.log(error.response.data.error);
      if (error.response.data.error === 'User not verified') {
        setErrorMessage(
          'Oops! It seems this email is not verified. Please check your email and verify your account',
        );
        setShowErrorMessage(true);
      }
      //error message if username and password is wrong
      if (error.response && error.response.status === 404) {
        setErrorMessage(
          `The email and password you entered don't match. Please try again`,
        );
        setShowErrorMessage(true);
      } else {
        console.log('Login failed', error.message);
      }
      //error message if too many requests
      if (error.response && error.response.status === 429) {
        setErrorMessage('Too many requests. Please try again in 1 minutes.');
        setShowErrorMessage(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email.length, user.password.length]);

  return (
    <>
      <Navigation />
      <main
        className={'flex justify-center'}
      >
        <div className={'flex flex-col my-10 max-sm:my-4 mx-auto max-sm:mx-4 max-w-96 '}>
          <h1 className={'font-semibold text-lg pb-4'}>Welcome Back!</h1>
          <p className={'text-xs mb-8 font-medium'}>
            Sign in below to access your workspace and continue your projects. Let's pick up where you left off!
          </p>
          <div className={'flex flex-col container-sm'}>
            <Input
              label={'Email Address'}
              placeholder={'Email'}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              label={' Password'}
              placeholder={'Password'}
              type={'password'}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {showErrorMessage && (
              <div
                className={'p-4 bg-cream text-xs text-gray-600 mb-2 rounded-md'}
              >
                {errorMessage}
              </div>
            )}
            <button
              className={`bg-primary text-white text-xs py-2 rounded-md mt-5 min-h-[2.5rem] ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darker transition duration-300 cursor-pointer'}`}
              disabled={buttonDisabled || loading}
              onClick={onLogin}
              style={{ position: 'relative' }}
            >
              {loading ? (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80px',
                    height: '80px',
                  }}
                >
                  <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          <p className={'text-center text-xs my-4 font-semibold'}>
            Don't have an account? 
            <span className={'underline'}>
              <Link href={'/signup'}>Sign Up</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
