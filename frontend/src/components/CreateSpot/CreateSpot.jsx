import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spot';
import './CreateSpot.css'

const CreateSpot = () => {
    // const user = useSelector(state => state.session.user)
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
    
    // const [errors, setErrors] = useState({});

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
    };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
    
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

        if (createdSpot) {
          
          
          
          reset();
          navigate(`/`);
        }
      };

      return (
        <section className="card" id='spot-form'>
          <h1>Create a new Spot</h1>
          <h2>Where&apos;s your place located?</h2>
          <h3>Guests will only get your exact address once they book a reservation.</h3>
          <form  onSubmit={handleSubmit}>
            <label>
              Country <span className='error'>*ERROR</span>
            </label>
            <input
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={updateCountry} />
            <label>
              Street Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              required
              value={address}
              onChange={updateAddress} />
            <label>
              City
            </label>
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={updateCity} />
            <label>
              State
            </label>
            <input
              type="text"
              placeholder="STATE"
              required
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
            <div className='card form-card'>
            <h2>Describe your place to guests</h2>
            <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h3>
            <textarea
              className='card'
              placeholder="Description"
              required
              value={description}
              rows='10'
              onChange={updateDescription} >
            </textarea>
            <label>
              Description error
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
              Name error
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
              Price error
              </label>
            </div>
            <div className="card form-card">
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot</h3>
            <input
              type="text"
              placeholder="Preview Image URL"
              required
              value={preview}
              onChange={updatePreview} />
              <label>Preview Image Required</label>
              <input
              type="text"
              placeholder="Image URL"
              value={url1}
              onChange={updateUrl1} />
              <label>Image URL must in in .png, .jpg, or .jpeg</label>
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
