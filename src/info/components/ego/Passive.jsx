import React from "react";
import {
  HighlightedText,
  PassiveBox,
  PassiveNameBox,
  PassiveNameText,
  PassiveText,
  PassiveTextDiv,
  PassiveTextDivRight,
} from "../../ego/EgoInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

const Passive = ({ passive, type, tooltip }) => (
  <PassiveBox>
    <PassiveNameBox skill={"없음"}>
      <PassiveNameText>
        <PassiveText>{passive.name}</PassiveText>
      </PassiveNameText>
    </PassiveNameBox>
    <PassiveTextDiv>
      <PassiveTextDivRight>
        <HighlightedText
          text={passive.passdescription}
          colorMap={ColorMap}
          tooltipMap={ToolTipMap}
          tooltip={tooltip}
        ></HighlightedText>
      </PassiveTextDivRight>
    </PassiveTextDiv>
  </PassiveBox>
);

export default Passive;
