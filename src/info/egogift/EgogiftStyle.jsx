import styled from "styled-components";
import React from "react";
import { ImageMap } from "../components/Mapper/ImageMap";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const rows = 2;
const columns = 6;

const Tooltip = styled.div``;

const Highlight = styled.span`
  color: ${(props) => props.color || "black"};
  position: relative;
  font-weight: 800;
  text-shadow: 0.0313rem 0rem #9a9a9a, 0rem 0.0313rem #9a9a9a;
  word-break: keep-all;
  &:hover ${Tooltip} {
    display: block;
  }
`;

const TooltipImage = styled.img`
  width: auto;
  height: 2.25rem;
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
  word-break: keep-all;
  white-space: pre-line;
  overflow-wrap: break-word;
`;

export function HighlightedText({ text, colorMap = {}, tooltipMap = {} }) {
  let parts = [];
  let index = 0;

  while (index < text.length) {
    let longestMatch = null;

    // colorMap과 tooltipMap 모두를 고려
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
        <Tippy
          content={
            tooltipMap[longestMatch] ? (
              <>
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
              </>
            ) : (
              ""
            )
          }
          // tooltipMap에 있는 키에만 툴팁을 띄움
          disabled={!tooltipMap[longestMatch]}
        >
          <Highlight key={index} color={colorMap[longestMatch]}>
            {longestMatch}
          </Highlight>
        </Tippy>
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

const characterColors = {
  이상: "#d4e1e8",
  파우스트: "#ffb1b4",
  돈키호테: "#ffef23",
  료슈: "#cf0000",
  뫼르소: "#293b95",
  홍루: "#5bffde",
  히스클리프: "#4e3076",
  이스마엘: "#ff9500",
  로쟈: "#820000",
  싱클레어: "#8b9c15",
  오티스: "#325339",
  그레고르: "#69350b",
};

export const IIDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, auto);
  overflow-x: auto; // 추가: 스크롤 가능하도록 설정
  margin: 0.5rem;
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
  margin: 0.5rem;

  &:hover {
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5);
  }
  &:active {
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5);
  }
`;

export const SdivTotal = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const Sdiv = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  margin: 10px 10px 10px 10px;
  flex-direction: row;
  overflow-x: auto; // 추가: 스크롤 가능하도록 설정

  & > * {
    max-width: 100%; // 각 아이템의 최대 너비 설정
  }
`;

export const SdivItem = styled.div`
  /* flex: 1 0 20%; */
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1225px) {
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
  width: 15rem;
  height: auto;
  max-width: 100%;
  border-radius: 0.625rem;
  flex: 1;
  object-fit: cover;
  margin-right: 1rem;
  margin-bottom: 0.625rem;
  &:hover {
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.7);
  }
  box-shadow: 0px 0px 1.0625rem 0.25rem #ffcc99;
`;

export const EgoImage = styled.img`
  flex: 1rem;
  height: 20rem;
  width: auto;
`;

export const EgoDiv = styled.div`
  text-align: center;
  flex: 3;
  padding: 1rem;
  flex-direction: row;
`;

export const EgoTitleTextName = styled.h1`
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 0.625rem;
  flex: 1;
`;

export const EgoTitleTextDescDiv = styled.div`
  margin: 0.325rem;
  font-size: 1rem;
  font-weight: 700;
  white-space: pre-line;
  color: ${(props) => (props.isAbnormal ? "blue" : "inherit")};
`;

export const StyledSpan = styled.span`
  display: inline-block; // 또는 inline-flex
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    ${(props) => characterColors[props.color] || "transparent"} 10%,
    ${(props) => characterColors[props.color] || "transparent"} 90%,
    transparent 100%
  );
  /* background-color: ${(props) =>
    characterColors[props.color] || "transparent"}; */
  /* color: ${(props) => skillColors[props.fontcolor] || "transparent"}; */
  border-radius: 0.3125rem; // 둥근 모서리 스타일 적용
  padding: 0.0625rem 1.25rem;
  line-height: 1.2; // 줄 간격 조절
  word-break: keep-all; // 단어 내에서의 줄바꿈 방지
  color: ${(props) =>
    props.color === "뫼르소" ||
    props.color === "료슈" ||
    props.color === "로쟈" ||
    props.color === "그레고르" ||
    props.color === "싱클레어" ||
    props.color === "히스클리프" ||
    props.color === "오티스"
      ? "whitesmoke"
      : "black"};
`;

export const SdivTitleTextDesc = styled.span`
  word-break: keep-all;
  background-color: ${(props) => characterColors[props.color] || "none"};
  border-radius: 5px;
  color: ${(props) =>
    props.color === "뫼르소" ||
    props.color === "료슈" ||
    props.color === "로쟈" ||
    props.color === "그레고르" ||
    props.color === "싱클레어" ||
    props.color === "히스클리프" ||
    props.color === "오티스"
      ? "whitesmoke"
      : "black"};
  padding: 2px 5px;
  line-height: 1.2; // 줄 간격 조절
`;

export const SdivInfo = styled.div`
  flex: 6.5;
`;

export const ResiDiv = styled.div`
  text-shadow: 2px 3px 1px rgba(0, 0, 0, 1);
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
  white-space: pre-line;
  word-break: keep-all;
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
  @media (max-width: 900px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); // 모바일 화면에서는 2개의 컬럼으로 설정
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(
      1,
      1fr
    ); // 모바일 화면에서는 2개의 컬럼으로 설정
  }
`;

export const EgoBox = styled.div`
  border-radius: 10px;
  padding: 0.1rem;
  transition: box-shadow 0.3s ease;
  border: 0.0625rem solid #ccc;
  flex: 3;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.3);
  }
`;

export const PassiveBox = styled(EgoBox)``;

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

