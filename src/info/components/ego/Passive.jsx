import React from "react";
import {
  HighlightedText,
  PassiveBox,
  PassiveNameBox,
  PassiveNameText,
  PassiveTextDiv,
  PassiveTextDivRight,
} from "../../ego/EgoInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

const Passive = ({ passive, type }) => (
  <PassiveBox>
    <PassiveNameBox skill={"없음"}>
      <PassiveNameText>{passive.name}</PassiveNameText>
    </PassiveNameBox>
    <PassiveTextDiv>
      <PassiveTextDivRight>
        <HighlightedText
          text={passive.passdescription}
          colorMap={ColorMap}
          tooltipMap={ToolTipMap}
        ></HighlightedText>
      </PassiveTextDivRight>
    </PassiveTextDiv>
  </PassiveBox>
);

export default Passive;
