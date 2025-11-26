"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Prize {
  id: number;
  name: string;
  color: string;
  probability: number;
}

interface SpinWheelProps {
  spinPop: boolean;
  setSpinPop: (value: boolean) => void;
}

const SpinWheel = ({ spinPop, setSpinPop }: SpinWheelProps) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [result, setResult] = useState<Prize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const prizes: Prize[] = [
    { id: 1, name: '45', color: '#f71414', probability: 20 },
    { id: 2, name: '900', color: '#f71414', probability: 15 },
    { id: 3, name: '100', color: '#f71414', probability: 10 },
    { id: 4, name: '30', color: '#f71414', probability: 15 },
    { id: 5, name: '0', color: '#f71414', probability: 20 },
    { id: 6, name: '40', color: '#f71414', probability: 5 },
    { id: 7, name: '60', color: '#f71414', probability: 10 },
    { id: 8, name: '0', color: '#f71414', probability: 5 },
    { id: 9, name: '70', color: '#f71414', probability: 20 },
    { id: 10, name: '80', color: '#f71414', probability: 5 },
    { id: 11, name: '500', color: '#f71414', probability: 10 },
    { id: 12, name: '20', color: '#f71414', probability: 5 },
  ];

  const spinWheel = (): void => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const fullRotations = 5;
    const segmentAngle = 360 / prizes.length;

    const random = Math.random() * 100;
    let accumulatedProbability = 0;
    let selectedSegment = 0;

    for (let i = 0; i < prizes.length; i++) {
      accumulatedProbability += prizes[i].probability;
      if (random <= accumulatedProbability) {
        selectedSegment = i;
        break;
      }
    }

    const targetRotation = 360 * fullRotations + (segmentAngle * selectedSegment) + (segmentAngle / 2);

    const normalizedRotation = targetRotation % 360;
    const finalRotation = rotation + 360 * fullRotations + (360 - normalizedRotation);

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(prizes[selectedSegment]);
      setSpinning(false);
    }, 4000);
  };

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="h-screen py-12 px-4 flex justify-center items-center flex-col text-[#F7F8F8]">
      <div className="max-w-6xl mx-auto">
        {!result && (
          <div>
            <div className="text-center mb-12"> 
              <h1 className="text-5xl font-bold mb-1">
                Spin to Win Rewards
              </h1>
              <p className="text-lg max-w-[400px] mx-auto">
                Collect spins through your activities and take a chance at instant prizes.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center gap-[30px] relative">
              <div className="relative">
                <motion.div
                  ref={wheelRef}
                  className="w-80 h-80 bg-[#b0070d] rounded-full border-[7px] border-[#EFB24D] outline-[3px] relative overflow-hidden"
                  animate={{ rotate: rotation }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    duration: 4
                  }}
                  style={{ transformOrigin: 'center' }}
                >
                  {prizes.map((prize, index) => {
                    const rotationAngle = index * segmentAngle;
                    const textRotation = segmentAngle / 2;
                    
                    return (
                      <div
                        key={prize.id}
                        className="absolute w-full h-full"
                        style={{
                          transform: `rotate(${rotationAngle}deg)`,
                          transformOrigin: 'center',
                        }}
                      >
                        <div
                          className="absolute top-0 left-1/2 w-1/2 h-[55%] origin-bottom-left"
                          style={{
                            backgroundColor: 'transparent',
                          }}
                        >
                          <div
                            className="absolute top-[40px] left-4 transform -translate-y-1/2 font-bold text-sm whitespace-nowrap z-[999]"
                            style={{ 
                              transform: `rotate(${textRotation}deg)`,
                              color:'#fff',
                            }}
                          >
                            {prize.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-radial from-[#FF9D00] to-[#EFB24D] rounded-full z-10"></div>
                  
                  {prizes.map((_, index) => (
                    <div
                      key={`line-${index}`}
                      className="absolute top-0 left-1/2 w-0.5 h-1/2 origin-bottom z-5"
                      style={{
                        transform: `rotate(${index * segmentAngle}deg)`,
                        transformOrigin: 'bottom center',
                        background: 'linear-gradient(45deg, #FF9D00, #EFB24D)'
                      }}
                    />
                  ))}
                </motion.div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-12 z-20">
                  <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[24px] border-l-transparent border-r-transparent border-b-[#FF9D00] rotate-180"></div>
                </div>
              </div>
              <button
                onClick={spinWheel} 
                disabled={spinning}
                className={`self-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm ${
                  spinning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
              >
                {spinning ? 'Spinning...' : 'Spin the Wheel!'}
              </button>
            </div>
            <button 
              onClick={() => setSpinPop(!spinPop)}
              className='flex items-center gap-[5px] absolute top-[15px] backdrop-blur-[24px] bg-[#FFFFFF0D] right-[15px] border border-[#CCCCCC] rounded-[80px] font-medium text-xs py-[5px] px-[15px]'
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[10px]'>
                <path d="M1.31734 1.15313e-05L0 1.31735L10.682 11.9993L11.9993 10.682L1.31734 1.15313e-05Z" fill="white" />
                <path d="M4.20488e-05 10.682L1.31738 11.9993L11.9994 1.31733L10.682 -5.81971e-06L4.20488e-05 10.682Z" fill="white" />
              </svg>
              Close
            </button>
          </div>
        )}
      </div>
      <div className="w-full">
        {result && (
          <div className="relative max-w-[600px] mx-auto bg-[#171717] rounded-[14px] p-[50px] border border-[#343434] w-full flex flex-col items-center">
            <Image src="/icons/congrats.png" alt="Congratulations" width={150} height={150} className='w-[70px]' />
            <h3 className="text-[45px] font-bold text-transparent bg-clip-text mb-3 text-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94]">Congratulations! </h3>
            <p className="text-xl text-white font-medium">
              You won <span className="text-[#EFB24D] p-1 font-bold rounded-[7px] border border-[#EFB24D4D] bg-[#EFB24D1C]">{result.name}</span> credit.
            </p>
            <div className="flex items-center gap-[10px] mt-[40px]">
              <button className='bg-[#EFB24D] border border-[#EFB24D] rounded-[7px] px-[20px] py-[10px] text-black font-semibold text-sm'>Add to Wallet</button>
              <button 
                onClick={() => {
                  setResult(null);
                  setRotation(0);
                }} 
                className='border border-[#FFFFFF1C] rounded-[7px] px-[20px] py-[10px] font-semibold text-sm'
              >
                Spin Again
              </button>
            </div>
            <button 
              onClick={() => setSpinPop(!spinPop)}
              className='flex items-center gap-[5px] absolute top-[15px] backdrop-blur-[24px] bg-[#FFFFFF0D] right-[15px] border border-[#CCCCCC] rounded-[80px] font-medium text-xs py-[5px] px-[15px]'
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[10px]'>
                <path d="M1.31734 1.15313e-05L0 1.31735L10.682 11.9993L11.9993 10.682L1.31734 1.15313e-05Z" fill="white" />
                <path d="M4.20488e-05 10.682L1.31738 11.9993L11.9994 1.31733L10.682 -5.81971e-06L4.20488e-05 10.682Z" fill="white" />
              </svg>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;