export const SkillText = styled.span`
  color: whitesmoke;
  font-size: 1.2rem;
  font-weight: 900;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.3rem;
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1);
  /* -webkit-text-stroke: 0.2px black; */
  @media screen and (max-width: 1024px) {
    align-items: center;
    justify-content: flex-start;
  }
`;

export const SkillNameTBox = styled.div`
  flex: 1; // 나머지 공간을 모두 차지하도록
  padding: 0.2188rem;
  background-image: linear-gradient(75deg, dimgray 84%, transparent 84%);
`;

export const SkillNameBox = styled.div`
  background-image: linear-gradient(
    115deg,
    ${({ skill }) => skillColors[skill]} 60%,
    transparent 60%,
    transparent 62%,
    ${({ skill }) => skillColors[skill]} 62%,
    ${({ skill }) => skillColors[skill]} 64%,
    transparent 64%,
    transparent 66%,
    ${({ skill }) => skillColors[skill]} 66%,
    ${({ skill }) => skillColors[skill]} 68%,
    transparent 68%,
    transparent 70%,
    ${({ skill }) => skillColors[skill]} 70%,
    ${({ skill }) => skillColors[skill]} 72%,
    transparent 75%
  );
  height: 3.5rem;
  width: 100%;

  border-radius: 5px;
  @media screen and (max-width: 1024px) {
    height: 3.5rem;
  }
`;

export const PassiveTextDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
`;

export const PassiveTextDivLeft = styled.div`
  margin-top: 0.3rem;

  flex: 2.3;
  align-items: center;
  display: flex;
  @media screen and (max-width: 1024px) {
    flex: 3;
    flex-direction: column;
  }
`;

export const PassiveText = styled.span`
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 1);
  /* -webkit-text-stroke: 0.1px black; */
`;

export const PassiveTextDivRight = styled.div`
  flex: 8;
  margin-top: 0.3rem;
  white-space: pre-line;
  word-break: keep-all;
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
  color: whitesmoke;
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.3rem;
  display: flex;
  flex-direction: row;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
  @media screen and (max-width: 1024px) {
    align-items: center;
    justify-content: flex-start;
  }
  word-break: keep-all;
`;

export const PassiveNameText = styled.div`
  color: whitesmoke;
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0.3rem;
  display: flex;
  flex-direction: row;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
  @media screen and (max-width: 1024px) {
    align-items: center;
    justify-content: flex-start;
  }
`;

export const SkillPImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.25rem;
  box-shadow: 0px 0px 0rem 0.1rem #fff8cd;
`;

export const SkillCoinDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 1rem;
  width: auto;
`;

export const SkillImage = styled.img`
  height: auto;
  width: 1rem;
  margin-right: 0.4rem;
`;

export const SkillDiv = styled.div`
  word-break: keep-all;
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

export const SearchDivDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
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

export const PaginationButton = styled.button`
  background-color: #f7f7f7;
  border: 1px solid #d1d1d1;
  color: #555;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ActivePaginationButton = styled(PaginationButton)`
  background-color: #007bff;
  color: white;
  border-color: #007bff;
`;

export const DisabledButton = styled(PaginationButton)`
  cursor: not-allowed;
  opacity: 0.6;
`;

export const SkillContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 10px;
  padding-left: 1rem;
  transition: box-shadow 0.3s ease;
  border: 0.0625rem solid #ccc;
`;

export const HorizontalGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

export const EgoSelectBox = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;

  @media (max-width: 1920px) {
    grid-template-columns: repeat(12, calc(100% / 12));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(8, calc(100% / 8));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(4, calc(100% / 4));
  }
`;

export const EgoBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const StyledNameSpan = styled.span`
  display: inline-block; // 또는 inline-flex
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    ${(props) => skillColors[props.fontColor] || "transparent"} 10%,
    ${(props) => skillColors[props.fontColor] || "transparent"} 90%,
    transparent 100%
  );
  /* background-color: ${(props) =>
    skillColors[props.fontColor] || "transparent"}; */
  border-radius: 0.3125rem; // 둥근 모서리 스타일 적용
  padding: 0.0625rem 1.25rem;

  color: whitesmoke;
  line-height: 1.2; // 줄 간격 조절
  word-break: keep-all; // 단어 내에서의 줄바꿈 방지
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.isSelected ? "#007bff" : "dimgray")};
  border-radius: 5px;
  border: 1px solid ${(props) => (props.isSelected ? "#007bff" : "#ccc")};
  color: ${(props) => (props.isSelected ? "#fff" : "#fff")};
  width: 100%;
  height: 100%;
  cursor: pointer;

  flex-direction: column;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: #2867f9;
    transform: scale(1.05);
  }

  img {
    height: 1.5rem;
  }
`;

export const ButtonText = styled.span`
  font-size: 1rem;
  white-space: pre-line;
  word-break: keep-all;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  margin-left: auto;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
  margin-left: auto;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#007bff" : "#ccc")};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  background-color: ${(props) => (props.isSelected ? "#007bff" : "#fff")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  border: 1px solid ${(props) => (props.isSelected ? "#007bff" : "#ccc")};
  /* 다른 스타일 */
`;

export const RecommendationDiv = styled.div`
  padding: 10px;
  margin: 0;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;

  &:hover {
    background-color: #f0f0f0;
    border-color: #999;
  }
`;

export const RecommendationContainer = styled.div`
  position: absolute;
  top: 100%; // InputKeyword 바로 아래에 나오게 조절
  left: 0;
  z-index: 10;
  width: 10%; // 필요에 따라 조절
  min-width: 10%;
  background-color: #fff;
  border: 1px solid #ccc;

  @media (max-width: 600px) {
    width: 50%;
  }
`;
