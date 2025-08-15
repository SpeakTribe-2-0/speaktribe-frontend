

// import yoruba from '../../assets/yorubaImage.png'
// import igbo from '../../assets/igboImage.png'
// import hausa from '../../assets/hausaImage.png'
// import team from '../../assets/team.png'
// import bck from '../../assets/bckAbout.png'


// const About = () => {
//   return (
//     <section className=' width bg-white'>
//       <div className='py-10 px-18 flex flex-col gap-10
//       max-mobile:px-5
//       '>
//         <div className="@[480px]:px-4 @[480px]:py-3 rounded-xl overflow-hidden min-h-[218px] relative">

//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 "
//             style={{
//               backgroundImage: `
//             linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%),
//             url(${bck})
//           `,
//             }}
//           />

//           {/* Text Content */}
//           <div className=" z-10 flex p-4 bg-green-600">
//             <p className="bottom-5 absolute text-white tracking-light text-[28px] font-bold leading-tight">
//               About Speak Tribe
//             </p>
//           </div>
//         </div>
//         <div>
//           <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Our Mission</h1>
//           <p className='text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center w-[100%] mx-auto max-mobile:px-2'>At Speak Tribe, our mission is to bridge cultural gaps and foster understanding by providing accessible and engaging language learning resources for Nigerian
//             languages. We aim to empower individuals to connect with their heritage, communicate effectively, and appreciate the rich linguistic diversity of Nigeria.</p>
//         </div>
//         <div>
//           <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Languages we Offer</h1>
//           <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 w-[80%] mx-auto 

//           max-mobile:w-[100%] max-mobile:grid-cols-1">
//             <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
//               <div
//                 className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
//                 <img src={yoruba} alt="" className=' rounded-[5px]' />
//               </div>
//               <h2 className="text-[#181411] text-base font-bold leading-tight">Yoruba</h2>
//             </div>
//             <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
//               <div
//                 className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
//                 <img src={igbo} alt="" className=' rounded-[5px]' />
//               </div>
//               <h2 className="text-[#181411] text-base font-bold leading-tight">Igbo</h2>
//             </div>
//             <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
//               <div
//                 className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
//                 <img src={hausa} alt="" className=' rounded-[5px]' />
//               </div>
//               <h2 className="text-[#181411] text-base font-bold leading-tight">Hausa</h2>
//             </div>
//           </div>
//           <p className=' text-center italic text-[13px]'>more soon...</p>
//         </div>







//         <div>
//           <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Meet Our Team</h1>
//           <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 place-items-center">
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Chukwudi Okoro</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Igbo Language Expert</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3 text-center pb-3">
//               <div className="px-4">
//                 <div>
//                   <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-[#181411] text-base font-medium leading-normal">Fatima Hassan</p>
//                 <p className="text-[#8a7260] text-sm font-normal leading-normal">Hausa Language Expert</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div></div>
//       </div>
//     </section>
//   );
// };



// export default About




