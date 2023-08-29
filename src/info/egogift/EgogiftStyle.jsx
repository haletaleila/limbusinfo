import styled from "styled-components";
import React from "react";
import { ImageMap } from "../components/Mapper/ImageMap";

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

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.625rem;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  background-color: #f5f5f5; // 배경색 변경
  border-radius: 1rem; // 라운드 처리
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
`;

export const SearchSpan = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem; // 오른쪽 마진 추가
`;

export const SearchDivDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

export const ResetButton = styled.button`
  padding: 0.5rem 1rem; // 버튼 내부 패딩
  margin-left: auto; // 자동 왼쪽 마진으로 오른쪽에 위치하게 함
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer; // 마우스 커서를 포인터로 변경
  background-color: #ddd; // 배경색 설정
  outline: none;
  transition: all 0.3s ease-in-out;
  margin-left: auto;

  &:hover {
    background-color: #ccc; // 호버 시 배경색 약간 어둡게
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 호버 시 그림자 효과 추가
  }
`;
export const InputKeyword = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 호버 및 포커스 시 그림자 효과 추가
  }
`;
