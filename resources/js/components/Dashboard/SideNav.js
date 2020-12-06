import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {

  return (<nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content">
      <div className="sidebar-brand">
        <a href="#"><img src="../assets/lollipop.svg" alt="" width="100"/></a>
      </div>
      <div className="sidebar-header">
        <div className="user-pic">
        
          <img className="img-responsive img-rounded"
            src="../assets/nouha.jpg"
            width="35"
            alt="User picture" />
        </div>
        <div className="user-info">
          <span className="user-role">Nouha Jaafar</span>
          <span className="user-status">
            <i className="fa fa-circle"></i>
            <span>Online</span>
          </span>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fa fa-home"></i>
              <span>Accueil</span>
            </Link>
          </li>
          <li className="header-menu">
            <span>Formations</span>
          </li>
          <li className="sidebar-dropdown">
            <a href="#">
              <i className="fa fa-list"></i>
              <span>Gestion des formations</span>
            </a>
            <div className="sidebar-submenu">
              <ul>
                <li>
                  <Link to="/dashboard/formations">Liste des formations
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/categorie">Liste des categories
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/niveau">Liste des niveaux
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/lieu">Liste des lieux
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link to="/dashboard/inscription">
              <i className="fa fa-address-book"></i>
              <span>Gestion des inscriptions</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/certificat">
              <i className="fas fa-certificate"></i>
              <span>Gestion des certifications</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/blog">
              <i className="fas fa-blog"></i>
              <span>Gestion du blog</span>
            </Link>
          </li>

        </ul>
      </div>
    </div>
    <div className="sidebar-footer">
      <a href="/">
        <i className="fa fa-home"></i>
      </a>
      <a href="#">
        <i className="fa fa-bell"></i>
      </a>
      <Link to="/dashboard/messages">
        <i className="fa fa-envelope"></i>
        </Link>
      <a href="#">
        <i className="fa fa-cog"></i>
        <span className="badge-sonar"></span>
      </a>
      <a type="submit" href="/logout">
        <i className="fa fa-power-off"></i>
      </a>
    </div>
  </nav>)
}

export default SideNav