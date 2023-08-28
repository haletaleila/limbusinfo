import styled from "styled-components";
import React from "react";

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
  display: flex;
  overflow-x: auto;
  padding: 0.5rem 0;

  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 200px;
    margin-right: 0.5rem;
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
