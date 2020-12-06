import React from 'react'
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Footer = () => <div className="Footer">
  <strong>&#169; 2020 Lollipop Training. All rights reserved.</strong>
  <Nav className="ml-auto social-nav">
    <NavItem className="mt-2 mr-5">
      Suivez nous
    </NavItem>
    <NavItem>
      <NavLink href="https://www.instagram.com/lollipop.training/" target="_blank">
        <img src="../../assets/instagram-500px.svg" className="social-nav-icon" alt="Linkedin logo" width="25" />
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://twitter.com/LollipopUx" target="_blank">
        <img src="../../assets/twitter-500px.svg" className="social-nav-icon" alt="Linkedin logo" width="25" />
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://www.linkedin.com/company/lollipoptraining/" target="_blank">
        <img src="../../assets/linkedin-500px.svg" className="social-nav-icon" alt="Linkedin logo" width="25" />
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://www.facebook.com/lollipoptraining/" target="_blank">
        <img src="../../assets/fb-500px.svg" className="social-nav-icon" alt="Linkedin logo" width="25" />
      </NavLink>
    </NavItem>
  </Nav>
</div>

export default Footer
