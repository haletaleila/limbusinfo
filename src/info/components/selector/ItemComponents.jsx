import React, { useEffect, useState } from "react";
import {
  EgoBox,
  EgoDiv,
  EgoTitleTextDescDiv,
  EgoTitleTextName,
  FilterButton,
  HighlightedText,
  SdivImage,
  StyledNameSpan,
  SyncText,
} from "../../selector/SelectorStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

const ItemComponents = ({
  item,
  searchTerm,
  handleKeywordClick,
  highlightText,
}) => {
  const [currentText, setCurrentText] = useState(""); // 현재 텍스트 상태
  const [currentResult, setCurrentResult] = useState(""); // 현재 결과 상태
  const [nextChoices, setNextChoices] = useState(null); // 다음 선택지 상태

  const handleButtonClick = (choice) => {
    // 현재 텍스트와 결과를 업데이트
    setCurrentText(choice.text || "");
    setCurrentResult(choice.result || "");

    // 새로운 선택지가 있으면 상태 변수에 저장, 없다면 바로 렌더링
    if (choice.choices && choice.choices.length > 0) {
      setNextChoices(choice.choices);
    } else {
      setNextChoices(null); // 선택지가 더 이상 없다면 null로 설정
      // 여기서 바로 text와 result를 렌더링할 수 있습니다.
      // 이미 setCurrentText와 setCurrentResult에서 업데이트 했기 때문에
      // 별도의 로직은 필요하지 않습니다.
    }
  };

  useEffect(() => {
    // 초기 choices가 하나이고, 그 하나가 text와 result만 있는 경우
    if (item.choices && item.choices.length === 1) {
      const singleChoice = item.choices[0];
      if (!singleChoice.choicesText) {
        handleButtonClick(singleChoice);
      }
    }
  }, [item]);

  return (
    <EgoBox>
      <EgoDiv>
        <EgoTitleTextDescDiv style={{ marginBottom: "20px" }}>
          <StyledNameSpan fontColor={"없음"}>{item.title}</StyledNameSpan>
        </EgoTitleTextDescDiv>
        <SdivImage
          src={`${process.env.PUBLIC_URL}/assets/images/selector/${item.img}`}
          alt={item.title}
        />
        <EgoTitleTextName>
          <EgoTitleTextDescDiv>{item.text}</EgoTitleTextDescDiv>

          {/* 초기 선택지 렌더링 */}
          {item.choices &&
            item.choices.map(
              (choice) =>
                choice.choicesText && ( // choicesText가 있는 경우에만 버튼을 렌더링
                  <FilterButton
                    key={choice.id}
                    recommend={choice.recommend}
                    onClick={() => handleButtonClick(choice)}
                  >
                    {choice.choicesText}
                  </FilterButton>
                )
            )}

          {/* 선택에 따른 텍스트와 결과 렌더링 */}
          <EgoTitleTextDescDiv>
            {currentText && <div>{currentText}</div>}
          </EgoTitleTextDescDiv>
          <EgoTitleTextDescDiv>
            {currentResult && <div>{currentResult}</div>}
          </EgoTitleTextDescDiv>

          {/* 추가 선택지 렌더링 */}
          {nextChoices &&
            nextChoices.map(
              (choice) =>
                choice.choicesText && ( // choicesText가 있는 경우에만 버튼을 렌더링
                  <FilterButton
                    key={choice.id}
                    recommend={choice.recommend}
                    onClick={() => handleButtonClick(choice)}
                  >
                    {choice.choicesText}
                  </FilterButton>
                )
            )}
        </EgoTitleTextName>
      </EgoDiv>
    </EgoBox>
  );
};

export default React.memo(ItemComponents);
