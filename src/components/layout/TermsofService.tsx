import Link from 'next/link'
import React from 'react'

export default function TermsofService() {
    return (
        <div>
            <main className="pt-[20px] md:pt-[40px] pb-[40px] md:pb-[80px] lg:pb-[120px] px-[20px] md:px-[30px] lg:px-[50px] relative">
                <div className="absolute top-[45%] md:top-[40%]  left-0 bg-[#EFB24D]/40 md:bg-[#EFB24D]/30 blur-[150px] -z-10  w-[108px] h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
                <div className="absolute left-0  top-[-100px] bg-[#EFB24D29] blur-[724px] -z-10 h-[30%] w-full"></div>
                <div className="pointer-events-none absolute bottom-[2%] md:bottom-[10%] right-0 bg-[#75DA5B]/40  md:bg-[#75DA5B]/20 blur-[150px] z-0  w-[108px] h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>

                <div className="container  ">
                    <div className='text-[16px] font-normal text-[#6C6C6C]'>
                        <div className=" mb-[30px] md:mb-[47px]">
                            <h1 className=" text-black dark:text-[#F7F8F8] font-semibold text-[32px] md:text-[40px] lg:text-[50px] leading-normal md:leading-[66px]">
                                Terms and Conditions
                            </h1>
                            <div className="mt-3  ">
                                <p className='mb-[11px]'> Last updated: 12 November 2025</p>

                                <p>  Welcome to Fcookie (“we,” “our,” or “us”).</p>

                                <p className='mb-[20px] max-w-[650px] '> These Terms and Conditions (“Terms”) govern your access to and use of www.fcookie.com
                                    and related services (collectively, the “Platform”).
                                </p>
                                <p>
                                    By accessing or using Fcookie, you agree to be bound by these Terms. If you do not agree, please do not use our services.
                                </p>
                            </div>
                        </div>

                        <article className="space-y-[30px] md:space-y-[47px]">

                            <section className="">
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Overview of Our Service</h2>
                                <p>
                                    Fcookie is a digital marketplace where users can browse, buy, and sell collectible or digital products.
                                </p>
                                <p>
                                    We aim to provide a clean, secure, and transparent platform for creators, collectors, and enthusiasts.
                                </p>



                            </section>


                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Eligibility</h2>
                                <p className="text-black dark:text-white mb-[11px]">
                                    To use Fcookie, you must:
                                </p>
                                <ul className="list-disc list-inside space-y-4">
                                    <li>  Be at least 18 years old (or the age of majority in your country).</li>
                                    <li> Have the legal capacity to enter into binding agreements.</li>
                                    <li>Use the Platform in compliance with all applicable laws and regulations.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Account Registration</h2>
                                <ul className="list-disc list-inside space-y-4">
                                    <li> You must create an account to access certain features (such as buying, selling, or spinning to win).</li>
                                    <li> You are responsible for maintaining the confidentiality of your account credentials.</li>
                                    <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                                    <li>Fcookie reserves the right to suspend or terminate any account that violates these Terms.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Marketplace Transactions</h2>

                                <div className='space-y-[20px]'>
                                    <div>
                                        <h3 className=" mb-2">
                                            (a) Buying and Selling
                                        </h3>

                                        <ul className="list-disc list-inside  space-y-4 pl-1">
                                            <li> Buyers agree to pay the listed price and any applicable fees or taxes.</li>
                                            <li>Sellers agree that all listings are accurate, lawful, and owned by them.</li>
                                            <li>Fcookie acts as a facilitator — we are not the direct seller unless explicitly stated.</li>
                                        </ul>
                                    </div>


                                    <div>
                                        <h3 className=" mb-2">
                                            (b) Payments
                                        </h3>

                                        <ul className="list-disc list-inside space-y-4 pl-1">
                                            <li>Payments are processed securely through third-party providers such as Stripe or PayPal.</li>
                                            <li>Fcookie does not store full payment details.</li>
                                            <li>Refunds and cancellations are subject to our Refund Policy (available separately).</li>
                                        </ul>
                                    </div>


                                    <div>
                                        <h3 className="mb-2">
                                            (c) Fees
                                        </h3>

                                        <p>
                                            Fcookie may charge transaction or service fees, which will be disclosed prior to checkout.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Spin-to-Win / Rewards Features</h2>
                                <p className="text-black dark:text-white mb-[11px]">
                                    From time to time, Fcookie may offer promotional features like “Spin to Win” or reward-based interactions.
                                </p>
                                <ul className="list-disc list-inside space-y-4">
                                    <li> Participation is optional.</li>
                                    <li> Rewards, credits, or prizes cannot be exchanged for cash unless specified.</li>
                                    <li> Fcookie reserves the right to modify or end these promotions at any time.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">User Responsibilities</h2>
                                <p className="text-black dark:text-white mb-[11px]">
                                    When using Fcookie, you agree not to:
                                </p>
                                <ul className="list-disc list-inside space-y-4">
                                    <li>  Post or sell illegal, counterfeit, or prohibited items</li>
                                    <li>Misuse the Platform for fraud or phishing</li>
                                    <li>Interfere with or disrupt system operations</li>
                                    <li>Use bots, scrapers, or automated access tools without consent</li>
                                    <li>Violate intellectual property or privacy rights of others</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Intellectual Property</h2>
                                <ul className="list-disc list-inside space-y-4">
                                    <li> All trademarks, logos, and content on Fcookie are owned by or licensed to us.</li>
                                    <li> You may not copy, reproduce, or distribute any part of the Platform without our written permission.</li>
                                    <li> User-generated content remains the property of the creator but grants Fcookie a limited, non-exclusive license to display and promote it within the Platform.</li>
                                </ul>
                            </section>
                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Third-Party Links and Services</h2>
                                <p>
                                    Our site may include links to third-party websites or tools.
                                </p>
                                <p>
                                    Fcookie is not responsible for the content, privacy, or practices of these external services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Limitation of Liability</h2>
                                <p className="text-black dark:text-white mb-[11px]">
                                    To the fullest extent permitted by law, Fcookie and its team shall not be liable for:
                                </p>
                                <ul className="list-disc list-inside space-y-4">
                                    <li> Any indirect, incidental, or consequential damages</li>
                                    <li>Loss of profits, data, or reputation arising from your use of the Platform</li>
                                    <li>Service interruptions, delays, or data breaches beyond our control</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Disclaimer of Warranties</h2>
                                <p>
                                    The Platform is provided “as is” and “as available.”
                                </p>
                                <p>
                                    We make no warranties regarding the accuracy, availability, or reliability of any content or listings.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Termination</h2>
                                <p className='max-w-[1120px]'>
                                    We reserve the right to suspend or terminate your access to Fcookie at any time, without notice, if we believe you’ve violated these Terms or engaged in harmful conduct.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Indemnification</h2>
                                <p className='max-w-[1120px]'>
                                    You agree to indemnify and hold Fcookie, its affiliates, and team members harmless from any claims, damages, or losses resulting from your use of the Platform or violation of these Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Governing Law</h2>
                                <p>
                                    These Terms are governed by and construed in accordance with the laws of California, USA, without regard to its conflict of law principles.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-black dark:text-white mb-[4px]">Changes to These Terms</h2>
                                <p>
                                    We may update these Terms periodically. The updated version will always be posted here with a revised “Last updated” date.
                                </p>
                                <p>
                                    Your continued use of Fcookie after any changes constitutes acceptance of the new Terms.
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
        </div>
    )
}
