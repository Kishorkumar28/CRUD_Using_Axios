import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [datas, setDatas] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => setDatas(response.data))
      .catch(error => console.log("Error fetching data: ", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      // Handle nested properties like address and company
      ...(name.startsWith('address.')
        ? {
            address: {
              ...prevFormData.address,
              [name.split('.')[1]]: value,
            },
          }
        : name.startsWith('company.')
        ? {
            company: {
              ...prevFormData.company,
              [name.split('.')[1]]: value,
            },
          }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const { id } = formData;
    const newFormData = { ...formData }; // Create a new copy of formData

    if (id) {
      // If the form data has an ID, it's an update
      const updatedDatas = datas.map(data =>
        data.id === id ? { ...data, ...formData } : data
      );
      setDatas(updatedDatas);
    } else {
      // If the form data does not have an ID, it's a new entry
      const newId = datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1; // Generate new ID
      newFormData.id = newId; // Assign the new ID to the new form data
      setDatas([...datas, newFormData]); // Add new data to datas
    }

    // Reset the form after submission
    setFormData({
      id: '',
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    });
  };

  const handleDelete = (id) => {
    const updatedDatas = datas.filter(data => data.id !== id);
    setDatas(updatedDatas);
  };

  const handleUpdate = (data) => {
    setFormData({ ...data });
    // Set a temporary ID for new data when updating
    if (!data.id) {
      const newId = datas.length > 0 ? Math.max(...datas.map(data => data.id)) + 1 : 1; // Generate new ID
      setFormData(prevState => ({ ...prevState, id: newId }));
    }
  };

  return (
    <>
      <div className='parent'>
        <div className='left'>
          <h1>Details</h1>
          <ul style={{ listStyleType: 'none' }}>
            {datas.map(data => (
              <li className='list' key={data.id}>
                <h2>ID: {data.id}</h2>
                <p>Name: {data.name}</p>
                <p>UserName: {data.username}</p>
                <p>Email : {data.email}</p>
                {data.address && (
                  <div>
                    <p>Address:</p>
                    <p>Street: {data.address.street}</p> 
                    <p>Suite: {data.address.suite}</p>
                    <p>City: {data.address.city}</p>
                    <p>Zipcode: {data.address.zipcode}</p>
                  </div>
                )}
                <p>Phone: {data.phone}</p>
                <div>
                  <p>Website: {data.website}</p>
                  <p>Company Name: {data.company.name}</p>
                  <p>CatchPhrase: {data.company.catchPhrase}</p>
                  <p>Bs: {data.company.bs}</p>
                </div>
                <div className='buttons'> 
                  <button id='update' onClick={() => handleUpdate(data)}>Update</button>
                  <button id="delete" onClick={() => handleDelete(data.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='form-container'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form_elmnts'>
              <h2 htmlFor="name">Id</h2>
              <h3>{formData.id}</h3>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id='name' value={formData.name} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="username">UserName</label>
              <input type="text" name="username" id='username' value={formData.username} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id='email' value={formData.email} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="address.street">Street</label>
              <input type="text" id='address.street' name="address.street" value={formData.address.street} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="address.suite">Suite</label>
              <input type="text" id='address.suite' name="address.suite" value={formData.address.suite} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="address.city">City</label>
              <input type="text" id='address.city' name="address.city" value={formData.address.city} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="address.zipcode">Zipcode</label>
              <input type="text" id='address.zipcode' name="address.zipcode" value={formData.address.zipcode} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="phone">Phone</label>
              <input type="text" id='phone' name="phone" value={formData.phone} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="website">Website</label>
              <input type="text" id='website' name="website" value={formData.website} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="company.name">Company Name</label>
              <input type="text" id='company.name' name="company.name" value={formData.company.name} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="company.catchPhrase">CatchPhrase</label>
              <input type="text" id='company.catchPhrase' name="company.catchPhrase" value={formData.company.catchPhrase} onChange={handleChange}/>
            </div>
            <div className='form_elmnts'>
              <label htmlFor="company.bs">Bs</label>
              <input type="text" id='company.bs' name="company.bs" value={formData.company.bs} onChange={handleChange}/>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
