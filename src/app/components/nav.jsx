import Image from "next/image";
import Button from "@/app/components/button";

export default function Navigation() {
    return(
        <div className={'flex white justify-between px-12'}>
            <Image
                src="/logo.svg"
                alt="logo trello"
                width={90}
                height={18}
                priority
                className={'my-6'}
            />
            <div className={'my-auto'}>
                <Button text={'Login'} variant={'btn-noStyle'} />
                <Button text={'Sign Up'} variant={'btn-primary'} />
            </div>
        </div>
    );
}