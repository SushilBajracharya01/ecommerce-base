import Logo from "@/components/Logo";

export default function PrivacyPoliciesPage() {
    return (
        <div className='pt-12 pb-12 px-8'>
                <Logo />
            <header className='py-8'>
                <h1 className='text-4xl font-semibold text-gray-800'>Privacy Policy</h1>
            </header>
            <div className='text-gray-600 max-w-[800px]'>
                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>1. Information Collection and Use</h2>
                    <p>When you sign in to LionHearts using your Gmail account, we collect and store your email address, name, and profile image provided by Google. This information is used for authentication purposes and to enhance your experience on the site.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>2. Use of Information</h2>
                    <p>Your email address is used for communication purposes, such as account-related notifications and updates. Your name and profile image are displayed on the site to personalize your experience.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>3. Information Sharing</h2>
                    <p>We do not share your personal information with third parties. Your email address, name, and profile image are stored securely and used only for the purposes stated in this policy.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>4. Data Security</h2>
                    <p>We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>5. Changes to Privacy Policy</h2>
                    <p>LionHearts reserves the right to update or modify this privacy policy at any time without prior notice. Your continued use of the site after any changes indicates your acceptance of the modified policy.</p>
                </div>
            </div>
        </div>
    );
}
