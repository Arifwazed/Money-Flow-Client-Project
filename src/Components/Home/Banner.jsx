import React from 'react';
import gimg from '../../assets/google-play.png'
import bannerImg from '../../assets/banner.jpg'
import appleImg from '../../assets/apple (1).png'

const Banner = () => {
    return (
        <div className='border flex flex-col md:flex-row items-center h-70vh'>
            {/* left side */}
            <div className=' md:w-1/2 border-2 border-green-500 px-5 md:px-20 py-10 space-y-5 h-1/2'>
                <h1 className='text-5xl font-semibold'>Smarter Spending. Better Saving. Clearer Insights.</h1>
                <p className='text-xl font-semibold'>Record your daily income and expenses effortlessly. Monitor your progress and stay motivated to achieve your savings goals.</p>
                <div className='flex flex-col md:flex-row gap-5 w-2/3 mx-auto md:mx-0'>
                    <div className='btn bg-black text-white py-6 rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <img src={gimg} className='h-10' alt="" />
                            <div className='-space-y-1'>
                                <p>GET IT ON</p>
                                <p className='md:text-xl'>Google Play</p>
                            </div>
                        </div>
                    </div>
                    <div className='btn  bg-black text-white py-6 rounded-lg'>
                            <div className='flex items-center gap-3'>
                                <img src={appleImg} className='h-9' alt="" />
                                <div className='-space-y-1'>
                                    <p>Download on the</p>
                                    <p className='md:text-xl'>App Store</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className='md:w-1/2 border-2 border-red-500'>
                <img src={bannerImg} alt="" />
            </div>
        </div>
    );
};

export default Banner;