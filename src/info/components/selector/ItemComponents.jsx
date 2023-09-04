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
  const [nextChoices, setNextChoices] = useState(null);

  const handleButtonClick = (choice) => {
    console.log(choice.choicesText); // 기존 로직

    if (choice.choices && choice.choices.length > 0) {
      setNextChoices(choice.choices);
    }

    // 현재 텍스트와 결과를 업데이트
    setCurrentText(choice.text || "");
    setCurrentResult(choice.result || "");
  };

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
          {
            // choices 배열을 맵핑하여 각 choicesText를 버튼으로 만듭니다.
            item.choices &&
              item.choices.map((choice) => (
                <FilterButton
                  key={choice.id}
                  recommend={choice.recommend}
                  onClick={() => handleButtonClick(choice)} // 이 부분을 수정
                >
                  {choice.choicesText}
                </FilterButton>
              ))
          }
          {currentText && <div>{currentText}</div>}
          {currentResult && <div>{currentResult}</div>}
        </EgoTitleTextName>
      </EgoDiv>
    </EgoBox>
  );
};

export default React.memo(ItemComponents);
