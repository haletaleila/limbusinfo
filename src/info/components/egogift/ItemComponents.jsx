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

const ItemComponents = ({
  item,
  searchTerm,
  filterTerm,
  handleKeywordClick,
  highlightText,
}) => {
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
        />
        <EgoTitleTextName>
          <EgoTitleTextDescDiv>가격 : {item.price}원</EgoTitleTextDescDiv>
          <EgoTitleTextDescDiv>환상체: {item.abnormality}</EgoTitleTextDescDiv>
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
