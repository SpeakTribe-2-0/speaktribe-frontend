import React from 'react'
import logo from '../../assets/speakTribe-logo.png'

const SignupPage = () => {
  return (
    <div className='width flex justify-center items-center'>
      <div className=' bg-amber-300'>
        <div>
          <div>
            <img src={logo} alt="" className='w-[200px]'/>
          </div>
          <div>
            <p>Create Your Speak Tribe Account</p>
          </div>
        </div>
        <div>
          <form>
            <div className=' flex flex-col gap-2'>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' className=' border-2'/>
            </div>

            <div className=' flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input type="text" id='email' className=' border-2'/>
            </div>

            <div className=' flex flex-col gap-2'>
            <label htmlFor="password">Password</label>
            <input type="text" id='password' className=' border-2'/>
            </div>

            <div className=' flex flex-col gap-2'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" id='confirmPassword' className=' border-2'/>
            </div>

          </form>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default SignupPage