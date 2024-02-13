import React from 'react';
import "../css/googleMap.css";

const GoogleMap: React.FC = () => {
  return (
    <div className='google-map-container'>
      <iframe
        title="Google Map"
        width=""
        height="753"
        
       
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=1920&height=753&hl=en&q=Istanbul+pizzahut&z=12&ie=UTF8&iwloc=B&output=embed"
      ></iframe>
      <a href="https://mapsiframe.com/"></a>
      <script
        type="text/javascript"
        src="https://embedmaps.com/google-maps-authorization/script.js?id=c2625ae3013f665eef81cb02d183cd3bc1f73f91"
      ></script>
    </div>
  );
};

export default GoogleMap;
