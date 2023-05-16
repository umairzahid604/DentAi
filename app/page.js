"use client"

import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <Navbar />

      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: "url(https://www.dropbox.com/s/1r09j0n1jctrxra/HeroImg.jpg?raw=1)" }}>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">DENT.AI studdy buddy </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">The first AI dental patient simulator you can have a chat with <br /> Master your endodontic diagnostic skills and bring your Patient communication to the next level!</p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link href="/practice" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Practice Now
              <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
            <a href="#how-to-use" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>
          </div>
        </div>
      </section>
      <section id='how-to-use' className='p-2 my-[100px] flex flex-col items-center'>
        <h3 className="mb-[100px] text-center text-4xl font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-6xl">How to Use DENT.AI </h3>
        <div className="boxWrapper flex flex-wrap	justify-center w-11/12 ">

          <div className="box p-2 m-2 w-full md:w-2/10 max-w-sm min-h-[130px]  ">
            <div className='num'>1</div>

            <p className="">Interact with your Patient like you would in real life. Ask a lot of qouestions to find out what the patients problem is.</p>
          </div>
          <div className="box p-2 m-2 w-full md:w-2/10 max-w-sm min-h-[130px]  ">
            <div className='num'>2</div>

            <p className="">If you have to, Perform clinical tests like this:</p>
            <p> Just say, what you are going to do and ask for the outcome</p>

            <p><b> "I am going to gently tap on your tooth, is this painful to you?"</b></p>
          </div>
          <div className="box p-2 m-2 w-full md:w-2/10 max-w-sm min-h-[130px]  ">
            <div className='num'>3</div>

            <p className="">If you need to see a clinical picture or a radiograph for your diagnosis, click on one of the labels Buttons. If there is no further Information, it is not necessarily needed to solve the case.</p>
          </div>
          <div className="box p-2 m-2 w-full md:w-2/10 max-w-sm min-h-[130px]  ">
            <div className='num'>4</div>
            <p className="">Once you are certain you got the right Diagnosis, tell it to the Patient and explain your treatment. He will have further questions for you to answer.</p>
          </div>
          <div className="box p-2 m-2 w-full md:w-2/10 max-w-sm min-h-[130px]  ">
            <div className='num'>5</div>
            <p className="">If your  Patient is okay for you to start your treatment, end the conversation by clicking on the Button:
              “End and Evaluate”.
              Next you will receive an evaluation of your Diagnosis, proposed treatment and your communication.</p>
          </div>
        </div>
      </section>

    <Footer/>

    </main>
  )
}
