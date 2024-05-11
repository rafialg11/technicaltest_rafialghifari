'use client';
import Input from '@/app/components/input';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/loadingAnimation.json';
import Navigation from '@/app/components/nav';

//password rule validation
const passwordRules = [
  {
    label: 'Contains at least 8 characters',
    regex: /.{8,}/,
  },
  {
    label: 'Includes both uppercase and lowercase letters',
    regex: /^(?=.*[a-z])(?=.*[A-Z])/,
  },
  {
    label: 'Contains numbers (e.g., 1, 2, 3)',
    regex: /\d/,
  },
  {
    label: 'Includes symbols (e.g., @, #, $)',
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

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //password validation state
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPasswordErrors, setshowPasswordErrors] = useState(false);

  useEffect(() => {
    const allFilledAndValid =
      user.email.length > 0 &&
      passwordErrors.length < 1 &&
      user.username.length > 0 &&
      user.password.length >= 7;
    setButtonDisabled(!allFilledAndValid);
  }, [user.email, passwordErrors.length, user.username, user.password]);

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!isValidEmail && emailValue !== '') {
      setErrorMessage('Please enter a valid email address');
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
    setUser({ ...user, email: emailValue });
  };

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setUser({ ...user, password: passwordValue });
    if (passwordValue === '') {
      setPasswordErrors(passwordRules.map((rule) => rule.label));
      setshowPasswordErrors(false);
    } else {
      const errors = validatePassword(passwordValue);
      setPasswordErrors(errors);
      setshowPasswordErrors(true);
    }
  };

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      localStorage.setItem(
        'email',
        JSON.stringify(response.data.savedUser.email),
      );
      router.push('/verifyemail');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          'Oops! It seems this email is already in use. Please try another email address or sign in with your existing account',
        );
        setShowErrorMessage(true);
      } else {
        console.log('Signup failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main
        className={'bg-gray1 flex min-h-[calc(100vh-4.125rem)] justify-center'}
      >
        <div className={'flex flex-col my-10 mx-auto max-w-96'}>
          <h1 className={'font-semibold text-lg pb-4'}>Sign up to Maia</h1>
          <div className={'flex flex-col container-sm'}>
            <Input
              label={'Your Name'}
              placeholder={'Your Name'}
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Input
              label={'Email Address'}
              placeholder={'Email'}
              type={'email'}
              onChange={handleEmail}
            />
            {showErrorMessage && (
              <div
                className={'p-4 bg-cream text-xs text-gray-600 mb-2 rounded-md'}
              >
                {errorMessage}
              </div>
            )}
            <Input
              label={'Create Password'}
              placeholder={'Password'}
              type={'password'}
              onChange={handlePassword}
            />
            {showPasswordErrors && (
              <div
                className={
                  'p-4 bg-cream text-xs text-gray-600 rounded-md space-y-2'
                }
              >
                {passwordRules.map((rule, index) => (
                  <div key={index} className={'flex align-middle'}>
                    {passwordErrors.includes(rule.label) ? (
                      <Image
                        src={'/uncheck.svg'}
                        alt={'uncheck'}
                        width={12}
                        height={12}
                        className={'mr-2'}
                      />
                    ) : (
                      <Image
                        src={'/check.svg'}
                        alt={'check'}
                        width={12}
                        height={12}
                        className={'mr-2'}
                      />
                    )}
                    <p>{rule.label}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              className={`bg-primary text-white text-xs py-2 rounded-md mt-5 min-h-[2.5rem] ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darker transition duration-300 cursor-pointer'}`}
              disabled={buttonDisabled || loading}
              onClick={onSignUp}
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
                'Sign Up'
              )}
            </button>
          </div>
          <p className={'text-center text-xs mt-8 font-semibold'}>
            By creating an account you agree with our{' '}
            <span className={'underline'}>
              <a href={'https://www.youtube.com/watch?v=xvFZjo5PgG0'}>
                Terms of Service
              </a>
            </span>{' '}
            and
            <span className={'underline'}>
              <a href={'https://www.youtube.com/watch?v=xvFZjo5PgG0'}>
                {' '}
                Privacy Policy
              </a>
            </span>
          </p>
          <p className={'text-center text-xs my-4 font-semibold'}>
            Already have an account?{' '}
            <span className={'underline'}>
              <Link href={'/login'}>Sign In</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
