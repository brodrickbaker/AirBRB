import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot, addPic } from '../../store/spot';
import './CreateSpot.css'

const CreateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLatitude] = useState('');
    const [lng, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [name, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [preview, setPreview] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState(''); 
    const [errors, setErrors] = useState({});

    const updateCountry= (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLatitude = (e) => setLatitude((e.target.value));
    const updateLongitude = (e) => setLongitude((e.target.value));
    const updateDescription = (e) => setDescription(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updatePrice = (e) => setPrice((e.target.value));
    const updatePreview = (e) => setPreview((e.target.value));
    const updateUrl1 = (e) => setUrl1((e.target.value));
    const updateUrl2 = (e) => setUrl2((e.target.value));
    const updateUrl3 = (e) => setUrl3((e.target.value));
    const updateUrl4 = (e) => setUrl4((e.target.value));

    const reset = () => {
      setCountry('');
      setAddress('');
      setCity('');
      setState('');
      setLatitude('');
      setLongitude ('');    
      setTitle('');
      setDescription('');
      setPrice('');
      setPreview('');
      setUrl1('');
      setUrl2('');
      setUrl3('');
      setUrl4('');
    };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const payload = {
          country,
          address,
          city,
          state,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          description,
          name,
          price: parseInt(price)
        };
  
        const createdSpot = await dispatch(createSpot(payload))
        console.log(createdSpot.body)
        setErrors(createdSpot.errors)
  
        if (!errors) {
          
          // const previewImage = {
          //   spotId: createdSpot.id,
          //   url: preview,
          //   preview: true
          // }

          // const newPic = await dispatch(addPic(createdSpot, previewImage))
          // setErrors(newPic.errors)
          // console.log(newPic, errors)
          // setTimeout(() => {
          //   if (!errors) {
          //     reset();
          //     navigate(`/`);
          //   }
          // }, 1000)
          
        }
      };

      return (
        <section className="card" id='spot-form'>
          <form  onSubmit={handleSubmit}>
          <h1>Create a new Spot</h1>
          <div className='card form-card'>
          <h2>Where&apos;s your place located?</h2>
          <h3>Guests will only get your exact address once they book a reservation.</h3>
            <label>
              Country {errors && <span> {errors.country}</span>}
            </label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={updateCountry} />
            <label>
              Street Address {errors && <span> {errors.address}</span>}
            </label>
            <input
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={updateAddress} />
            <label>
              City {errors && <span> {errors.city}</span>}
            </label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity} />
            <label>
              State {errors && <span> {errors.state}</span>}
            </label>
            <input
              type="text"
              placeholder="STATE"
              value={state}
              onChange={updateState} />
            <label>
              Latitude
            </label>
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={updateLatitude} />
            <label>
              Longitude
            </label>
            <input
              type="text"
              placeholder="Longitude"
              value={lng}
              onChange={updateLongitude} />
            </div>
            <div className='card form-card'>
            <h2>Describe your place to guests</h2>
            <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h3>
            <textarea
              placeholder="Description"
              value={description}
              rows='10'
              onChange={updateDescription} >
            </textarea>
            <label>
              {errors && <span> {errors.description}</span>}
            </label>
            </div>
            <div className='card form-card'>
              <h2>Create a title for your spot</h2>
              <h3>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h3>
              <input
              type="text"
              placeholder="Name Your Spot"
              value={name}
              onChange={updateTitle} />
              <label>
              {errors && <span> {errors.name}</span>}
              </label>
            </div>
            <div className='card form-card'>
              <h2>Set a base price for your spot</h2>
              <h3>Competitive pricing can help your listing stand oput and rank higher in search results.</h3>
              <input
              type="text"
              placeholder="Price per night"
              value={price}
              onChange={updatePrice} />
              <label>
              {errors && <span> {errors.price}</span>}
              </label>
            </div>
            <div className="card form-card">
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot</h3>
            <input
              type="text"
              placeholder="Preview Image URL"
              value={preview}
              onChange={updatePreview} />
              <label></label>
              <input
              type="text"
              placeholder="Image URL"
              value={url1}
              onChange={updateUrl1} />
              <label>Image URL must end in .png, .jpg, or .jpeg</label>
              <input
              type="text"
              placeholder="Image URL"
              value={url2}
              onChange={updateUrl2} />
              <label>Image URL must in in .png, .jpg, or .jpeg</label>
              <input
              type="text"
              placeholder="Image URL"
              value={url3}
              onChange={updateUrl3} />
              <label>Image URL must in in .png, .jpg, or .jpeg</label>
              <input
              type="text"
              placeholder="Image URL"
              value={url4}
              onChange={updateUrl4} />
              <label>Image URL must in in .png, .jpg, or .jpeg</label>
            </div>
            <button type="submit" className='btn'>Create Spot</button>
          </form>
        </section>
      );
};

export default CreateSpot;
