import styled from "styled-components";
import React from "react";
import { ImageMap } from "./components/Mapper/ImageMap";
import { ToolTipMap } from "./components/Mapper/ToolTipMap";

const rows = 2;
const columns = 6;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  border: 0.0625rem solid #ccc;
  padding: 0.625rem;
  z-index: 1;
  top: 1.25rem;
  left: 0;
  white-space: pre;
  color: black;
`;

const Highlight = styled.span`
  color: ${(props) => props.color || "black"};
  position: relative;

  &:hover ${Tooltip} {
    display: block;
  }
`;

const TooltipImage = styled.img`
  width: 36px;
  margin-right: 0.5rem;
  vertical-align: middle;
`;

const TooltipTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
`;

const TooltipContent = styled.div`
  margin-top: 1rem;
`;

export function HighlightedText({ text, colorMap = {}, tooltipMap = {} }) {
  let parts = [];
  let index = 0;

  while (index < text.length) {
    let longestMatch = null;

    // colorMap과 tooltipMap의 모든 키를 검사합니다.
    for (let key of [...Object.keys(colorMap), ...Object.keys(tooltipMap)]) {
      if (
        text.substr(index, key.length) === key &&
        (longestMatch === null || key.length > longestMatch.length)
      ) {
        longestMatch = key;
      }
    }

    if (longestMatch) {
      parts.push(
        <Highlight key={index} color={colorMap[longestMatch]}>
          {longestMatch}
          {tooltipMap[longestMatch] && (
            <Tooltip>
              <TooltipTitle>
                {ImageMap[longestMatch] && (
                  <TooltipImage
                    src={ImageMap[longestMatch]}
                    alt={longestMatch}
                  />
                )}
                {longestMatch}
              </TooltipTitle>
              <TooltipContent
                dangerouslySetInnerHTML={{ __html: tooltipMap[longestMatch] }}
              />
            </Tooltip>
          )}
        </Highlight>
      );
      index += longestMatch.length;
    } else {
      parts.push(text[index]);
      index++;
    }
  }

  return <>{parts}</>;
}

const skillColors = {
  분노: "#c60e0e",
  색욕: "#e46627",
  나태: "#f3b73f",
  탐식: "#92dc1b",
  우울: "#18849b",
  오만: "#195188",
  질투: "#5c0288",
  없음: "#9f6b3a",
};

export const IIDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, auto);
  overflow-x: auto; // 추가: 스크롤 가능하도록 설정

  & > * {
    max-width: 100%; // 각 아이템의 최대 너비 설정
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
  }
`;

export const IIdivImage = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 1px solid #eee;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  &:active {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

export const Sdiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
  flex-direction: row;
  overflow-x: auto; // 추가: 스크롤 가능하도록 설정

  & > * {
    max-width: 100%; // 각 아이템의 최대 너비 설정
  }
`;

export const SdivItem = styled.div`
  /* flex: 1 0 20%; */
  padding: 1rem;

  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
  border-radius: 10px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: box-shadow 0.3s ease;
  border: 1px solid #ccc;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

export const SdivImage = styled.img`
  width: 30rem;
  height: 20rem;
  max-width: 80%;
  border-radius: 0.625rem;
  flex: 1;
  object-fit: cover;
  margin-right: 1rem;
  margin-bottom: 0.625rem;
`;

export const SdivSungImage = styled.img`
  flex: 1rem;
  width: 1rem;
`;

export const SdivTitleTextDiv = styled.div`
  text-align: center;
  flex: 3;
  padding: 1rem;
  flex-direction: row;
`;

export const SdivTitleTextName = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.625rem;
  flex: 1;
`;

export const SdivTitleTextDesc = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.625rem;
`;

export const SdivInfo = styled.div`
  flex: 6.5;
`;

export const ResiDiv = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

export const ResiText = styled.span`
  color: ${(props) => props.color || "black"};
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 1rem;
`;

export const ResiIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-bottom: 0.625rem;
  margin-right: 0.5rem;
`;

export const StatusDiv = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

export const StatusText = styled.span`
  /* color: ${(props) => props.color || "black"}; */
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 1rem;
`;

