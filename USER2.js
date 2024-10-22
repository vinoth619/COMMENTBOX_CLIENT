 
 import REPLYIMG from "./IMAGES/icon-reply.svg";
 import  DELETEIMG from "./IMAGES/icon-delete.svg"
 import  EDITIMG from "./IMAGES/icon-edit.svg"
 import ur from "./IMAGES/image-juliusomo.png"
 import USERIMG from "./IMAGES/image-amyrobson.png";


 

 
 export const User2=((i,openinput)=>{




    return (
           <div className="seconduser">
            
        <div className="commandHead">
          <div className="COMMANDIB">
            <img src={ur}></img>
            <b>{"juliusomo"}</b>
            <small>{"1month ago"}</small>
          </div>
          {/* reply Area */}
          {/* <div className="REPLYAREA">
            <img src={DELETEIMG} 
             onClick={()=>{

             }}
            ></img>
            <img src={EDITIMG}
                 onClick={()=>{
                   
                  

               
                 }}
            
            ></img>
            <div>
            <img
              src={REPLYIMG}
              alt="Reply"
              onClick={() => {
              

                openinput(i)

              }}
            ></img>
            <b className="b"
              onClick={() => {
                openinput(i)

              }}
            >
             Reply
            </b>
            </div>
          </div> */}
         
        </div>
         </div>
         

      )
})


 export const User2Input=((i,secondReply,sre)=>{



   const inp=document.getElementsByClassName("jvl2")

   const handlechange=((event)=>{
    const {name,value}=event.target;
    console.log(value)
    inp[i].value=value
    
        
   })

 

    return(
        <>
       <div className="user2inp">

      
            {/* <div>{sre}</div> */}

            <img src={USERIMG} className="ur"></img>
           <input type="text" className="jvl2"  onChange={handlechange} ></input> 

           <button
            onClick={() => {
            
               secondReply(i, inp[i].value)
            
            }}
          >
          Reply
          </button>
        </div>
        </>
    )
})


export const Head=((i)=>{
  return(
    <div className="COMMANDIB">
    <img src={USERIMG}></img>
    <b>{"amyrobson"}</b>
    <small>{"1month ago"}</small>
</div>

  )
})
