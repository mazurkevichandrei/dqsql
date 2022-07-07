import { NavLink } from 'react-router-dom';
import styled from "styled-components";

const activeClassName = "nav-item-active";

const SlyledLink = styled(NavLink).attrs({ activeClassName })`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    padding: 0 15px;
    text-decoration: none;
    border-bottom: 3px solid #231f20;
    color: rgba(245, 245, 245, .9);
    &:hover {
        background-color: rgba(33, 33, 33);
        color: rgba(245, 245, 245, 0.9);
        }
    &.${activeClassName}  {
        border-bottom: 3px solid rgb(57, 194, 215);
        //color: rgba(245, 245, 245, 0.9);
        color: rgb(57, 194, 215);
        }
    transition: all linear .3s;
`;

export default SlyledLink;