import React from "react";
import { VscDebugStart } from "react-icons/vsc";
import abstract from '../../assets/abstract-removebg-preview.png'
import SideBar from "../../components/SideBar";


const Dashboard = () => {
  const learningProgress = [
    { text: "Overall Progress", num: "75%" },
    { text: "Lesson Completed", num: "20/35" },
    { text: "Vocabulary Mastered", num: "25 Words" },
    { text: "Grammar Topics Covered", num: "10/15" },
  ];

  const lessons = [
    { heading: 'Mastering YORUBA Alphabets', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nemo!", image: abstract },
    { heading: 'Mastering YORUBA Alphabets', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nemo!", image: abstract },
    { heading: 'Mastering YORUBA Alphabets', text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nemo!", image: abstract },
  ]

  const segments = [
    { value: 25, color: "#14532d" }, // dark green
    { value: 25, color: "#d5cd40" }, // deep teal green
    { value: 25, color: "#1e3a8a" }, // blue

  ];

  const radius = 12; // smaller radius to make space for thick stroke
  const strokeWidth = 8; // thickness of the donut



  return (
    <div className=" flex gap-8 width
    max-tablet:gap-6
    ">
      <SideBar />
      <div className="">
        {/* Welcome Section */}
        <div className=" max-mobile:px-5 max-mobile:text-center max-mobile:my-5">
          <p className="text-3xl font-bold text-[#383726]">Welcome Back, Learner!</p>
          <p className="text-gray-600">
            Your language journey continues here. Let's make progress today.
          </p>
        </div>

        <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

        {/* Learning Progress Cards */}
        <div>
          <p className="font-semibold mb-4
          max-mobile:text-center max-mobile:text-xl
          ">Your Learning Progress</p>
          <div className="grid grid-cols-4 gap-6
          max-desktop:grid-cols-3
        max-tablet:grid-cols-2 max-tablet:gap-3
        max-mobile:grid-cols-1 max-mobile:place-items-center max-mobile:gap-10
        ">
            {learningProgress.map((data, index) => (
              <div
                key={index}
                className="w-[270px] h-[170px] rounded-2xl bg-[#F5FAF5] border-[#9d9d9d33] border-2 px-5 py-2 flex flex-col items-center justify-center gap-4"
              >
                <p className="font-semibold text-[17px]">{data.text}</p>
                <p className="font-bold text-3xl text-[#383726]">{data.num}</p>
                <div className="w-[80%] h-3 bg-[#009688] mx-auto rounded-full"></div>
              </div>
            ))}
          </div>

          <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

          {/* Donut Chart */}
          <div className="  py-3 px-5 rounded-2xl border-[#9d9d9d33] border-2">
            <p className="font-semibold mb-4
            max-mobile:text-center max-mobile:text-xl
            ">Language Proficiency Breakdown</p>
            <div className="flex flex-col justify-center items-center">
              <div>
                <svg width="150" height="200" viewBox="0 0 36 36">
                  {segments.map((seg, index) => {
                    const gap = 3; // small gap percentage between segments
                    const dashArray = `${seg.value - gap} ${100 - (seg.value - gap)}`;
                    const cumulative = segments
                      .slice(0, index)
                      .reduce((acc, cur) => acc + cur.value, 0);

                    return (
                      <circle
                        key={index}
                        r={radius}
                        cx="18"
                        cy="18"
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={dashArray}
                        strokeDashoffset={-cumulative}
                        strokeLinecap="butt"
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "50% 50%",
                        }}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className=" flex gap-3">
                <p>reading</p>
                <p>reading</p>
                <p>reading</p>
              </div>
            </div>
          </div>


          <hr className="my-8 border-[#9d9d9d33] border-1 rounded-4xl" />

          <div className="  py-3 px-5 flex flex-col gap-7 justify-center items-center">
            <div>
              <p className=" text-2xl font-semibold text-center">Featured Lessons for You</p>
            </div>
            <div className=" grid grid-cols-3 place-items-center gap-8
            max-desktop:grid-cols-2
            max-tablet:grid-cols-1
            ">



              {lessons.map((data, index) => (
                <div key={index} className=" w-[350px] rounded-2xl border-[#9d9d9d33] border-2 py-5 px-4 flex flex-col gap-3 ">
                  <div className=" mx-auto flex justify-center items-center">
                    <img src={data.image} alt="" className="w-[300px] bg-gray-100 rounded-2xl" />
                  </div>
                  <div className=" flex flex-col gap-1.5">
                    <p className=" font-semibold w-1/2">{data.heading}</p>
                    <p className="text-[11px]">{data.text}</p>
                    <button className=" flex items-center gap-3 w-full bg-[#009688] rounded text-white justify-center py-1.5">
                      <VscDebugStart />
                      Start Lesson
                    </button>
                  </div>
                </div>

              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
