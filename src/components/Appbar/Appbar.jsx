import React from 'react'
import './appbar.scss'

function Appbar() {

   return (
      <nav className='navbar-app'>
         <div className='navbar-container'>
               <div className='navbar-left'>
                  <div className='item app'> <i className="fa fa-th" aria-hidden="true"></i></div>
                  <div className='item home'><i className="fa fa-home" aria-hidden="true"></i>Trello</div>
                  <div className='item new'>work space <i className="fa fa-angle-down" aria-hidden="true"></i></div>
                  <div className='item new'>Create new</div>
               </div>

               <div className='navbar-center'>
                  <i className="fa fa-trello" aria-hidden="true"></i>
                  <span>Yushaku</span>
               </div>

               <div className='navbar-right'>
                  <div className='search-container'>
                     <input
                        placeholder='search' 
                        className='searchInput'
                     ></input>
                     <i className="fa fa-search icon" aria-hidden="true"></i>
                  </div>

                  <div className='item app'> <i className="fa fa-info-circle" aria-hidden="true"></i></div>
                  <div className='item app'> <i className="fa fa-bell-o" aria-hidden="true"></i></div>
                  <div className='avatar'> <img src="https://i.pinimg.com/564x/5d/69/c5/5d69c5133c8a88d3247d4dec9f657d40.jpg" alt="" /> </div>
               </div>
         </div>
      </nav>
   )
}

export default Appbar