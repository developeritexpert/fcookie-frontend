import React from 'react'

export default function ContactMap() {
    return (
        <div className=' pb-[30px] sm:pb-[40px] md:pb-[70px] lg:pb-[120px] px-[20px] md:px-[30px] lg:px-[50px] relative'>
            <div className="absolute top-[50px] lg:top-[100px] left-0  bg-[#EFB24D]/30 blur-[200px] -z-10  w-[108px] h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>

            <div className='container'>
                <div className="w-full flex justify-center">
                    <div className="relative w-full min-h-[300px] sm:min-h-[350px]  md:min-h-[420px]  lg:min-h-[640px] rounded-[15px] md:rounded-[30px] overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d54064492.283388086!2d38.00475409162596!3d34.74323761402321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1764677808405!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0 filter grayscale brightness-90 contrast-90"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
