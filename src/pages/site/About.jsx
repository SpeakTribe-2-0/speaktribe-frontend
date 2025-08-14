

import yoruba from '../../assets/yorubaImage.png'
import igbo from '../../assets/igboImage.png'
import hausa from '../../assets/hausaImage.png'
import team from '../../assets/team.png'
import bck from '../../assets/bckAbout.png'


const About = () => {
  return (
    <section className=' width bg-white'>
      <div className='py-10 px-18 flex flex-col gap-10
      max-mobile:px-5
      '>
        <div className="@[480px]:px-4 @[480px]:py-3 rounded-xl overflow-hidden min-h-[218px] relative">

          <div
            className="absolute inset-0 bg-cover bg-center z-0 "
            style={{
              backgroundImage: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%),
            url(${bck})
          `,
            }}
          />

          {/* Text Content */}
          <div className=" z-10 flex p-4 bg-green-600">
            <p className="bottom-5 absolute text-white tracking-light text-[28px] font-bold leading-tight">
              About Speak Tribe
            </p>
          </div>
        </div>
        <div>
          <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Our Mission</h1>
          <p className='text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center w-[100%] mx-auto max-mobile:px-2'>At Speak Tribe, our mission is to bridge cultural gaps and foster understanding by providing accessible and engaging language learning resources for Nigerian
            languages. We aim to empower individuals to connect with their heritage, communicate effectively, and appreciate the rich linguistic diversity of Nigeria.</p>
        </div>
        <div>
          <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Languages we Offer</h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 w-[80%] mx-auto 
          
          max-mobile:w-[100%] max-mobile:grid-cols-1">
            <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
                <img src={yoruba} alt="" className=' rounded-[5px]' />
              </div>
              <h2 className="text-[#181411] text-base font-bold leading-tight">Yoruba</h2>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
                <img src={igbo} alt="" className=' rounded-[5px]' />
              </div>
              <h2 className="text-[#181411] text-base font-bold leading-tight">Igbo</h2>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#e6dfdb] bg-white p-4 items-center">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0">
                <img src={hausa} alt="" className=' rounded-[5px]' />
              </div>
              <h2 className="text-[#181411] text-base font-bold leading-tight">Hausa</h2>
            </div>
          </div>
          <p className=' text-center italic text-[13px]'>more soon...</p>
        </div>







        <div>
          <h1 className='text-[#263238] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5'>Meet Our Team</h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 place-items-center">
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Aisha Adebayo</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Yoruba Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Chukwudi Okoro</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Igbo Language Expert</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div>
                  <img src={team} alt="" className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[#181411] text-base font-medium leading-normal">Fatima Hassan</p>
                <p className="text-[#8a7260] text-sm font-normal leading-normal">Hausa Language Expert</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};



export default About
