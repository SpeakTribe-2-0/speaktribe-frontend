import SideBar from '../../components/SideBar'
import selection from '../../assets/Selection.png'
import selection2 from '../../assets/Selection (1).png'
import team from '../../assets/team/user.png'
import { IoMicOutline } from "react-icons/io5";
import { GiBookmarklet } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";



import ahmed from '../../assets/team/ahmed.jpg'
import muhammed from '../../assets/team/muhammed.jpg'
import ariyo from '../../assets/team/Ariyo.jpg'
import olori from '../../assets/team/olori.jpg'
import adex from '../../assets/team/adex.jpg'
import bigbaby from '../../assets/team/bigbaby.jpg'
import Tomiwa from '../../assets/team/Tomiwa.jpg'
import john from '../../assets/team/john.jpg'
import blessing from '../../assets/team/blessing.jpg'
import mira from '../../assets/team/mira.jpg'
const About = () => {
  const groupMembers = [
    { name: 'Ahmed Suleiman', position: 'Team-Leader', work: 'Full-Stack', image: ahmed },
    { name: 'Hameedah Lawal', position: 'Ass-Team-Leader', work: 'Frontend', image: team },
    { name: 'Blessing Gbadamosi', position: 'Member', work: 'Frontend', image: blessing },
    { name: 'Michael John', position: 'Member', work: 'Frontend / Tester', image: john },
    { name: 'Barakat Akodu', position: 'Member', work: 'Product Manager', image: bigbaby },
    { name: 'Adeniyi Tomiwa', position: 'Member', work: 'Research', image: Tomiwa },
    { name: 'Muhammad Barkindo', position: 'Member', work: 'Research', image: muhammed },
    { name: 'Adeyemi Gbolahan', position: 'Member', work: 'Research', image: adex },
    { name: 'Adeoluwa Yetunde', position: 'Member', work: 'Research', image: olori },
    { name: 'Ariyo Blessing', position: 'Member', work: 'Research', image: ariyo },
    { name: 'Yaramola Blessing', position: 'Member', work: 'Research', image: mira},
  ]

  const features1 = [
    // { icon: <IoMicOutline size={25} color='#009688' />, heading: 'Speaking Practice', text: 'Engage in real-time conversations with AI tutors and native speakers. Improve your pronunciation and conversational flow.' },
    { icon: <GiBookmarklet size={25} color='#009688' />, heading: 'Interactive Lessons', text: 'Explore engaging lessons tailored to your proficiency, covering grammar, vocabulary, and cultural insights.' },
    { icon: <GiProgression size={25} color='#009688' />, heading: 'Progress Tracking', text: 'Monitor your language journey with detailed statistics, personalized insights, and clear milestones.' },
    { icon: <IoPeopleOutline size={25} color='#009688' />, heading: 'Community Support', text: 'Connect with a global tribe of language learners. Share tips, practice together, and grow your network.' },
  ]
  return (
    <div className=" flex gap-8 width
    max-tablet:gap-3 max-tablet:px-3 pt-22
    ">
      <SideBar />
      <div className=''>
        <div className=' flex flex-col gap-8'>
          <div className=' flex flex-col gap-8 max-mobile:gap-4'>
            <p className=' text-[40px] leading-11 w-[60%] mx-auto font-semibold text-center
            max-tablet:w-full max-tablet:text-[35px]
            max-mobile:text-[25px] max-mobile:leading-8 max-mobile:my-5
            '>
              SpeakTribe: Your journey to Fluency Begins
            </p>
            <p className=' w-[65%] text-[#7a7a7a] mx-auto
            max-tablet:w-[86%]
            '>
              SpeakTribe is more than a language app — it’s a community that connects cultures and helps you master new languages, opening doors to new worlds.
            </p>
          </div>
          <div className=' flex justify-center w-[900px] mx-auto
          max-tablet:w-[450px]
          max-mobile:w-[320px]
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
            At SpeakTribe, our mission is to break language barriers and connect cultures through an immersive, conversation-driven platform that makes learning authentic and engaging.
          </p>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>
            We make language learning accessible, enjoyable, and effective for all levels. With smart tech and proven methods, SpeakTribe empowers you to communicate confidently and embrace global diversity.
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
          '>SpeakTribe was founded on the belief that language learning should be an adventure—natural, fun, and enriching, not a chore.</p>
          <div className=' flex justify-center w-[900px] mx-auto
          max-tablet:w-[450px]
          max-mobile:w-[320px]
          '>
            <img src={selection2} alt="" className=' rounded-2xl' />
          </div>
          <p className=' text-[#7a7a7a] text-[14px] w-[70%] mx-auto
          max-tablet:w-[90%]
          '>SpeakTribe makes language learning fun and immersive through interactive games and cultural lessons, helping you achieve lasting fluency.</p>
        </div>

        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl hidden max-tablet:block" />


        <div className=' justify-center items-center border-[#9d9d9d33] border-1 rounded-2xl hidden max-tablet:block'>
          <h1 className='text-[#263238] tracking-light text-[24px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Meet Our Team</h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 place-items-center">

            {groupMembers.map((data, index) => (
              <div key={index} className="flex flex-col gap-3 text-center  justify-center items-center">
                <div className="px-4">
                  <div>
                    <img src={data.image} alt="" className="w-[90px] border-2 border-[#009688] bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
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
            <div key={index} className="flex flex-col gap-3 text-center justify-center items-center">
              <div className="px-4">
                <div className=''>
                  <img src={data.image} alt="" className="w-[90px] border-2 border-[#009688] bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
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