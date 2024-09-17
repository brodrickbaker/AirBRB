import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSpot, getSpots } from '../../store/spot';
import { useSelector } from 'react-redux';

const UpdateSpot = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {spotId} = useParams()
    const spot = useSelector(state => state.spot.spot)

    const [country, setCountry] = useState(spot? spot.country : '');
    const [address, setAddress] = useState(spot? spot.address: '');
    const [city, setCity] = useState(spot? spot.address: '');
    const [state, setState] = useState(spot? spot.state: '');
    const [lat, setLatitude] = useState(spot? spot.lat: '');
    const [lng, setLongitude] = useState(spot? spot.lng: '');
    const [description, setDescription] = useState(spot? spot.description: '');
    const [name, setTitle] = useState(spot? spot.name: '');
    const [price, setPrice] = useState(spot? spot.price: '');
    const [preview, setPreview] = useState(spot.SpotImages[0]? spot.SpotImages[0].url: '');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    const [url3, setUrl3] = useState('');
    const [url4, setUrl4] = useState(''); 
    const [errors, setErrors] = useState({});
    const [urlError, setUrlError] = useState('');
    
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
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const images = [{url: preview, preview: true}, {url: url1}, {url: url2}, {url: url3}, {url: url4}]
        
        const urlCheck = images.reduce((acc, curr, i) => {
          if (images[i].url && !(images[i].url.endsWith('.png') || images[i].url.endsWith('.jpg') || images[i].url.endsWith('.jpeg'))) {
            return acc + 1
          } else return acc + 0
        }, 0)

        setUrlError(urlCheck? 'Image URL must end in .png, .jpg, or .jpeg': '')
       
        const payload = {
          id: spotId,
          country,
          address,
          city,
          state,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          description,
          name,
          price: parseInt(price),
          images
        };
        
        if(!urlCheck){
        const createdSpot = await dispatch(updateSpot(payload))
        setErrors({})
          setErrors(createdSpot.errors)
          if (!createdSpot.errors) {
          dispatch(getSpots());
          navigate(`/spots/${spotId}`)
        } 
      }
      };

      return (
        <section className="card" id='spot-form'>
          <form  onSubmit={handleSubmit}>
          <h1>Create a new Spot</h1>
            <div className='card form-card'>
              <h2>Where&apos;s your place located?</h2>
              <h3>Guests will only get your exact address once they book a reservation.</h3>
              <label htmlFor='country'>
                Country {errors && <span> {errors.country}</span>}
              </label>
              <input
              name='country'
              type="text"
              placeholder="Country"
              value={country}
              onChange={updateCountry} />
              <label htmlFor='address'>
                Street Address {errors && <span> {errors.address}</span>}
              </label>
              <input
              name='address'
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={updateAddress} />
              <div className='grid address'>
                <label htmlFor='city'>
                  City {errors && <span> {errors.city}</span>}
                </label>
                <label htmlFor='state' >
                  State {errors && <span> {errors.state}</span>}
                </label>
                <input
                name='city'
                type="text"
                placeholder="City"
                value={city}
                onChange={updateCity} />
                <input
                name='state'
                type="text"
                placeholder="STATE"
                value={state}
                onChange={updateState} />
              </div>
              <div className='grid latlng'>
                <label htmlFor='lat'>
                  Latitude
                </label>
                <label htmlFor='lng'>
                  Longitude
                </label>
                <input
                name='lat'
                title='Not Required'
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={updateLatitude} />
                <input
                name='lng'
                title='Not Required'
                type="text"
                placeholder="Longitude"
                value={lng}
                onChange={updateLongitude} />
              </div>
              </div>
              <div className='card form-card'>
                <h2>Describe your place to guests</h2>
                <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h3>
                <textarea
                name='description'
                placeholder="Please write at least 30 characters"
                value={description}
                rows='10'
                onChange={updateDescription} >
              </textarea>
              <label htmlFor='description'>
                {errors && <span> {errors.description}</span>}
              </label>
              </div>
              <div className='card form-card'>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h3>
                <input
                name='name'
                type="text"
                placeholder="Name Your Spot"
                value={name}
                onChange={updateTitle} />
                <label htmlFor='name'>
                  {errors && <span> {errors.name}</span>}
                </label>
              </div>
              <div className='card form-card'>
                <h2>Set a base price for your spot</h2>
                <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
              <div className='inline'>
                <h3>$</h3>
                <input
                name='price'
                type="text"
                placeholder="Price per night"
                value={price}
                onChange={updatePrice} />
              </div>
              <label htmlFor='price'>
                {errors && <span> {errors.price}</span>}
              </label>
            </div>
            <div className="card form-card">
              <h2>Liven up your spot with photos</h2>
              <h3>Submit a link to at least one photo to publish your spot</h3>
              <input
              name='preview'
              type="text"
              placeholder="Preview Image URL"
              value={preview}
              onChange={updatePreview} />
              <label htmlFor='preview'>
                {urlError && <span> {urlError}</span>}
              </label>
              <input
              name='url1'
              type="text"
              placeholder="Image URL"
              value={url1}
              onChange={updateUrl1} />
              <label htmlFor='url1'>
                {urlError && <span> {urlError}</span>}
              </label>
              <input
              name='url2'
              type="text"
              placeholder="Image URL"
              value={url2}
              onChange={updateUrl2} />
              <label htmlFor='url2'>
                {urlError && <span> {urlError}</span>}
              </label>
              <input
              name='url3'
              type="text"
              placeholder="Image URL"
              value={url3}
              onChange={updateUrl3} />
               <label htmlFor='url3'>
                {urlError && <span> {urlError}</span>}
              </label>
              <input
              name='url4'
              type="text"
              placeholder="Image URL"
              value={url4}
              onChange={updateUrl4} />
              <label htmlFor='url4'>
                {urlError && <span> {urlError}</span>}
              </label>
            </div>
            <button type="submit" className='btn' >Create Spot</button>
          </form>
        </section>
      );
};

export default UpdateSpot;
