import Image from 'next/image';
import Button from '@/app/components/button';
import Link from 'next/link';

export default function Navigation({ isLoggedIn }) {
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
                {!isLoggedIn && (
                    <>
                        <Link href={"/login"}>
                            <Button text="Login" variant="btn-noStyle" />
                        </Link>
                        <Link href={"/register"}>
                            <Button text="Sign Up" variant="btn-primary" />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}