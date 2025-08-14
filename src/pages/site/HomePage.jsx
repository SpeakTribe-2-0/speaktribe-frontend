import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className=" ">
      <div className="   mx-auto ">
        <section className=" relative ">
          <div className="overflow-hidden">
            <video
              src="/united_nation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className=" w-full mx-auto object-cover h-[100vh]"
            />
          </div>
          <div className=" absolute bg-black/50 inset-0 z-10"></div>
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
            className="text-[70px] font-bold text-white
              bg-clip-text  max-tablet:text-[35px] max-mobile:text-[24px] mb-3 text-center absolute inset-0 z-20 flex pt-90 justify-center "
          >
            Welcome To SpeakTribe
          </motion.h1>
        </section>
        <p className=" bg-[#009688] py-10 text-center text-4xl my-7 text-white font-bold max-tablet:py-5 max-tablet:text-3xl max-mobile:text-2xl">
          Available Languages
        </p>
        <section className="width flex justify-around w-full max-tablet:flex-col mb-24">


          <div className=" w-[30%] max-tablet:w-[90%] mx-auto gap-4 flex flex-col shadow-2xl pb-5 max-tablet:mb-10">

            <div className="">
              <img
                src="./igboWoman.png"
                alt=""
                className=" w-[400px] max-tablet:w-full max-tablet:mx-auto"
              />
            </div>
            <div className="  flex flex-col gap-6 h-[320px] items-center justify-start px-5">
              <div>
                <p className=" text-2xl font-bold italic">Igbo </p>
              </div>
              <div className=" text-[12px] h-[200px]">
                <p className=" text-[18px] font-medium">Fun Facts</p>
                <p>
                  - Igbo is also a tonal language like Yoruba, but with two main
                  tones (high and low).
                </p>
                <p>
                  - The meaning of a word totally changes depending on the tone!
                </p>
                <ul className=" list-disc pl-7">
                  <li className=" font-medium">“Akwụkwọ” = book</li>
                  <li className=" font-medium">“Àkụ́kwọ́” = leaf</li>
                  <li className=" font-medium">“Àkụ̀” = wealth</li>
                </ul>
                <p>- So mastering tone = mastering meaning.</p>
              </div>



              <div className=" flex items-end">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className=" bg-[#009688] text-[13px] font-light py-2 px-5 hover:rounded-[30px] transition-all duration-300 ease-in-out hover:bg-[#388E3C] text-white rounded-[5px] max-mobile:text-[14px] "
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>

          <div className=" w-[30%] max-tablet:w-[90%] mx-auto  gap-4 flex flex-col shadow-2xl pb-5  max-tablet:mb-10">
            <div className="">
              <img
                src="./yorubaMan.png"
                alt=""
                className=" w-[400px] max-tablet:w-full max-tablet:mx-auto"
              />
            </div>

            <div className="flex flex-col gap-6 h-[320px] items-center justify-start px-5">
              <div>
                <p className=" text-2xl font-bold italic">Yoruba </p>
              </div>
              <div className=" text-[12px] h-[200px]">
                <p className=" text-[18px] font-medium">Fun Facts</p>
                <p>
                  - Yoruba is a tonal language with 3 tones: high, mid, and low.
                </p>
                <p>
                  - That means the same spelling can have different meanings
                  depending on how it's said!
                </p>
                <ul className=" list-disc pl-7">
                  <li className=" font-medium">“Òwò” = broom</li>
                  <li className=" font-medium">“Ówó” = money</li>
                  <li className=" font-medium">“Ọwọ́” = hand</li>
                </ul>
                <p>
                  - So you're not just learning words — you're learning how to sing
                  the language!
                </p>
              </div>
              <div className=" flex items-end">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className=" bg-[#009688] text-[13px] font-light py-2 px-5 hover:rounded-[30px] transition-all duration-300 ease-in-out hover:bg-[#388E3C] text-white rounded-[5px] max-mobile:text-[14px] "
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>

          <div className=" w-[30%] max-tablet:w-[90%] mx-auto gap-4 flex flex-col shadow-2xl pb-5">

            <div className="">
              <img
                src="./hausa.jpg"
                alt=""
                className=" w-[400px] max-tablet:w-full max-tablet:mx-auto"
              />
            </div>
            <div className=" flex flex-col gap-6 h-[320px] items-center justify-start px-5 ">
              <div>
                <p className=" text-2xl font-bold italic">Hausa</p>
              </div>
              <div className=" text-[12px] h-[200px]">
                <p className=" text-[18px] font-medium">Fun Facts</p>
                <p>- You Can Learn It With the Alphabet You Already Know</p>
                <p>
                  - Hausa is written in Latin script (just like English), called{" "}
                  <span className=" italic font-medium">Boko</span> easy for
                  beginners!
                </p>
                <ul className=" list-disc pl-7">
                  <li className=" font-medium"> Ina kwana = Good morning</li>
                  <li className=" font-medium">Sannu = Hello</li>
                </ul>
                <p>
                  - No new script to learn (unless you want to explore the Ajami
                  Arabic script too!).
                </p>
              </div>
              <div className=" flex items-end">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className=" bg-[#009688] text-[13px] font-light py-2 px-5 hover:rounded-[30px] transition-all duration-300 ease-in-out hover:bg-[#388E3C] text-white rounded-[5px] max-mobile:text-[14px] "
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;