
import { useNavigate } from 'react-router-dom'
import logo from '../assets/speakTribe-logo.png'


const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className=' flex justify-between items-center px-44 pb-6 pt-5 relative
    max-mobile:px-4 max-mobile:pt-4 max-tablet:px-20
    '>
      <div>
        <img src={logo} alt="" className='w-[80px] max-mobile:w-[50px] cursor-pointer' />
      </div>
      <div className=' flex justify-center items-center gap-7 cursor-pointer'>
        <p onClick={() => navigate('/login')} className=' border border-[#009688] w-[100px] py-1 rounded hover:bg-[#009688] hover:text-white transition-all duration-500 ease-in-out hover:font-semibold max-mobile:hidden text-center  text-[14px]'>Login</p>
        <p onClick={() => navigate('/signup')} className=' border border-[#009688] w-[100px] py-1 rounded hover:bg-[#009688] hover:text-white transition-all duration-500 ease-in-out hover:font-semibold  text-center  text-[14px]'>Sign Up</p>
      </div>
    </div>
  )
}

export default Navbar