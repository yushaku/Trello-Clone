import React, { useState } from 'react'
import './boardbar.scss'

function Boardbar() {
   const [isStar, setIsStar] = useState(false);
   const handleSetStar = ()=>{
      setIsStar(!isStar)
   }
   return (
      <nav className='navbar-board'>
         <div className="container">
            <div className="left">
               <div className="boardName item">Board name</div>
               <div className="boardStar item" onClick={handleSetStar}>
                  {isStar ? 
                  <i className="fa fa-star-o" aria-hidden="true"></i> : 
                  <i className="fa fa-star" style={{color:'yellow'}} aria-hidden="true"></i> }
               </div>
               <div className="boardWorkSpace item">your work space</div>
            </div>
            <div className="center">
               <div className="avatar">
                  <img className='avatar-img ' index='1' src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="" />
               </div>
               <div className="avatar">
                  <img className='avatar-img ' index='2' src="https://i.pinimg.com/564x/a3/b9/52/a3b952d943dffc98eff5f07101f7fe6c.jpg" alt="" />
               </div>
               <div className="avatar">
                  <img className='avatar-img ' index='3' src="https://i.pinimg.com/564x/ca/0f/3e/ca0f3ea0b1c514730579732ce32be353.jpg" alt="" />
               </div>
               <div className="avatar">
                  <img className='avatar-img ' index='4' src="https://i.pinimg.com/564x/8d/67/1e/8d671e3ab4759f1eff523d7baa4524e2.jpg" alt="" />
               </div>
               <div className="avatar">
                  <img className='avatar-img ' index='5' src="https://i.pinimg.com/564x/b1/ff/76/b1ff7676d686df7e35e60907e859d1f7.jpg" alt="" />
               </div>
               <div className="addMem item">
                  <i className="fa fa-user-plus icon" aria-hidden="true"></i>
                  Invite
               </div>
            </div>
            <div className="right">
               <div className="boardAuto item">
                  <i className="fa fa-superpowers icon" aria-hidden="true"></i> set auto
               </div>
               <div className="privacy item">
                  <i className="fa fa-lock icon" aria-hidden="true"></i> private
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Boardbar