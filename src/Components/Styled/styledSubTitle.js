import styled, {css} from "styled-components";

const StyledSubTitle = styled.span`
    font-size: 15px;
    //padding-left: 15px;
    ${props => props.visible===false && css `
    display: none;
    `};
`
export default StyledSubTitle;