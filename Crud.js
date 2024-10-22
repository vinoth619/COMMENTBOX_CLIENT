import DATA from "./Data";
import { useEffect, useState } from "react";

function CRUD(props) {
const{sendDataToBackend}=props

  return (
    <>
      <DATA sendDataToBackend={sendDataToBackend}></DATA>
    </>
  );
}

export default CRUD;
