import styled from "styled-components";

export const NewsContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const NewsDiv = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: box-shadow 0.3s ease;
  border: 1px solid #ccc;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

// 새로운 스타일 컴포넌트
export const AccordionTitle = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  font-weight: bold;
  background-color: #f1f1f1;
`;

export const AccordionContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  padding: 0.5rem;
  border-top: 1px solid #ccc;
`;

export const ImageContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  width: auto;
  height: 30rem;

  img {
    max-width: 30rem;
    height: 100%;
    margin-right: 16px;
  }
`;

export const Description = styled.div`
  padding: 0.5rem;
`;

export const FilterButton = styled.button`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: none;
  border-radius: 3px;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  margin: 0 10px;
  cursor: pointer;
  transition: background 0.5s ease;

  &:hover {
    background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%);
  }

  &:focus {
    outline: none;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  img {
    max-width: 90%;
    max-height: 90%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Desc = styled.div`
  word-break: keep-all;
  white-space: pre-line;
`;

export const LoadingAni = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.div`
  position: fixed;
  left: 48.5%;
  top: 58%;
`;
