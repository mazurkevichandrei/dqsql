import styled, {css} from "styled-components";

const ButtonMain = styled.button`
    display: flex;
    padding: 5px;
    cursor: pointer;
    margin-right:5px;
    border: 0;
    opacity: .8;
    background: rgb(57, 194, 215);
    color: #fff;
    ${props => props.isActive===true && css `
    background: rgb(163, 198, 68);
    `};
    &:hover {
        opacity: 1;   
    }
    transition: all linear .3s;
    box-sizing: border-box;
`;

export default ButtonMain;