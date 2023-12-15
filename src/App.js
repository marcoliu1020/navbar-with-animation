import { useState } from "react";

import { CSSTransition } from "react-transition-group";

// icons
import { FaArrowLeft, FaCaretDown, FaCogs, FaCss3Alt, FaHtml5, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";

export default function App() {
    return (
        <>
            <Navbar>
                <NavItem icon={<FaCaretDown />}>
                    <DropdownMenu />
                </NavItem>
            </Navbar>
        </>
    );
}

function Navbar(props) {
    return (
        <nav className='navbar'>
            <ul className='navbar-nav'>
                {/* items */}
                {props.children}
            </ul>
        </nav>
    );
}

function NavItem(props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        props.children && setIsOpen(!isOpen);
    }

    return (
        <li className='nav-item'>
            <a
                href='/#'
                className='icon-button'
                onClick={handleToggle}
                //
            >
                {props.icon}
            </a>

            <CSSTransition
                in={isOpen}
                unmountOnExit
                timeout={500}
                classNames='menu-popup'
                //
            >
                {props.children}
            </CSSTransition>
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(element) {
        const height = element.offsetHeight;
        setMenuHeight(height);
    }

    return (
        <div className='dropdown' style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
                //
            >
                <div className='menu'>
                    <DropdownItem
                        leftIcon={<FaCogs />}
                        goToMenu={() => setActiveMenu("settings")}
                        //
                    >
                        Settings
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "settings"}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
                onEnter={calcHeight}
                //
            >
                <div className='menu'>
                    <DropdownItem leftIcon={<FaArrowLeft />} goToMenu={() => setActiveMenu("main")}>
                        <h1>Settings</h1>
                    </DropdownItem>
                    <DropdownItem leftIcon={<FaReact />}>React</DropdownItem>
                    <DropdownItem leftIcon={<FaHtml5 />}>HTML</DropdownItem>
                    <DropdownItem leftIcon={<FaCss3Alt />}>CSS</DropdownItem>
                    <DropdownItem leftIcon={<IoLogoJavascript />}>JavaScript</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );

    function DropdownItem(props) {
        return (
            <a href='/#' className='menu-item' onClick={props.goToMenu}>
                <span className='icon-button'>{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </a>
        );
    }
}
