import { useEffect, useState } from "react";
import USERIMG from "./IMAGES/image-amyrobson.png";
import axios from "axios";

function Local(props) {
  const { fetchLocalItems, sendDataToBackend } = props;
  const [userCommand, setUserCommand] = useState({ content: "", replies: [] });
  const [loading, setLoading] = useState(false);

  const fetchDataFromDatabase = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://commentbox-server-2.onrender.com/");
      const fetchedData = response.data;  

      
      localStorage.setItem("command", JSON.stringify(fetchedData));

      
      setUserCommand(fetchedData);
      sendDataToBackend(fetchedData); 
    } catch (err) {
      console.error("Error fetching data from database: ", err);
    } finally {
      setLoading(false);
      fetchLocalItems(); 
    }
  };

  
  useEffect(() => {
    fetchDataFromDatabase(); 
  }, []); 

 
  const send = async () => {
    const inputField = document.getElementById("Usercommand");
    if (inputField.value !== "") {
      
      await  sendDataToBackend(userCommand);

      
      await fetchDataFromDatabase();

      
      setUserCommand({ content: "", replies: [] });
      inputField.value = ""; 
    } else {
      alert("Please enter a value");
    }
  };

  const handlechange = (event) => {
    const { value } = event.target;
    setUserCommand({ content: value, replies: [] });
  };

  return (
    <div id="chat">
      <img src={USERIMG} alt="User" />
      <textarea
        id="Usercommand"
        type="text"
        onChange={handlechange}
        placeholder="Add a command ....."
      />
      <button onClick={send}>Send</button>
      {loading && <p className="kkl">Loading...</p>} 
    </div>
  );
}

export default Local;
