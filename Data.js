import { useEffect, useState } from "react";
import Local from "./Local"; 
import REPLYIMG from "./IMAGES/icon-reply.svg";
import USERIMG from "./IMAGES/image-amyrobson.png";
import DELETEIMG from "./IMAGES/icon-delete.svg";
import EDITIMG from "./IMAGES/icon-edit.svg";
import ur from "./IMAGES/image-juliusomo.png";
import { User2 } from "./USER2"; 
import axios from "axios";

function DATA(props) {
  const { sendDataToBackend } = props;
  const [localArray, setLocalArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [editContent, setEditContent] = useState(""); 
  const [replies, setReplies] = useState({ firstreplies: "@amyrobson" }); 
  const [showReplies, setShowReplies] = useState([]); 

  
  useEffect(() => {
    fetchLocalItems();
  }, []);

  const fetchLocalItems = async () => {
    try {
      const response = await axios.get("https://commentbox-server-2.onrender.com/");
      setLocalArray(response.data); 
      localStorage.setItem("command", JSON.stringify(response.data)); 
    } catch (err) {
      console.error("Error fetching data from database: ", err);
    }
  };


  const deleteCommand = async (id) => {
    try {
      await axios.delete("https://commentbox-server-2.onrender.com/", { data: { id } });
      const updatedArray = localArray.filter((item) => item._id !== id);
      setLocalArray(updatedArray); 
    } catch (error) {
      console.error("Error deleting command", error);
    }
  };

  const handleEdit = (i) => {
    setEditIndex(i); 
    setEditContent(localArray[i].content); 
  };

  const saveEdit = async (i) => {
    try {
      const updatedContent = editContent;
      await axios.put("https://commentbox-server-2.onrender.com/", { id: localArray[i]._id, content: updatedContent });
      const updatedArray = [...localArray];
      updatedArray[i].content = updatedContent; 
      setLocalArray(updatedArray); 
      setEditIndex(null); 
    } catch (error) {
      console.error("Error updating content", error);
    }
  };

  const handleReplyInput = (event) => {
    const { value } = event.target;
    setReplies({ firstreplies: value });
  };

  const addReply = async (i) => {
    try {
      const commandId = localArray[i]._id;
      await axios.patch("https://commentbox-server-2.onrender.com/", { id: commandId, firstreplies: replies.firstreplies });
      const updatedArray = [...localArray];
      updatedArray[i].replies.push({ firstreplies: replies.firstreplies }); 
      setLocalArray(updatedArray); 
      setReplies({ firstreplies: "@amyrobson" }); 
    } catch (error) {
      console.error("Error adding reply", error);
    }
  };

  const toggleReplies = (index) => {
    setShowReplies((prevState) => {
      const updatedShowReplies = [...prevState];
      updatedShowReplies[index] = !updatedShowReplies[index];
      return updatedShowReplies;
    });
  };

  const row = localArray.map((e, i) => {
    const re = e?.replies?.map((reply, idx) => (
      <div key={idx} className="seconduser">
        <div>{User2(idx)}</div>
        <p>{reply.firstreplies}</p>
      </div>
    ));

    return (
      <div
        className="user"
        key={i}
        onMouseEnter={() => {
          const fle = document.getElementsByClassName("crud")[i];
          const fle2 = document.getElementsByClassName("crud2")[i];
          fle.style.display = "block";
          fle2.style.display = "block";
        }}
        onMouseLeave={() => {
          const fle = document.getElementsByClassName("crud")[i];
          const fle2 = document.getElementsByClassName("crud2")[i];
          fle.style.display = "none";
          fle2.style.display = "none";
        }}
      >
        <div className="commandHead">
          <div className="COMMANDIB">
            <img src={USERIMG} alt="user" />
            <b>amyrobson</b>
            <small>1 month ago</small>
          </div>
          <div className="REPLYAREA">
            <img
              src={DELETEIMG}
              onClick={() => deleteCommand(e._id)}
              className="crud"
              alt="delete"
            />
            <img
              src={EDITIMG}
              onClick={() => handleEdit(i)}
              className="crud2"
              alt="edit"
            />
            <img
              src={REPLYIMG}
              alt="Reply"
              onClick={() => toggleReplies(i)}
            />
            <b className="b" onClick={() => toggleReplies(i)}>
              Reply
            </b>
          </div>
        </div>
        <div className="commandpara">
        
          {editIndex === i ? (
            <div className="editpara">
              <textarea
                className="par"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)} 
              />
              <button onClick={() => saveEdit(i)}>Save</button>
            </div>
          ) : (
            <p className="para">{e.content}</p> 
          )}
        </div>
        <div className="replylist" style={{ display: showReplies[i] ? "block" : "none" }}>
          <small className="span">Replies</small>
          <div className="replylist1">{re}</div>
          <div className="reply">
            <img className="ur" src={ur} alt="User Avatar" />
            <input
              type="text"
              onChange={handleReplyInput}
              value={replies.firstreplies}
              className="jvl"
            />
            <button className="true" onClick={() => addReply(i)}>
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {row}
      <Local fetchLocalItems={fetchLocalItems} sendDataToBackend={sendDataToBackend} />
    </>
  );
}

export default DATA;
