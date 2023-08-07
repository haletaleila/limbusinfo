import React from "react";
import {
  HighlightedText,
  PassiveBox,
  SkillDiv,
  SkillImage,
  SkillNameBox,
  SkillNameText,
} from "../IdentityInfoStyle";
import { ColorMap } from "./Mapper/ColorMap";
import { ToolTipMap } from "./Mapper/ToolTipMap";

const Passive = ({ passive }) => (
  <PassiveBox>
    <SkillNameBox skill={passive.prop}>
      <SkillNameText style={{ marginLeft: "2rem" }}>
        {passive.name}{" "}
        <SkillImage
          alt={passive.prop}
          src={`${process.env.PUBLIC_URL}/assets/images/etc/prop/${passive.prop}icon.webp`}
          style={{ marginLeft: "1rem", width: "2rem", height: "2rem" }}
        />{" "}
        x {passive.poss} {passive.posstype}
      </SkillNameText>
    </SkillNameBox>
    <SkillDiv></SkillDiv>
    <div>
      <HighlightedText
        text={passive.passdescription}
        colorMap={ColorMap}
        tooltipMap={ToolTipMap}
      ></HighlightedText>
    </div>
  </PassiveBox>
);

export default Passive;
