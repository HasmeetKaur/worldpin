
import { useState, useCallback } from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";

import Locate from "./Locate";


import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxOptionText,
} from "@reach/combobox";
import eachMinuteOfIntervalWithOptions from "date-fns/esm/fp/eachMinuteOfIntervalWithOptions/index.js";

const PlacesAutocomplete = ({setSelected, mapRef}) => {

    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    //Let's create our PanTo function, here, we will use our GeoCode LatLng results to pan to that location when clicked. Function is empty as definition will never be changed.

    const panTo= useCallback(({lat,lng}) =>{
      mapRef.current.panTo({lat,lng});
      mapRef.current.setZoom(16);
    //setzoom//
    },[]);


    


    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        panTo({lat,lng});

        console.log(lat,lng);
        // setSelected({lat, lng});
      }
  
      



    return (
      <>
      <div className="locate">
      <Locate panTo={panTo}></Locate>
      </div>
      <div className="places-container">
    <Combobox onSelect={handleSelect} >
      <div className="placesInput">
      <ComboboxInput 
      value={value} 
      onChange= {(event) => setValue(event.target.value)}
      disabled={!ready}
      className="combobox-input"
      placeholder="Search a location"
      />
      </div>
      
      <ComboboxPopover>
      <div className="sugglist">
        <ComboboxList>
        {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
        </div>
      </ComboboxPopover>        
    </Combobox>
    
  </div>
  </>
    )
  
}


export default PlacesAutocomplete;