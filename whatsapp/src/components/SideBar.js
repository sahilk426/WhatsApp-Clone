import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Groups2Icon from "@mui/icons-material/Groups2";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonChat from "./PersonChat";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Icon, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { AppContext } from "../context/AppContext";
import { getUsers ,getConversation} from "../service/api";

const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;
const SideBar = () => {
  const [pUser,setPUser] = useState();
  const { account ,setAccount} = useContext(AppContext);
  const [searchClick, setSearchClick] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);
  
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const handleOnChange = (e) => {
    console.log(e);
    if(e.length == 0) {
      setUsers(pUser);
    }else {
      var result = users.filter(option => option.name.toLowerCase().includes(e.toLowerCase()));
      setUsers(result);
    }
    console.log(result);
  }
  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      setPUser(response);
      setUsers(response);
    };
    fetchData();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <div id="top_avatar">
          <Avatar src={account.picture} />
        </div>
        <div id="top_icons">
          <IconButton>
            <Groups2Icon />
          </IconButton>

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon onClick={handleClick} />
            <Menu
              anchorEl={open}
              keepMounted
              open={open}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuOption
                onClick={() => {
                  handleClose();
                }}
              >
                My account
              </MenuOption>
              <MenuOption
                onClick={() => {
                  handleClose();
                  setAccount(null);
                }}
              >
                Logout
              </MenuOption>
            </Menu>
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
        <IconButton>
        {!searchClick && <SearchIcon />}
          {searchClick && <ArrowBackIcon />}
        </IconButton>
          <input
            placeholder="Search or Start new chat"
            type="text"
            onFocus={() => {
              setSearchClick(true);
            }}
            onBlur={() => {
              setSearchClick(false);
            }}
            onChange={(e) => {
              handleOnChange(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="sidebar_personal_chats">
        {users.map((user,index) => {
          if (user.sub !== account.sub) {
            return <PersonChat user={user}/>;
          }
          return <div/>
        })}
      </div>
    </div>
  );
};

export default SideBar;