export const StatusIcon = styled.img`
  width: 1.2rem;
  height: auto;
  margin-bottom: 0.625rem;
  margin-right: 0.5rem;
`;

export const SyncDiv = styled.div`
  margin-bottom: 0.625rem;
`;

export const SyncText = styled.p`
  font-size: 1rem;
  font-weight: 800;
`;

export const SyncButton = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  background-color: ${({ active }) => (active ? "#007BFF" : "skyblue")};
  border: none;
  color: white;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin: 0.625rem 1rem;

  &:active {
    background-color: #599df6;
  }
`;

export const HighlightText = {
  backgroundColor: "#00ffcc",
};

//background-image: linear-gradient(110deg, ${({skill}) => skillColors[skill]} 70%, transparent 70%, transparent 72%, ${({skill}) => skillColors[skill]} 72%, ${({skill}) => skillColors[skill]} 74%,transparent 74%, transparent 76%, ${({skill}) => skillColors[skill]} 76%, ${({skill}) => skillColors[skill]} 78%, transparent 78%, transparent 80%, ${({skill}) => skillColors[skill]} 80%, ${({skill}) => skillColors[skill]} 82%, transparent 82%);

export const SPGrid = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;

export const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex: 1;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); // 모바일 화면에서는 2개의 컬럼으로 설정
  }
`;

export const SkillBox = styled.div`
  border-radius: 10px;
  padding: 1rem;
  transition: box-shadow 0.3s ease;
  border: 0.0625rem solid #ccc;

  &:hover {
    box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.3);
  }
`;

export const PassiveBox = styled(SkillBox)``;

export const PassiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      1,
      1fr
    ); // 모바일 화면에서는 2개의 컬럼으로 설정
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

export const SkillNameBox = styled.div`
  background-image: linear-gradient(
    115deg,
    ${({ skill }) => skillColors[skill]} 75%,
    transparent 75%,
    transparent 77%,
    ${({ skill }) => skillColors[skill]} 77%,
    ${({ skill }) => skillColors[skill]} 79%,
    transparent 79%,
    transparent 81%,
    ${({ skill }) => skillColors[skill]} 81%,
    ${({ skill }) => skillColors[skill]} 83%,
    transparent 83%,
    transparent 85%,
    ${({ skill }) => skillColors[skill]} 85%,
    ${({ skill }) => skillColors[skill]} 85%,
    transparent 90%
  );
  height: 2rem;
  width: auto;
  @media screen and (max-width: 1024px) {
    height: 3.5rem;
  }
`;

export const PassiveNameBox = styled.div`
  background-image: linear-gradient(
    115deg,
    ${({ skill }) => skillColors[skill]} 75%,
    transparent 75%,
    transparent 77%,
    ${({ skill }) => skillColors[skill]} 77%,
    ${({ skill }) => skillColors[skill]} 79%,
    transparent 79%,
    transparent 81%,
    ${({ skill }) => skillColors[skill]} 81%,
    ${({ skill }) => skillColors[skill]} 83%,
    transparent 83%,
    transparent 85%,
    ${({ skill }) => skillColors[skill]} 85%,
    ${({ skill }) => skillColors[skill]} 85%,
    transparent 90%
  );
  height: 2rem;
  width: auto;
`;

export const SkillNameText = styled.strong`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.3rem;
  display: flex;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const PassiveNameText = styled.strong`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.2rem;
  display: flex;
`;

export const SkillPImage = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
`;

export const SkillCoinDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 1rem;
  width: auto;
`;

export const SkillImage = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.4rem;
`;

export const SkillDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
  height: 1.5rem;
  width: auto;
  align-items: center;
  justify-content: center;
  padding-left: 0.25rem;
`;

export const SkillGridP = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.4rem;
  margin-right: 1rem;
  height: 1.5rem;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.25rem;

  & > * {
    border: 1px solid #ccc; // 각 그리드 셀에 테두리를 추가합니다.
    padding: 0.2rem; // 셀 안의 내용과 테두리 사이에 약간의 공간을 추가합니다.
  }
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

export const SearchDivDiv = styled.div``;
