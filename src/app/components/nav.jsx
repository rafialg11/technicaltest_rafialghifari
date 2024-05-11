'use client';
import Image from 'next/image';
import Button from '@/app/components/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/api/users/getuser');
      if (response.data.data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsLoggedIn(false);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus()]);
  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
      setIsLoggedIn(false);
      localStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between px-12">
      <Image
        src="/logo.svg"
        alt="logo trello"
        width={90}
        height={18}
        priority
        className="my-6"
      />
      <div className="my-auto">
        {isLoggedIn ? (
          <Button text="Logout" variant="btn-primary" onClick={handleLogout} />
        ) : (
          <>
            <Link href={'/login'}>
              <Button text="Login" variant="btn-noStyle" />
            </Link>
            <Link href={'/signup'}>
              <Button text="Sign Up" variant="btn-primary" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
