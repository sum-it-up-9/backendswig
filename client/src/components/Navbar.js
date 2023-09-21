import React from 'react'

const Navbar = () => {
  return (
    <div className="grid grid-flow-col shadow-lg h-16 pt-2 sticky top-0 z-50 bg-white " >
        <div className="flex col-span-1">
          <img  
          className='h-8 pt-2 ml-5 cursor-pointer'  alt="menu" src="https://www.svgviewer.dev/static-svgs/33606/menu.svg"/>
          <img className='h-10 ml-3' alt="youtube-logo" src="https://learn-react-with-harshi-youtube-clone.netlify.app/static/media/logo.7c1042405c3290df267f.png"/>
        </div>

        <div className='pt-1 col-span-10 px-10'>
          <div>
            <input className='w-1/2 text-center h-9 border border-gray-400 rounded-l-full' type="text"    
            />
          <button className='h-9 border border-gray-400 px-2 rounded-r-full bg-gray-100'>Search</button>
           </div>
        </div>
        </div>
  );
}

export default Navbar;
