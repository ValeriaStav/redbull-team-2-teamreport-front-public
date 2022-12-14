import styled from "styled-components";

export const OptionsPanel = styled.div`
  background: white;
  box-shadow: 0 3px 9px 0 rgb(34 60 80 / 40%);
  display: flex;
  justify-content: end;
  font-weight: bold;
  margin-inline: 110px;
  border-radius: 2px;
`
export const OlderPanel = styled.div`
  display: flex;
  justify-content: end;
  font-weight: bold;
  margin-inline: 65px;
  border-radius: 2px;
`

export const HeaderText = styled.p`
  color: white;
  font-size: 30px;
`
export const Switches = styled.p`
  display: inline-block;
  background: black;
  color: ${({active}) => ( active ? "rgb(255,255,255)" : "rgba(255,255,255,0.7)")};
  padding: 5px;
  padding-inline: 20px;
  cursor: pointer;
  border:${({active}) => (active ? "2px solid rgb(252,210,20)" : "")} ;
  
  &:hover{
    color: rgb(255,255,255);
  }
`

