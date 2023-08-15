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
} from "../../Identity/IdentityInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";

const Passive = ({ passive, type }) => (
  <PassiveBox>
    <PassiveNameBox skill={passive.prop}>
      <PassiveNameText>{passive.name}</PassiveNameText>
    </PassiveNameBox>
    <PassiveTextDiv>
      <PassiveTextDivLeft>
        <SkillImage
          alt={passive.prop}
          src={`${process.env.PUBLIC_URL}/assets/images/etc/prop/${passive.prop}icon.webp`}
          style={{ marginLeft: "1rem", width: "1.5rem", height: "1.7rem" }}
        />{" "}
        x {passive.poss} {passive.posstype}
      </PassiveTextDivLeft>
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
