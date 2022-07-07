import React from 'react';

//Components:
import StyledHeader from './StyledHeader';
import StyledTitle from './StyledTitle';
import StyledNavi from './StyledNavi';
import StyledNaviItem from './StyledNaviItem';
import SlyledLink from './StyledNaviLink';

//Check is active link:
import checkActive from './checkIsActiveLink';

const Header = ({popUpVisible, setPopUpVisible}) => {

    return(
            <StyledHeader>
                <StyledTitle>DQ SCRIPT</StyledTitle>
                <StyledNavi>
                    <StyledNaviItem><SlyledLink to='/' isActive={checkActive}>About</SlyledLink></StyledNaviItem>
                    <StyledNaviItem><SlyledLink to='/generator'>SQL</SlyledLink></StyledNaviItem>  
                </StyledNavi>
            </StyledHeader>
    )
}

export default Header;