const SpotImages = (props) => {
  const {spot} = props;
  const images = spot.SpotImages.filter(image => !image.preview);

  return (
    <div className="card">
      <img src={spot.SpotImages.find(image=> image.preview).url} className="main"/>
      <ul className="spot-image">{images.map(image => {
        return (
          <li key={image.id}>
            <img src={image.url} 
              className="card"/>
          </li>
        )
        })}
      </ul>
    </div>
  )
};

export default SpotImages;
