import React from "react";
import {
  SkillBox,
  SkillCoinDiv,
  SkillNameBox,
  SkillNameText,
  SkillDiv,
  SkillImage,
  HighlightedText,
  SkillGridP,
  SkillPImage,
} from "../IdentityInfoStyle";
import { ColorMap } from "./Mapper/ColorMap";
import { ToolTipMap } from "./Mapper/ToolTipMap";
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

const Skill = ({ skill, character, position }) => {
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
            src={`${process.env.PUBLIC_URL}/assets/images/etc/skill/${position}${character}${skill.skill}.webp`}
          ></SkillPImage>
          {skill.name}
        </SkillNameText>
      </SkillNameBox>
      <SkillTable skill={skill} />
      {/* <SkillDiv>
      {skill.skilltype === "공격" ? (
        <SkillImage
          alt="공격"
          src={`${process.env.PUBLIC_URL}/assets/images/etc/level/공격레벨.webp`}
        />
      ) : (
        <SkillImage
          alt="수비"
          src={`${process.env.PUBLIC_URL}/assets/images/etc/level/회피레벨.webp`}
        />
      )}
      {skill.level}
    </SkillDiv>
    {skill.skilltype === "공격" ? (
      <SkillDiv>
        <SkillImage
          alt={skill.type}
          src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${skill.type}.webp`}
        />
        {skill.type}
      </SkillDiv>
    ) : (
      <SkillDiv>{skill.type}</SkillDiv>
    )}
    {skill.prop === "없음" ? (
      <SkillDiv>{skill.prop}</SkillDiv>
    ) : (
      <SkillDiv>
        <SkillImage
          alt={skill.prop}
          src={`${process.env.PUBLIC_URL}/assets/images/etc/prop/${skill.prop}icon.webp`}
        ></SkillImage>
        {skill.prop}
      </SkillDiv>
    )}
    <SkillDiv>스킬 위력 : {skill.power}</SkillDiv>
    <SkillDiv>
      {skill.coinpower > 0
        ? `코인 위력 : +${skill.coinpower}`
        : `코인 위력 : ${skill.coinpower}`}
    </SkillDiv>
    <SkillDiv>공격 가중치(범위공격) : {skill.weight}</SkillDiv> */}
      {skill.hit.start && (
        <div style={{ marginTop: ".8125rem" }}>
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
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/coin/coinvalue.webp`}
                  alt={`coinvalue${romanNumeral}`}
                  style={{ width: "1.25rem", height: "1.25rem" }} // 이미지 크기 조절
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white", // 로마 숫자 색상
                    fontWeight: "bold", // 로마 숫자 글자 두께
                    fontSize: "0.8rem", // 로마 숫자 크기
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
        <div style={{ marginTop: ".8125rem" }}>
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
