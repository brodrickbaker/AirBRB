
const SpotImages = (props) => {
  const {spot} = props;
  const images = spot.SpotImages.filter(image => !image.preview);
   if(images.length){ 
  return (
    <div className="card">
      <img src={spot.SpotImages.find(image=> image.preview).url} className="main"/>
      <ul >
        {images.map(image => {
            return (
                <li key={image.id} className="spot-image"> 
                    <img src={image.url} 
                    className="card"
                    />
                </li>
            )
        })}
      </ul>
    </div>
  )} else {
    return (
    <div className="card">
        <h3>No Pics Yet</h3>
    </div>
)}
};

export default SpotImages;