import React from 'react'
import SideBar from '../../components/SideBar'
import selection from '../../assets/Selection.png'
import selection2 from '../../assets/Selection (1).png'
import team from '../../assets/team.png'
import { IoMicOutline } from "react-icons/io5";
import { GiBookmarklet } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
const About = () => {
  const groupMembers = [
    { name: 'Ahmed Suleiman', position: 'Team-Leader', work: 'Full-Stack', image: team },
    { name: 'Hameedah Lawal', position: 'Ass-Team-Leader', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: team },
  ]

  const features1 = [
    { icon: <IoMicOutline size={25} color='#009688' />, heading: 'Speaking Practice', text: 'Engage in real-time conversations with AI tutors and native speakers. Improve your pronunciation and conversational flow.' },
    { icon: <GiBookmarklet size={25} color='#009688' />, heading: 'Interactive Lessons', text: 'Explore engaging lessons tailored to your proficiency, covering grammar, vocabulary, and cultural insights.' },
    { icon: <GiProgression size={25} color='#009688' />, heading: 'Progress Tracking', text: 'Monitor your language journey with detailed statistics, personalized insights, and clear milestones.' },
    { icon: <IoPeopleOutline size={25} color='#009688' />, heading: 'Community Support', text: 'Connect with a global tribe of language learners. Share tips, practice together, and grow your network.' },
  ]
  return (
    <div className=" flex gap-8 width
    max-tablet:gap-6 max-tablet:px-3
    ">
      <SideBar />
      <div>
        <div className=' flex flex-col gap-8'>
          <div className=' flex flex-col gap-8'>
            <p className=' text-[40px] leading-11 w-[60%] mx-auto font-semibold text-center
            max-tablet:w-full max-tablet:text-[35px]
            max-mobile:text-[30px] max-mobile:leading-8 max-mobile:my-5
            '>
              SpeakTribe: Your journey to Fluency Begins
            </p>
            <p className=' w-[65%] text-[#7a7a7a] mx-auto
            max-tablet:w-[90%]
            '>
              SpeakTribe is more than just a language app; it's a vibrant community dedicated to fostering cultural connection and linguistic mastery. We believe learning a new language opens up a new worlds, and we're here to guide you every step of the way.
            </p>
          </div>
          <div className=' flex justify-center w-[1000px] mx-auto
          max-tablet:w-[600px]
          max-mobile:w-[400px]
          '>
            <img src={selection} alt="" className=' rounded-2xl' />
          </div>
        </div>


        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

        <div className=' flex flex-col justify-center gap-6'>
          <p className=' font-semibold text-[27px] text-center
          max-tablet:text-[25px]
          '>
            Our Mission: Connecting Cultures Through Language
          </p>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>
            At SpeakTribe, our mission is to break down language barriers and build bridges between diverse cultures. We provide an immersive and intuitive platform where learners can master new languages while exploring the rich tapestry of global communities. Our unique, tribal-inspired approach emphasizes natural conversation, cultural context, and a supportive learning environment, ensuring that every user finds their voice and connects with others authentically.
          </p>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>
            We are committed to making language learning accessible, enjoyable, and effective for everyone, from beginners taking their first steps to advanced speakers refining their fluency. By blending cutting-edge technology with time-honored teaching methodologies, SpeakTribe empowers you to communicate with confidence and embrace the world's linguistic diversity.
          </p>
        </div>

        <hr className="my-16 border-[#9d9d9d33] border-1 rounded-4xl" />













        <div className=' flex-col flex gap-5'>
          <div className=' text-center'>
            <p className=' font-semibold text-[27px] text-center
          max-tablet:text-[25px]
          '>
              Unlock Your Potential with SpeakTribe's Core Features</p>
          </div>
          <div className=' grid grid-cols-2 w-[85%] mx-auto gap-5 max-tablet:grid-cols-1'>

            {features1.map((data, index) => (
              <div key={index} className='flex flex-col justify-center gap-3  border-[#9d9d9d33] border-1 rounded-xl h-[240px] py-2 px-5'>
                <div className=' bg-[#00968733] rounded-full p-3 w-fit'>
                  {data.icon}
                </div>
                <p className=' font-semibold'>{data.heading}</p>
                <p className=' text-[14px] text-[#7a7a7a]'>
                  {data.text}
                </p>
                <button className=' border-[#009688] border-1 rounded text-[13px] text-[#009688] p-1.5 w-fit'>Learn More</button>
              </div>
            ))}



          </div>
        </div>
        <hr className="my-16 border-[#9d9d9d33] border-1 rounded-4xl" />


        <div className=' text-center flex flex-col gap-8'>
          <p className=' font-semibold text-[27px] text-center'>The Story Behind SpeakTribe</p>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>SpeakTribe was born from a simple yet profound idea: that language learning should be an adventure, not a chore. Our founders, a group of passionate linguists and technologists, envisioned a platform that celebrated the journey of acquiring a new language, making it feel as natural and enriching as joining a new community.</p>
          <div className=' flex justify-center w-[1000px] mx-auto
          max-tablet:w-[600px]
          max-mobile:w-[400px]
          '>
            <img src={selection2} alt="" className=' rounded-2xl' />
          </div>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>Inspired by the resilience and diversity of global tribes, we crafted a learning ecosystem that prioritizes engagement, mutual support, and practical application. Every feature, from our AI conversation partners to our interactive cultural lessons, is designed to immerse you in the language and its context, fostering genuine understanding and lasting fluency. Join us, and become part of the SpeakTribe.</p>
        </div>

        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl hidden max-tablet:block" />


        <div className=' justify-center items-center border-[#9d9d9d33] border-1 rounded-2xl hidden max-tablet:block'>
          <h1 className='text-[#263238] tracking-light text-[24px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Meet Our Team</h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 place-items-center">

            {groupMembers.map((data, index) => (
              <div key={index} className="flex flex-col gap-3 text-center  justify-center items-center">
                <div className="px-4">
                  <div>
                    <img src={data.image} alt="" className="w-[90px] bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                  </div>
                </div>
                <div>
                  <p className="text-[#181411] text-[14px] text-base font-medium leading-normal">{data.name}</p>
                  <p className="text-[#009688]  text-sm font-semibold leading-normal">{data.work}</p>
                  <p className="text-[#8a7260] text-sm font-normal leading-normal">{data.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className=' justify-center items-center border-[#9d9d9d33] border-1 rounded-2xl max-tablet:hidden'>
        <h1 className='text-[#263238] tracking-light text-[24px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Meet Our Team</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 place-items-center">

          {groupMembers.map((data, index) => (
            <div key={index} className="flex flex-col gap-3 text-center  justify-center items-center">
              <div className="px-4">
                <div>
                  <img src={data.image} alt="" className="w-[90px] bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-[14px] text-base font-medium leading-normal">{data.name}</p>
                <p className="text-[#009688]  text-sm font-semibold leading-normal">{data.work}</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">{data.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default About