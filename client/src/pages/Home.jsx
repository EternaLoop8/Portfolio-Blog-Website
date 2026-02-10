import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Logo from "../assets/Logo.png";
import Login from '../components/Login.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

const Home = () => {
  return (
    <div className='bg-black text-white'>
      <div className="fixed top-6 right-14 z-50 flex items-center gap-4 ">
        <ThemeToggle />
        </div>
      <Login />
      <Navbar />
      <section className='min-h-screen flex flex-col items-center justify-center text-center px-6'>
        
        <p className='text-sm tracking-widest text-slate-400 mb-4'>
          Writer — Soumya Mishra
        </p>

        <h1 className='text-4xl md:6xl font-bold leading-tight mb-10'>
          EternaLoop:
          <br />
          My Coding Journey
        </h1>

        <img src={Logo} alt="Logo" className='w-48 h-auto' />

      </section>

      <section className='bg-white text-black py-20 px-6 flex flex-col lg:flex-row items-start gap-8'>
        <img 
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4" 
          alt="coding workspace"
          className='rounded-lg shadow-xl w-full lg:w-1/2 h-auto object-cover' 
          />
        
        <div className='w-full lg:w-1/2'>
            <h2 className='text-4xl font-bold mb-4'>About</h2>

            <h3 className='text-xl font-semibold text-slate-700 mb-4'>EternaLoop: My Coding Journey
              <br />
              <span className='font-light text-sm text-gray-500'>Growing Through Code & Curiosity</span>
            </h3>

           <p className='text-slate-700 leading-relaxed mb-4'>
              Hi, I'm Soumya Mishra, a passionate Computer Science student 
              with a strong curiosity for technolgy, problem-solving and
              continuous learning.
            </p>

            <p className='text-slate-700 leading-relaxed'>
              I started this website as a space to document my learning 
              journey, share my approach and detailed solution for solving 
              Competitive Programming questions and showcase the Projects 
              that I have built.
            </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home