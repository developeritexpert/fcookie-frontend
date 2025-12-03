import Link from 'next/link'
import React from 'react'


export default function PrivacyPolicy() {
    return (
        <main className="pt-[20px] md:pt-[40px] pb-[40px] md:pb-[80px] lg:pb-[120px] px-[20px] md:px-[30px] lg:px-[50px] relative">
            <div className="absolute top-[30%] sm:top-[35%]  md:top-[40%] lg:top-[50%] left-0  bg-[#EFB24D]/30 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
            <div className="absolute left-0  top-[-100px] bg-[#EFB24D29] blur-[724px] -z-10 h-[30%] w-full"></div>
            <div className="pointer-events-none absolute bottom-[-2%] md:bottom-[-5%] right-0 bg-[#75DA5B]/40  md:bg-[#75DA5B]/20 blur-[150px] z-0  w-[108px] h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>

            <div className="container  ">
                <div className='text-[16px] font-normal text-[#6C6C6C]'>
                    <div className=" mb-[30px] md:mb-[47px]">
                        <h1 className=" text-black dark:text-[#F7F8F8] font-semibold text-[32px] md:text-[40px] lg:text-[50px] leading-normal md:leading-[66px]">
                            Privacy Policy
                        </h1>
                        <div className="mt-3  ">
                            <p className='mb-[11px]'> Last updated: 12 November 2025</p>

                            <p>  Welcome to Fcookie (“we,” “our,” or “us”).</p>

                            <p className='mb-[20px] max-w-[970px] '> our privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you visit www.fcookie.com
                                or use our services.
                            </p>
                            <p>
                                By accessing or using Fcookie, you agree to the terms of this Privacy Policy.
                            </p>
                        </div>
                    </div>


                    <article className="space-y-[30px] md:space-y-[47px]">

                        <section className="">
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Information We Collect</h2>
                            <p className="text-black dark:text-[white] mb-[11px]">
                                We collect information to provide a better experience for our users and sellers. This includes:
                            </p>

                            <div className='space-y-[20px]'>
                                <div>
                                    <h3 className=" mb-2">
                                        (a) Information You Provide
                                    </h3>

                                    <ul className="list-disc list-inside  space-y-4 pl-1">
                                        <li>Account details (name, email address, password)</li>
                                        <li>Profile or seller information</li>
                                        <li>Payment details (processed securely by third-party payment providers)</li>
                                        <li>Messages or communications sent to our support team</li>
                                    </ul>
                                </div>


                                <div>
                                    <h3 className=" mb-2">
                                        (b) Information We Collect Automatically
                                    </h3>

                                    <ul className="list-disc list-inside space-y-4 pl-1">
                                        <li>Device information (browser type, IP address, operating system)</li>
                                        <li>Usage data (pages visited, time spent, clicks, referral links)</li>
                                        <li>Cookies and tracking technologies (for analytics, performance, personalization)</li>
                                    </ul>
                                </div>


                                <div>
                                    <h3 className="mb-2">
                                        (c) Third-Party Data
                                    </h3>

                                    <p className="">
                                        If you sign up or log in using Google, Apple, or another platform,
                                        we receive limited profile data to authenticate your account.
                                    </p>
                                </div>
                            </div>

                        </section>


                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">How We Use Your Information</h2>
                            <p className="text-black dark:text-white mb-[11px]">
                                We use your data to:
                            </p>
                            <ul className="list-disc list-inside space-y-4">
                                <li>Create and manage your Fcookie account</li>
                                <li>Process transactions and enable marketplace features</li>
                                <li>Provide customer support</li>
                                <li>Improve site performance and user experience</li>
                                <li>Send important updates, offers, or newsletters (you can opt out anytime)</li>
                                <li>Detect and prevent fraud or misuse of our services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Cookies & Tracking Technologies</h2>
                            <p className="text-black dark:text-white mb-[11px]">
                                We use cookies and similar tools to:
                            </p>
                            <ul className="list-disc list-inside space-y-4">
                                <li>Keep you signed in</li>
                                <li>Remember preferences and improve site performance</li>
                                <li>Analyze traffic using tools like Google Analytics</li>
                                <li>Personalize your marketplace experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">How We Share Information</h2>
                            <p className="text-black dark:text-white mb-[11px]">
                                We do not sell your personal data.
                            </p>
                            <ul className="list-disc list-inside space-y-4">
                                <li>Process payments (via trusted processors like Stripe or PayPal)</li>
                                <li>Deliver products or services</li>
                                <li>Comply with legal obligations</li>
                                <li>Improve our platform with verified third-party tools (analytics, hosting, etc.)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Data Retention</h2>
                            <p className="max-w-[1180px]">
                                We retain your information for as long as your account is active or as needed to provide our services.
                                You can request deletion of your account and data at any time by contacting privacy@fcookie.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[24px] font-semibold text-black dark:text-white mb-[4px]">Your Rights</h2>
                            <p className="text-black dark:text-white mb-[11px]">
                                Depending on your region, you may have the right to:
                            </p>
                            <ul className="list-disc list-inside space-y-4">
                                <li>Access, correct, or delete your personal data</li>
                                <li>  Withdraw consent for data processing</li>
                                <li> Request a copy of your stored information</li>
                            </ul>
                        </section>


                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Data Security</h2>
                            <p className="max-w-[1180px]">
                                We use encryption (HTTPS), secure storage, and limited access controls to protect your information. However,
                                no online service is completely risk-free, and we encourage you to protect your account credentials.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">International Users</h2>
                            <p className="max-w-[1180px]">
                                Fcookie is operated globally. By using our services, you consent to the transfer of your information to servers that may be located outside your country of residence.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Updates to This Policy</h2>
                            <p className="max-w-[1180px]">
                                We may update this Privacy Policy periodically. The “Last Updated” date above indicates the most recent revision. Any material changes will be communicated via email or in-app notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[20px] sm:text-[22px] md:text-[24px]font-semibold text-black dark:text-white mb-[4px]">Contact Us</h2>
                            <p className="text-black dark:text-white mb-[7px]">
                                If you have questions or concerns about this Privacy Policy, please contact:
                            </p>
                            <p className="text-[#EFB24D]  mb-[7px]">Fcookie Privacy Team</p>

                            <p className="mb-[11px]">
                                <Link href="mailto:info@fcookie.com">
                                    info@fcookie.com
                                </Link>
                            </p>

                            <p><Link href="tel:+12064389789">
                                +1 (206) 438-9789
                            </Link>
                            </p>
                        </section>


                    </article>
                </div>
            </div>
        </main>
    )
}
