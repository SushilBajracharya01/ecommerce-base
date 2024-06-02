import Logo from '@/components/Logo'
import React from 'react'

export default function TermsAndConditionsPage() {
    return (
        <div className='pt-12 pb-12 px-8'>
                <Logo />
            <header className='py-8'>
                <h1 className='text-4xl font-semibold text-gray-800'>Terms and Conditions</h1>
            </header>
            <div className='text-gray-600 max-w-[800px]'>
                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>1. Introduction</h2>
                    <p>Welcome to LionHearts, a test demo site for showcasing clothing items. By accessing this website, you agree to comply with and be bound by the following terms and conditions.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>2. Use of the Site</h2>
                    <p>This site is for demonstration purposes only and does not involve actual product sales or payments. You may browse the site, view products, and interact with the features provided.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>3. Product Information</h2>
                    <p>The product information displayed on this site is for demonstration purposes only. The prices listed are not valid for actual purchases.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>4. Intellectual Property</h2>
                    <p>All content on this site, including but not limited to images, text, logos, and graphics, is the property of LionHearts and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without permission.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>5. Privacy Policy</h2>
                    <p>Our privacy policy outlines how we collect, use, and protect your personal information. Since this is a test demo site, no personal information is collected or stored.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>6. Disclaimer</h2>
                    <p>This site is a test demo and does not involve actual product sales. LionHearts makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the site for any purpose.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>7. Limitation of Liability</h2>
                    <p>LionHearts shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the site, even if LionHearts has been advised of the possibility of such damages.</p>
                </div>

                <div className="mb-10">
                    <h2 className='text-xl mb-2 font-semibold text-gray-700'>8. Changes to Terms</h2>
                    <p>LionHearts reserves the right to update or modify these terms and conditions at any time without prior notice. Your continued use of the site after any changes indicates your acceptance of the modified terms.</p>
                </div>
            </div>
        </div>
    )
}
