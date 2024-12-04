import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-[2vw] py-[5vw] px-[2vw] md:py-[8vw] md:px-[3vw]'>
                <p className='text-[5vw] md:text-[3.5vw] lg:text-[3vw] text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Make a Donation <br /> to Disabled Veterans
                </p>
                {/*<div className='flex flex-col md:flex-row items-center gap-[1.5vw] text-white text-[2.5vw] md:text-[1.5vw] font-light'>
                    <img className='w-[20vw] md:w-[15vw]' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our veterans, <br className='hidden sm:block' /> Donate hassle-free.</p>
                </div>*/}
                <a href='#speciality' className='flex items-center gap-[1.5vw] bg-white px-[4vw] py-[2vw] rounded-full text-[#595959] text-[2.5vw] md:text-[1.5vw] hover:scale-105 transition-all duration-300'>
                    Donate Online <img className='w-[3vw] md:w-[1.5vw]' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 flex items-center justify-center relative'>
                <img
                    className='w-full max-w-full max-h-full object-contain'
                    src={assets.header_img}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Header;