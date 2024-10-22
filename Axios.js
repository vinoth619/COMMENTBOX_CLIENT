
const sendDataToBackend = async (data) => {
  try {
    const response = await axios.post('https://commentbox-server-2.onrender.com/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data); // Handle response data
  } catch (error) {
   
  }
};


