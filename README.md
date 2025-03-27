<br />
<div align="left">
  <h1>LiftMeApp</h1>
  <!--intro paragraph -->
  <p> LiftMeApp is a carpooling platform designed for organizations and communities. It connects employees or community members who are open to sharing their daily commutes with colleagues. Sharing rides saves environment, brings joy as well as savings in parking expenses. </p>
  <p><strong>This app is a prototype and not yet ready for a production use.</strong></p>
</div>
<hr>

<!-- LiftMeApp screen cap -->
<img width="1511" alt="Screenshot 2025-03-27 at 10 19 01" src="https://github.com/user-attachments/assets/bbb840d5-b035-4b7e-94ac-55157a652302" />

<!-- Robojump description -->
<div>
  <p>The workflow in a nutshell:
    1. Registration (only once) - input your name or username, email, role (driver, passenger, both), address of home or a preferred starting point, new password. 
    2. Sign in with your email and password
    3. Once signed in, you see a list of names you have matched with in the left. To see only matches which are relevant for you, adjust the commuting days and your preferred role from the toggles above the list of the matches.
    4. Clicking a name in the list will show you the following information:
    (driver selected)
      - commuting days of the other person
      - number of seats available in the other person's car
      - an extra distance and time required if the other person picks you from the address you have defined as your home address
      (passenger selected)
      - commuting days of the other person
      - the preferred pickup place of the other person (Home / Flexible)
      - an extra distance and time required if you pick the other person from home

      In both cases you will see an updated route on the map.
    
     </p>
  
  <p>The animation of the game was created with a Python module called 
    <a href="https://en.wikipedia.org/wiki/Pygame">Pygame</a>. 
    The logic in the code is the following:
    <ul>
      <li>The platforms, coins, and ghosts are represented as groups of images, with their coordinates defined in a dictionary.</li>  
      <li>All elements (except for the robot) move downward at a predefined speed, which increases incrementally and makes it harder to stay in the game.</li>
      <li>A while loop updates the coordinates of these elements in each iteration. It also checks if the robot is moving, if it collects a coin or encounters a ghost, or if it falls out of the game.</li>
    </ul>
  </p>
</div>
