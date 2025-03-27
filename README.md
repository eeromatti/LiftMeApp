<br />
<div align="left">
  <h1>LiftMeApp</h1>
  <!--intro paragraph -->
  <p> LiftMeApp is a carpooling platform designed for organizations and communities. It connects employees or community members who are open to sharing their daily commutes with colleagues. Sharing rides saves environment, brings joy as well as savings in parking expenses. </p>
  <p><strong>Note: This app is a prototype and not yet ready for a production use.</strong></p>
</div>
<hr>

<!-- LiftMeApp screen cap -->
<img width="1511" alt="Screenshot 2025-03-27 at 10 19 01" src="https://github.com/user-attachments/assets/bbb840d5-b035-4b7e-94ac-55157a652302" />

<!-- Workflow description -->
<br/>
<div>
  <h3>The workflow in a nutshell:</h3>
    <ol type="1">
        <li>Registration (only once) - enter your name, username, email, role (driver, passenger, both), home address or a preferred starting location, new password. </li>  
        <li>Sign in with your email and password</li>
        <li>After signing in, you will see a list of your matched users on the left panel. To filter relevant matches, adjust the commuting days and your preferred role using the toggles above the match list.</li>
        <li>Clicking a name in the list will show you the following information and the updated route on the map</li>
          <ul>
            <li>Driver selected</li>
            <ul>
              <li>Commuting days of the other person</li>
              <li>Number of available seats</li>
              <li>Additional distance and time required if they pick you up from your defined home address</li>
            </ul>
            <li>Passenger selected</li>
            <ul>
              <li>Commuting days of the other person</li>
              <li>Their preferred pickup location (Home / Flexible)</li>
              <li>Additional distance and time required if you pick them up from home</li>
            </ul>
          </ul>
        <li>Contact other users in your preferred channel and start carpooling</li>
    </ol>
  </p>
</div> 

<hr>

<div>
  <h3>Solution under the hood</h3>
  <p>The following open-source services were used in the app:
    <ul>
      <li><a href="openrouteservice.org" >openrouteservice.org</a> - distance and travel time calculation, route point optimization, </li>
      <li><a href="https://openfreemap.org/">OpenFreeMap</a> and <a href="https://www.openstreetmap.org/">OpenStreetMap</a> - map tiles providers</li>
      <li><a href="https://project-osrm.org/">Project OSRM</a> - routing engine</li>
      <li><a href="https://maplibre.org/">MapLibre</a> - React library for displaying the map</li>
    </ul>

 
</div>





  
