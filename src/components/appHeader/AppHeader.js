import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import scroll from '../scroll/scroll';

import './AppHeader.scss';

export default function AppHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = ({isActive}) => ({color: isActive ? '#fff' : ''});

    scroll(menuOpen);

    return (
        <header className="header">
            <div className="header__container">
                <Link className="header__website-name" to="/">MARVEL</Link>
                <div className="header__menu menu">
                    <div onClick={() => setMenuOpen(menuOpen => !menuOpen)} 
                        className={menuOpen ? 'menu__icon opened' : 'menu__icon'}>
                        <span></span>
                    </div>
                </div>
                <div className={menuOpen ? 'header__menu-links opened' : 'header__menu-links'}>
                    <ul className="header__links">
                        <span onClick={() => setMenuOpen(false)}></span>
                        <li>
                            <NavLink onClick={() => setMenuOpen(false)} style={isActive} to="/">Characters</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setMenuOpen(false)} style={isActive} to="/comics">Comics</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => setMenuOpen(false)} style={isActive} to="/events">Events</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}