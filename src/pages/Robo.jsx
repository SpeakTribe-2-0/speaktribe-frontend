import React from 'react'
import robot from '../assets/robot.png'
import { useNavigate } from 'react-router-dom'

const Robo = () => {
  const navigate = useNavigate()
  return (
    <div className=' right-20 max-mobile:right-10 bottom-[70px] fixed z-[60] text-center flex items-center flex-col'>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }
          .bounce {
            animation: bounce 1s infinite;
          }
          .outlined-text {
            color: black;
            -webkit-text-stroke: 0.3px white; /* black border */
            font-weight: 900;
          }
        `}
      </style>

      <img
        src={robot}
        alt=""
        onClick={() => navigate('/chat')}
        className="w-10 bounce cursor-pointer max-mobile:w-6"
      />
      <p className="outlined-text max-mobile:text-[11px] text-[13px]">Chat with AI</p>
    </div>
  )
}

export default Robo
