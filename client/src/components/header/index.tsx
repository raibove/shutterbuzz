import Logo from '/logo.svg';
import './style.css'
import { useEffect } from 'react';
import * as netlifyIdentity from 'netlify-identity-widget'

const Header = () => {
    useEffect(()=>{
        const user = window.localStorage.getItem("gotrue.user");
        // netlifyIdentity.init({
        //     container: '#o'
        // })
        // netlifyIdentity.on("init", user => {
        //     console.log( user );
        //   });
        // const user = netlifyIdentity.currentUser();
        console.log(user);
        // netlifyIdentity.init()
        // netlifyIdentity.open('signup')
    }, [])

    return (
        <div className='header'>
            <div className='logo-con'>
                <img src={Logo} alt='logo' className='logo' /> <span className='brand-name'>ShutterBuzz</span>
            </div>
            <div className='nav-con'>
                <span className='nav-item'>About</span>
                <span className='nav-item' onClick={()=>{
        netlifyIdentity.open('signup')
                }}>Profile</span>
            </div>
        </div>
    )
}

export default Header;