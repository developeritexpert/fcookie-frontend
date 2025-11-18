import Image from "next/image";
import Link from "next/link";

const footerData = {
    contact: {
        phone: "+1 (206) 438-9789",
        email: "info@fcookie.com",
    },
    quickLinks: [
        { title: "Home", link: "/" },
        { title: "About", link: "/about" },
        { title: "Marketplace", link: "/marketplace" },
    ],
    helpLinks: [
        { title: "Contact Us", link: "/contact" },
        { title: "Terms of Service", link: "/terms" },
        { title: "Privacy", link: "/privacy" },
    ],
    subscribe: {
        title: "Subscribe Us",
        description:
            "Subscribe for exclusive insights, trends, and tips delivered to your inbox.",
    },
    copyright: "© 2025 Fcookie. All Rights Reserved",
};

export default function Footer() {
    return (
        <footer className="bg-[#090702] text-white pt-[110px] pb-[44px]  border-t border-[#FFFFFF66]">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-[203px]">
                <div>
                    <Image
                        src="/img/header-logo.png"
                        alt="fcookie"
                        width={264}
                        height={71}
                        className="mb-4"
                    />
                    <div className="text-[20px] font-normal leading-[32px]  text-[#F7F8F8]">
                        <p>{footerData.contact.phone}</p>
                        <p>{footerData.contact.email}</p>
                    </div>
                </div>

                <div>
                    <h3 className="mb-[11px] font-semibold text-[24px] leading-[32px] text-white">Quick Links</h3>
                    <ul className="">
                        {footerData.quickLinks.map((item, i) => (
                            <li key={i}>
                                <Link href={item.link} className="text-[18px] leading-[45px] font-normal text-[#f7f8f8]">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-[11px] font-semibold text-[24px] leading-[32px] text-white">Help</h3>
                    <ul className="">
                        {footerData.helpLinks.map((item, i) => (
                            <li key={i}>
                                <Link href={item.link} className="text-[18px] leading-[45px] font-normal text-[#f7f8f8]">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


                <div>
                    <h3 className="mb-[7px] font-semibold">{footerData.subscribe.title}</h3>
                    <p className="text-sm text-[] mb-[20px]">
                        {footerData.subscribe.description}
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className="bg-white text-black px-4 py-2 rounded-md w-full"
                        />
                        <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

            </div>
            <div className="text-center text-gray-500 text-sm mt-10">
                {footerData.copyright}
            </div>
        </footer>
    );
}
