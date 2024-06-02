import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    border-radius: 10px;
    padding: 10px;

    img {
        max-width: 100%;
        display: block;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    button {
        display: block;
        background-color: #756DF4;
        border: 0;
        color: #FFF;
        padding: 8px 16px;
        font-size: 15px;
        border-radius: 10px;
        margin: 10px auto 0 auto;
        cursor: pointer;

        &:hover {
            opacity: .9;
        }
    }
`;

export const DeleteButton = styled.button`


background-color:#6B238E;
      border:0;
      color:#FFF;
      padding :8px 16px;
      font-size: 15px;
     
      font-weight:bold;
      border-radius:60px;
      margin-top: 10px;
      margin-right: 30px;
      cursor:pointer;
      max-width: 100%;
      display: block;
        

`;
