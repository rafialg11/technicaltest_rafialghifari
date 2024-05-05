export default function Confirmation() {
    return (
        <main className={'bg-gray1 flex h-[calc(100vh-4.125rem)] justify-center'}>
            <div className={'flex flex-col mt-24 max-w-[32rem]'}>
                <h1 className={'font-semibold text-lg pb-4'}>Verify Your Email to Get Started</h1>
                <div className={'container-sm bg-white p-4 text-secondary rounded-md'}>
                    <p className={'text-xs'}>A confirmation link has been sent to your email address <span className={'font-bold'}>user-email@gmail.com</span>. Click the link to verify your account and unlock full access. </p>
                </div>
            </div>
        </main>
    );
}