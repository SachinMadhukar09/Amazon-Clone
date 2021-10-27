import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [burgerStatus, setBurgerStatus] = useState(false);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfk5EpYhMg8UEC5DCQkuJoroVS8wMSz6NIA&usqp=CAU"
        />
      </Link>
      <Menu>
      <div className="header_search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">
                Hello {user ? user.email : "User"}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </Menu>


      <RightMenu>
        <CustomMenu onClick={() => setBurgerStatus(true)} />
      </RightMenu>

      {
        // if(window.innerwidth)
      }
      <BugerNav show={burgerStatus}>
        <CloseWrapper>
          <CustomClose onClick={() => setBurgerStatus(false)} />
        </CloseWrapper>
        <div className="header__nav1">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header__option1">
              <span className="header__optionLineOne1">
                Hello {user ? user.email : "User"}
              </span>
              <span className="header__optionLineTwo1">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <div className="header__option1">
            <span className="header__optionLineOne1">Returns</span>
            <span className="header__optionLineTwo1">& Orders</span>
          </div>
          <div className="header__option1">
            <span className="header__optionLineOne1">Your</span>
            <span className="header__optionLineTwo1">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header__optionBasket1">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo1 header__basketCount1">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </BugerNav>
    </div>
  );
}
export default Header;

const RightMenu = styled.div`
  display: flex;
  // padding-left: 60%;
  color:white;
  a {
    font-weight: 600;
    text-decoration: uppercase;
    margin-right: 10px;
  }
`;

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
  // background-color:white;


`;

const BugerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: black;
  width: 300px;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.2s;
  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    a {
      font-weight: 600;
    }
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;


const Menu = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;

  a {
    font-weight: 600;
    text-decoration: uppercase;
    padding: 0 10px;
    flex-wrap: no-wrap;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
  color:white;

`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  // background-color:white;

`;
