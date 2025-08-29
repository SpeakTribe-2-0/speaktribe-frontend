import React from 'react'
import qrcode from '../../assets/obQqih.png'

const QrCode = () => {
  return (
    <div className=' flex flex-col gap-5 justify-center items-center mt-24'>
      <h1 className='text-[35px] font-semibold '>SpeakTribe</h1>
      <div className=' w-[38%] max-desktop:w-[50%]  max-tablet:w-[55%] max-mobile:w-[80%]'>
        <img src={qrcode} alt="" />
      </div>
    </div>
  )
}

export default QrCode