import React, { useEffect } from "react";
import {
  EgoBox,
  EgoDiv,
  EgoTitleTextDescDiv,
  EgoTitleTextName,
  HighlightedText,
  SdivImage,
  StyledNameSpan,
  SyncText,
} from "../../egogift/EgogiftStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

import { useNavigate } from "react-router-dom";

const ItemComponents = ({
  item,
  searchTerm,
  handleKeywordClick,
  highlightText,
}) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleEgoClick = (giftInfo) => {
    if (item.abnormality !== "?") {
      navigate("/selector", { state: { giftInfo } }); // navigate 함수를 사용하여 정보와 함께 egogiftinfo로 이동합니다.
    }
  };
  return (
    <EgoBox>
      <EgoDiv>
        <EgoTitleTextDescDiv style={{ marginBottom: "20px" }}>
          <StyledNameSpan fontColor={item.prop}>
            {item.title} - ({item.rank} 등급)
          </StyledNameSpan>
        </EgoTitleTextDescDiv>
        <SdivImage
          src={`${process.env.PUBLIC_URL}/assets/images/egogift/${item.img}`}
          alt={item.title}
          onClick={() => handleEgoClick(item.abnormality)}
        />
        <EgoTitleTextName>
          <EgoTitleTextDescDiv>가격 : {item.price}원</EgoTitleTextDescDiv>
          {/* <EgoTitleTextDescDiv>환상체: {item.abnormality}</EgoTitleTextDescDiv> */}
          <EgoTitleTextDescDiv
            onClick={() => handleEgoClick(item.abnormality)}
            isAbnormal={item.abnormality !== "?"}
          >
            환상체: {item.abnormality}
          </EgoTitleTextDescDiv>
          <EgoTitleTextDescDiv
            style={{
              fontSize: "1rem",
              wordBreak: "keep-all",
              whiteSpace: "pre-line",
            }}
          >
            <HighlightedText
              text={item.desc}
              colorMap={ColorMap}
              tooltipMap={ToolTipMap}
              // tooltip={tooltip}
            ></HighlightedText>
          </EgoTitleTextDescDiv>
          <br />
          <EgoTitleTextDescDiv>
            <SyncText>
              키워드 :{" "}
              {item.keyword
                .map((key, index) => (
                  <span key={index} onClick={() => handleKeywordClick(key)}>
                    {highlightText(key, searchTerm)}
                  </span>
                ))
                .reduce((prev, curr, i) => {
                  return i === 0 ? [curr] : [...prev, ", ", curr];
                }, [])}
            </SyncText>
          </EgoTitleTextDescDiv>
        </EgoTitleTextName>
      </EgoDiv>
    </EgoBox>
  );
};

export default React.memo(ItemComponents);
