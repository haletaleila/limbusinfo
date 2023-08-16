import React from "react";
import {
  HighlightedText,
  PassiveBox,
  PassiveNameBox,
  PassiveNameText,
  PassiveTextDiv,
  PassiveTextDivLeft,
  PassiveTextDivRight,
  SkillImage,
} from "../../ego/EgoInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

const Passive = ({ passive, type }) => (
  <PassiveBox>
    <PassiveNameBox skill={passive.prop}>
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
