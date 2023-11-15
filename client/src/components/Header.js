import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, NavLink } from 'react-router-dom';

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);

    const navigate = useNavigate(); // Rename history to navigate

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async (e) => {
        let token = localStorage.getItem('usersdatatoken');

        const res = await fetch('/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        const data = await res.json();

        if (data.status === 201) {
            localStorage.removeItem('usersdatatoken');
            setLoginData(false);
            navigate('/'); // Use navigate instead of history
        } else {
            console.log('error');
        }
    };

    const goDash = () => {
        navigate('/dashboard'); // Use navigate instead of history
    };

    const goError = () => {
        navigate('*'); // Use navigate instead of history
    };

    return (
        <div>
            <header>
                <nav className='bg-secondary d-flex justify-content-around align-items-center text-white py-2 mt-0'>
                    <NavLink to="/">
                        <h3 className='text-white text-decoration-none'>Logo</h3>
                    </NavLink>
                   
                    <div className="avtar">
                        {logindata.ValidUserOne ? (
                            <div className='d-flex align-items-center'>
                            <Avatar
                                style={{
                                    background: 'salmon',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                }}
                                onClick={handleClick}
                            >
                                {logindata.ValidUserOne.fname}
                            </Avatar>
                            <span className='px-3'>User Email: {logindata? logindata.ValidUserOne.email: ""} </span>
                            </div>
                        ) : (
                            <Avatar style={{ background: 'blue' }} onClick={handleClick} />
                        )}
                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {logindata.ValidUserOne ? (
                            <div>
                                <MenuItem
                                    onClick={() => {
                                        goDash();
                                        handleClose();
                                    }}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logoutuser();
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </div>
                        ) : (
                            <div>
                                <MenuItem
                                    onClick={() => {
                                        goError();
                                        handleClose();
                                    }}
                                >
                                    Profile
                                </MenuItem>
                            </div>
                        )}
                    </Menu>
                </nav>
            </header>
        </div>
    );
};

export default Header;
