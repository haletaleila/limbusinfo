import React from "react";
import {
  SkillBox,
  SkillCoinDiv,
  SkillNameBox,
  SkillNameText,
  HighlightedText,
  SkillPImage,
  SkillText,
  ImageContainer,
  BorderImage,
  BorderImageSVG,
} from "../../ego/EgoInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";
import SkillTable from "./SkillTable";

function arabicToRoman(num) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = "";

  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      roman += key;
      num -= romanNumerals[key];
    }
  }

  return roman;
}

const Skill = ({ skill, character, position, skillname }) => {
  return (
    <SkillBox>
      <SkillCoinDiv>
        {Array.from({ length: skill.coin }, (_, i) => (
          <img
            key={i}
            src={`${process.env.PUBLIC_URL}/assets/images/etc/coin/coinicon.webp`}
            alt="coin"
          />
        ))}
      </SkillCoinDiv>
      <SkillNameBox skill={skill.prop}>
        <SkillNameText>
          <SkillPImage
            alt={skill.name}
            src={`${process.env.PUBLIC_URL}/assets/images/etc/skill/${skill.skill}.webp`}
          />
          <SkillText prop={skill.prop}>
            [{skillname}] {skill.name}
          </SkillText>
        </SkillNameText>
      </SkillNameBox>
      <SkillTable skill={skill} style={{ whiteSpace: "pre-line" }} />
      {skill.hit.start && (
        <div style={{ marginTop: ".8125rem", whiteSpace: "pre-line" }}>
          <HighlightedText
            text={skill.hit.start}
            colorMap={ColorMap}
            tooltipMap={ToolTipMap}
          ></HighlightedText>
        </div>
      )}
      {Object.entries(skill.hit).map(([key, value], index) => {
        if (key.startsWith("h") && value !== "") {
          const romanNumeral = key.slice(1); // 로마 숫자 추출
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: ".8125rem",
                whiteSpace: "pre-line",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/coin/coinvalue.webp`}
                  alt={`coinvalue${romanNumeral}`}
                  style={{ width: "1.5rem", height: "1.5rem" }} // 이미지 크기 조절
                />
                <span
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white", // 로마 숫자 색상
                    fontWeight: "200", // 로마 숫자 글자 두께
                    fontSize: "0.02rem", // 로마 숫자 크기
                  }}
                >
                  {arabicToRoman(romanNumeral)}
                </span>
              </div>
              <div>
                <HighlightedText
                  text={value}
                  colorMap={ColorMap}
                  tooltipMap={ToolTipMap}
                ></HighlightedText>
              </div>
            </div>
          );
        }
        return null;
      })}
      {skill.hit.end && (
        <div style={{ marginTop: ".8125rem", whiteSpace: "pre-line" }}>
          <HighlightedText
            text={skill.hit.end}
            colorMap={ColorMap}
            tooltipMap={ToolTipMap}
          ></HighlightedText>
        </div>
      )}
    </SkillBox>
  );
};

export default Skill;
