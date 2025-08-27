import React from 'react'
import { motion } from 'framer-motion';
import { FaHeadSideCough } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBarV2';

const GetStarted = () => {
  const navigate = useNavigate()
  const aboutUs = [
    {
      h1: 'Our Mission',
      p: '“We’re building more than a language app — we’re building bridges to culture, identity, and pride.SpeakTribe exists to help Nigerians and Africans at large learn their native languages — not just to speak, but to belong, understand, and preserve what matters most: our roots.”'
    },
    {
      h1: 'Why we exist',
      p: "Many Nigerians struggle to speak their native language confidently — especially the younger generation.SpeakTribe bridges that gap with interactive tools that teach you how to speak, understand, and connect."
    },
    {
      h1: 'Our Audience',
      p: "Whether you’re a student, a traveler, or just someone reconnecting with your roots — SpeakTribe is for you."
    },
    {
      h1: 'Our Story',
      p: "SpeakTribe was born from a simple truth — our languages are fading, and we need to act now.As passionate Nigerians, we asked:“What if learning Yoruba, Igbo, or Hausa was as easy as chatting with a friend?”That’s how SpeakTribe began — a platform built with culture in mind and technology as the tool."
    },
    {
      h1: 'Our Vision',
      p: "We dream of an Africa where every child grows up fluent in their mother tongue.Where people speak with pride, preserve culture, and pass it on — confidently.With SpeakTribe, we’re starting with Yoruba, Igbo, and Hausa. But we won’t stop there."
    },
  ]

  return (
    <div>
      <Navbar />

      <div className=' flex justify-center rounded-2xl  width gap-10
          max-tablet:flex-col max-tablet:items-center
          '>
        <section className=' w-[40%] flex flex-col gap-5 items-end  justify-center 
      max-tablet:w-[70%]
      '>
          <h1 className=' text-[#263238] text-[40px] font-bold leading-[50px] text-center '>
            “Your Language. Your Power.
            <span className=' items-baseline inline-block text-[#009688]'><FaHeadSideCough /></span>”
          </h1>
          <p className=' items-center py-3 text-[20px] w-[100%] mx-auto text-[#263238] text-center font-medium'>
            Yoruba, Igbo, Hausa — SpeakTribe brings your heritage to life with audio learning, cultural phrases, and real conversations.
          </p>
          <div className=' flex justify-center gap-4 mx-auto w-full '>
            <button
              onClick={() => navigate('/signup')}
              className=' bg-[#009688] w-[40%] text-[14px] text-[#fff] py-2 rounded '> Begin Your Journey!</button>
            <button
              onClick={() => navigate('/login')}
              className=' bg-[#009688] w-[40%] text-[14px] text-[#fff] py-2 rounded '> Already have an account?</button>
          </div>
        </section>
        <section className='' >
          <img src="./tribe.jpg" alt="" className='w-[500px] p-5 rounded-tl-[100px]
        max-tablet:w-[600px]
        ' />

        </section>
      </div>

      <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />


      <div className=' mx-auto max-w-[1800px]'>
        <section>
          <motion.h1
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, 10],
            }}
            transition={{
              duration: 12,
              times: [0, 0.1, 0.9, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl font-bold text-center 
               bg-gradient-to-r from-[#C0CA33] via-[#009688] to-[#1B5E20]  
               bg-clip-text text-transparent max-tablet:text-[30px] max-mobile:text-[14px]"
          >
            Speak Proud. Speak Native. <span className=' italic text-5xl max-mobile:text-2xl'>SpeakTribe.</span>
          </motion.h1>

          <p className=' text-center w-[62%] font-medium mx-auto my-5 text-[20px] text-[#7a7a7a] max-tablet:w-[90%] max-mobile:text-[14px]'>Learn your language, live your culture. SpeakTribe helps you connect to your heritage in a bold, modern way — through fun lessons, quizzes, and real conversations in Yoruba, Igbo, and Hausa.</p>
        </section>
        <section className=' flex flex-wrap gap-9 items-center text-center justify-center my-10 max-tablet:flex-col'>
          {aboutUs.map((element, index) => (
            <div key={index} className=' w-[35%] h-[300px]  px-3 py-4 hover:scale-105 shadow-2xl duration-500 ease-in-out transition-all mb-4 max-tablet:w-[60%] max-mobile:w-[84%]'>
              <h1 className='  text-[30px] font-bold bg-white text-[#009688] flex items-center justify-center h-[30%] max-mobile:text-[20px]'>{element.h1}</h1>
              <p className=' text-[#7a7a7a] text-[15px] font-medium py-3 max-mobile:text-[13px]'>{element.p}</p>
            </div>
          ))}

        </section>

      </div>


      <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />



      <div className=' flex justify-center my-20 items-center gap-16 max-w-[1800px] mx-auto max-tablet:flex-col-reverse'>

        <section className=' w-[40%] max-tablet:w-[85%] max-tablet:mx-auto'>
          <h1 className=' text-[#263238] text-[40px] font-bold text-center mb-3 max-mobile:text-[30px]'>Languages to Explore....</h1>
          <p className=' text-[18px] font-serif text-[#7a7a7a] max-mobile:text-center max-mobile:text-[16px] '>Speak Tribe currently supports Yoruba, Igbo, and Hausa — three of Nigeria’s most widely spoken languages. Each course is designed to help you speak confidently in real-life situations, from simple greetings to everyday conversations. Whether you're learning for travel, work, or personal growth, you'll pick up useful words, phrases, and cultural tips that make communication easier.</p>
          <ul className=' flex justify-center mt-8 max-mobile:justify-center max-mobile:gap-3 gap-10'>
            <a href=""><li className=' bg-[#009688] text-[18px] font-light p-2 hover:bg-[#014942] text-white max-mobile:text-[12px] min-desktop:text-[23px] rounded-2xl w-[150px] max-mobile:w-[100px] text-center transition-all duration-500 ease-in-out'>Yorùbá</li></a>
            <a href=""><li className='  bg-[#009688] text-[18px] font-light py-2 hover:bg-[#014942] text-white max-mobile:text-[12px] min-desktop:text-[23px] rounded-2xl w-[150px] max-mobile:w-[100px] text-center transition-all duration-500 ease-in-out'>Igbo</li></a>
            <a href=""><li className='  bg-[#009688] text-[18px] font-light p-2 hover:bg-[#014942] text-white max-mobile:text-[12px] min-desktop:text-[23px] rounded-2xl w-[150px] max-mobile:w-[100px] text-center transition-all duration-500 ease-in-out'>Hausa</li></a>
          </ul>
        </section>
        <section>
          <img src="./language.png" alt="" className=' max-mobile:w-[300px]' />
        </section>

      </div>



      <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />



      <div className=" flex max-w-[1800px] mx-auto justify-center items-center gap-14 my-24 max-tablet:flex-col-reverse">
        <section>
          <img
            src="./last.jpg"
            alt=""
            className=" w-[500px] max-tablet:w-[700px] max-mobile:w-[360px] rounded-[40px]"
          />
        </section>
        <section className="max-w-[600px]">
          <div>
            <h1 className=" text-center text-6xl font-bold italic mb-4 text-[#009688] max-mobile:text-4xl">
              SpeakTribe
            </h1>
            <motion.h1
              animate={{
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, 10],
              }}
              transition={{
                duration: 12,
                times: [0, 0.1, 0.9, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[20px] font-bold
                   bg-gradient-to-r from-[#C0CA33] via-[#009688] to-[#1B5E20]  
                   bg-clip-text text-transparent max-tablet:text-[30px] max-mobile:text-[14px] mb-3 text-center max-mobile:text"
            >
              Speak Proud. Speak Native.{" "}
              <span className=" italic text-4xl max-mobile:text-[16px]">
                SpeakTribe.
              </span>
            </motion.h1>
            <p className=" text-center max-mobile:text-[15px] text-[#7a7a7a]">
              "At the heart of it all, what matters most is that we stay
              connected, united, and proud of our shared roots — and through
              language,
              <span className=" text-[#1B5E20] font-medium italic text-[20px]">
                SpeakTribe
              </span>{" "}
              makes that possible."
            </p>
          </div>
          <div className=" flex gap-4 mt-4 items-center max-tablet:justify-center">
            <button className="   bg-[#009688] text-[16px] font-light p-3 rounded-2xl transition-all duration-500 ease-in-out hover:bg-[#014942] text-white hover:rounded-[10px] max-mobile:text-[14px] min-desktop:text-[23px]">
              Get Started
            </button>
            <button className=" bg-[#009688] text-[17px] font-light p-3 rounded-2xl transition-all duration-500 ease-in-out hover:bg-[#014942] text-white hover:rounded-[10px] max-mobile:text-[14px] min-desktop:text-[23px] px-4">
              Sign Up
            </button>
          </div>
        </section>
      </div>

    </div>
  )
}

export default GetStarted