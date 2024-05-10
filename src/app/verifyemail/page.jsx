'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from '@/app/components/nav';

export default function VerifyEmail() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const email = JSON.parse(localStorage.getItem('email'));
  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  // aku ingin memanggil api

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    if (verified) {
      router.push('/login');
    }
  }, [verified, router]);

  return (
    <>
      <Navigation />
      <main className={'bg-gray1 flex h-[calc(100vh-4.125rem)] justify-center'}>
        <div className={'flex flex-col mt-24 max-w-[32rem]'}>
          <h1 className={'font-semibold text-lg pb-4'}>
            Verify Your Email to Get Started
          </h1>
          <div
            className={'container-sm bg-white p-4 text-secondary rounded-md'}
          >
            <p className={'text-xs'}>
              A confirmation link has been sent to your email address{' '}
              <span className={'font-bold'}>{email}</span>. Click the link to
              verify your account and unlock full access.{' '}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
