import styled, {css} from "styled-components";

const StartBtn = styled.button`
    cursor: pointer;
    //background: rgb(57, 194, 215);
    color: #fff;
    opacity: .8;
    background: rgb(163, 198, 68);
    &:hover {
        opacity: 1;   
    }
    transition: all linear .3s;
    height: 40px;
    disabled: true;
    ${props => props.disabled===true && css `
    background: grey;
    `};
    margin-top: 5px;
`;

export default StartBtn;