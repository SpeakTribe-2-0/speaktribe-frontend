import React from 'react'
import { BsFillSpeakerFill } from "react-icons/bs";
import akara from '../assets/akara.png'
import { CiMicrophoneOn } from "react-icons/ci";
import { PiSneakerMoveFill } from "react-icons/pi";


const AlphabetBlock = () => {
    const alphabets = [
    "A", "B", "D", "E", "Ẹ", "F", "G", "GB", "H", "I", "J", "K",
    "L", "M", "N", "O", "Ọ", "P", "R", "S", "Ṣ", "T", "U", "W", "Y"
  ];
  return (
    <div className=' border-[#9d9d9d33] border-t-2'>
    <div className=' flex gap-3 width '>
      <div className=" border-[#9d9d9d33] border-r-2 rounded w-[200px] p-5 pr-1 pl-0 flex flex-col gap-5">
      {alphabets.map((letter, index) => (
        <div key={index} className=' bg-[#00968747] px-5 rounded-[6px] flex items-center gap-2 py-0.5'>
          <PiSneakerMoveFill />
          <p className=' '>{letter}</p>
        </div>
      ))}
      </div>
      <div className=' w-full  px-10'>
        <div>
          <p className=' text-7xl font-bold text-center text-[#009688] my-10'>A</p>
        </div>
        <div className='border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
          <p className=' font-semibold text-[17px]'>Pronunciation</p>
          <div className='flex items-center gap-3'>
            <div className=' rounded-full bg-[#0096874c] p-3'>
              <BsFillSpeakerFill size={20} color='#009688' />
            </div>
            <p className=' font-semibold text-xl'>/a/</p>
          </div>
        </div>


        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />


        <div className=' border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
          <p className=' font-semibold text-[17px]'>
            Example Words
          </p>
          <div className=' flex items-center'>
            <img src={akara} alt="" className='w-[60px]' />
            <div>
              <p>Àkàrà</p>
              <p className=' text-[#7a7a7a] text-[10px]'>Bean Cake</p>
            </div>
          </div>
          <div className=' flex items-center'>
            <img src={akara} alt="" className='w-[60px]' />
            <div>
              <p>Àkàrà</p>
              <p className=' text-[#7a7a7a] text-[10px]'>Bean Cake</p>
            </div>
          </div>
          <div className=' flex items-center'>
            <img src={akara} alt="" className='w-[60px]' />
            <div>
              <p>Àkàrà</p>
              <p className=' text-[#7a7a7a] text-[10px]'>Bean Cake</p>
            </div>
          </div>

        </div>



        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />


        <div className=' border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
          <div>
            <p className=' font-semibold text-[17px] mb-3'>Practice Exercises</p>
            <div className=' flex gap-2 items-center mb-2'>
              <CiMicrophoneOn size={20} color='#009688' />
              <p className=' text-[14px]'>Match the Sound</p>
            </div>
            <p className=' text-[#7a7a7a] text-[10px]'>Listen to the pronunciation and select the correct letter.</p>
            <div className=' flex gap-5 text-3xl font-semibold mt-4'>
              <div className=' w-full rounded-[8px] text-center py-2.5 text-[#009688] border-2 border-[#009688]'>A</div>
              <div className=' w-full rounded-[8px] text-center py-2.5 text-[#009688] border-2 border-[#009688]'>H</div>
              <div className=' w-full rounded-[8px] text-center py-2.5 text-[#009688] border-2 border-[#009688]'>B</div>
            </div>
            <p className=' text-[#009688] text-[12px] my-5'>Reset</p>
          </div>
          <div></div>
        </div>




        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />



        <div className=' border-[#9d9d9d33] border-1 rounded-xl px-6 py-5 flex flex-col gap-3'>
          <p className=' font-semibold text-[17px] mb-3'>Cultural Context</p>
          <p className=' text-[#7a7a7a] text-[12px]'>In Yoruba culture, the "A" sound is fundamental, often appearing in names and greetings, symbolizing foundation and origin.</p>
        </div>



      </div>
      </div>
    </div>
  )
}

export default AlphabetBlock