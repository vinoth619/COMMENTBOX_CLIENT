import CRUD from "./Crud";


function App( props) {
  const{sendDataToBackend}=props
  return (
    <div className="App">
    
     <CRUD
      sendDataToBackend={sendDataToBackend}
     
     />
    </div>
  );
}

export default App;
