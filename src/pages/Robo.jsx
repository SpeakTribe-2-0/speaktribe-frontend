import React from 'react'
import robot from '../assets/robot.png'
import { useNavigate } from 'react-router-dom'

const Robo = () => {
  const navigate = useNavigate()
  return (
    <div className='right-20 max-mobile:right-5 bottom-[70px] fixed z-[60] text-center flex items-center flex-col'>
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
          .ai-chat-text {
            background: linear-gradient(135deg, #009688, #4db6ac);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 150, 136, 0.2);
            filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8));
          }
          .chat-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 150, 136, 0.2);
            box-shadow: 0 4px 20px rgba(0, 150, 136, 0.15);
          }
        `}
      </style>

      <img
        src={robot}
        alt=""
        onClick={() => navigate('/chat')}
        className="w-10 bounce cursor-pointer max-mobile:w-8 hover:scale-110 transition-transform duration-300"
      />
      <div className="chat-container px-3 py-1 rounded-full mt-2">
        <p onClick={() => navigate('/chat')} className="ai-chat-text cursor-pointer max-mobile:text-[11px] text-[13px]">
          Chat with AI
        </p>
      </div>
    </div>
  )
}

export default Robo