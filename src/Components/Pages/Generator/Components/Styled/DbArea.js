import styled, {css} from "styled-components";

const DbArea = styled.textarea`
resize: none;
max-width: 300px;
width: 100%;
margin-bottom: 5px;
${props => props.visible===false && css `
    display: none;
    `};
`;

export default DbArea;