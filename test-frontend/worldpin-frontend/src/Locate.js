import locateIcon from "./assets/selfies.png"

const Locate =({panTo})=> {
    return (
    <button className="locate" onClick={() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {  //position is our success callback
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null //failed callback
      );
    }}>
      <img src={locateIcon} alt="selfie-locate me"/>
      </button>
    )
  }

  export default Locate;