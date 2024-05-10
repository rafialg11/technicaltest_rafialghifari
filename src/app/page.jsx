'use client';
import Navigation from '@/app/components/nav';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={'bg-gray1 flex h-[calc(100vh-4.125rem)] justify-center'}>
        <div className={'flex flex-col mt-24 max-w-[32rem]'}>
          <h1 className={'font-semibold text-lg pb-4'}>Dashboard</h1>
          <div
            className={'container-sm bg-white p-4 text-secondary rounded-md'}
          >
            <p className={'text-xs'}>
              Welcome to your dashboard! Explore and manage your account
              effortlessly.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
