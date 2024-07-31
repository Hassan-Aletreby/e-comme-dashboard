import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Header.css";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <div>
      <Navbar className="nav_bar">
        <div className="notifiction icon">
          <IoNotificationsSharp />
        </div>
        <div className="user icon">
          <Link to={"/profile"}>
            <p>
              <FaUserCircle />
              <span>username</span>
            </p>
          </Link>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
