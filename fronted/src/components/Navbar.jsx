import React from "react";
import "../Style/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as SL } from "react-scroll"
import { Button, Drawer, Modal, Text, useDisclosure } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";

function Navbar() {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  const Navigate = useNavigate();
  const location = useLocation();
  const edit = [
    { path: "/courses", title: "COURSES", type: true },
    { path: "/events", title: "EVENTS", type: true },
    { path: "curriculum", title: "LEARN", type: false },
    { path: "news", title: "MASAI NEWS", type: false },
    { path: "success", title: "SUCCESS STORIES", type: false },
    { path: "hirefromus", title: "HIRE FROM US", type: false },
  ];

  const curr_user = useSelector(state => state.user.user)
  return (
   <div className="main">
      <div>
        <Link to={"/"}>
          <img
            src="https://masai-website-images.s3.ap-south-1.amazonaws.com/logo.png"
            alt="masai images"
          />
        </Link>
      </div>
     
      <div className="middle dt11">
        {edit?.map((el) => (
          el.type ? <Link className="link" to={el.path}>
            {el.title}
          </Link>
            : location.pathname === '/' ? <SL
              className='link'
              to={el.path}
              smooth={true}
              duration={500}
              offset={-30}>
              {el.title}
            </SL>
              : <Link className="link" to='/'>{el.title}</Link>
        ))}
      </div>
      <div className="last">
        <button className="refd"
          onClick={() => {
            Navigate("/Referal");
          }}
        >
          <Link className="-pt-2" to={"/Refer"}>REFER & EARN</Link>
        </button>
        {
          curr_user?.username ? <Button className="rounded-full bold uppercase">{curr_user?.username[0]}</Button>
           : <button className="refd" onClick={() => onSignupOpen()}>SIGN UP</button>
        }
      </div>

      <Drawer size={"md"} isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose}>
        <Login onOpen={onSignupOpen} onClose={onLoginClose} />
      </Drawer>
      <Drawer size={"md"} isOpen={isSignupOpen} onOpen={onSignupOpen} onClose={onSignupClose}>
        <Signup onOpen={onLoginOpen} onClose={onSignupClose} />
      </Drawer>
    </div>
  );
}

export default Navbar;
