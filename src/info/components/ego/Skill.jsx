import React from "react";
import {
  SkillBox,
  SkillCoinDiv,
  SkillNameBox,
  SkillNameText,
  HighlightedText,
  SkillPImage,
  SkillText,
  SkillNameTBox,
  SkillNameTBoxEx,
  SkillNameBoxEx,
  SkillDiv,
  SkillImage,
  SkillContainer,
  HorizontalGroup,
} from "../../ego/EgoInfoStyle";
import { ColorMap } from "../Mapper/ColorMap";
import { ToolTipMap } from "../Mapper/ToolTipMap";
import SkillTable from "./SkillTable";
import { styled } from "styled-components";

const versionLevel = 35;

function calculateDifference(value, versionLevel) {
  const difference = value - versionLevel;
  if (difference > 0) {
    return `${value}(+${difference})`;
  } else if (difference < 0) {
    return `${value}(${difference})`;
  } else if (difference === 0) {
    return `${value}(0)`;
  } else {
    return `${value}`;
  }
}

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

const SkillDetail = styled.div``;

const Skill = ({ skill, character, name, skillname }) => {
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
      {skill.name === "각성" ? (
        <SkillContainer>
          <SkillDetail
            style={{
              marginLeft:
                skill.power > 9 && skill.coinpower < 10
                  ? "3.1rem"
                  : skill.power > 9 && skill.coinpower >= 10
                  ? "2.6rem"
                  : skill.power <= 9 && skill.coinpower < 10
                  ? "2.6rem"
                  : "3.3rem",
              fontSize: "1.3rem",
              marginBottom: "-0.25rem",
            }}
          >
            {skill.coinpower > 0 ? `+${skill.coinpower}` : skill.coinpower}
          </SkillDetail>
          <HorizontalGroup>
            <SkillNameTBox>
              <SkillNameBox skill={skill.prop}>
                <SkillNameText>
                  <SkillDetail
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "0.4rem",
                      textShadow: "2px 2px 1px rgba(0, 0, 0, 1)",
                    }}
                  >
                    {skill.power}
                  </SkillDetail>
                  <SkillPImage
                    alt={skill.name}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/skill/${skillname}${character}${skill.name}.webp`}
                  />
                  <SkillText>{skill.name}</SkillText>
                </SkillNameText>
              </SkillNameBox>
            </SkillNameTBox>
          </HorizontalGroup>
          <SkillDetail
            style={{
              marginLeft:
                skill.power > 9 && skill.coinpower < 10
                  ? "3.1rem"
                  : skill.power > 9 && skill.coinpower >= 10
                  ? "2.6rem"
                  : skill.power <= 9 && skill.coinpower < 10
                  ? "2.6rem"
                  : "3.3rem",
            }}
          >
            <SkillDiv style={{ marginTop: "-0.2rem" }}>
              {skill.catype ? (
                <>
                  <SkillImage
                    alt={skill.catype}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${skill.catype}.webp`}
                  />
                </>
              ) : skill.skilltype === "공격" ? (
                <>
                  <SkillImage
                    alt={skill.type}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${skill.type}.webp`}
                  />
                </>
              ) : (
                <SkillImage
                  alt={skill.type}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/level/회피레벨.webp`}
                  style={{ marginLeft: "0.4rem" }}
                />
              )}
            </SkillDiv>
          </SkillDetail>
        </SkillContainer>
      ) : (
        <SkillContainer>
          <SkillDetail
            style={{
              marginLeft:
                skill.power > 9 && skill.coinpower < 10
                  ? "3.1rem"
                  : skill.power > 9 && skill.coinpower >= 10
                  ? "2.6rem"
                  : skill.power <= 9 && skill.coinpower < 10
                  ? "2.6rem"
                  : "3.3rem",
              fontSize: "1.3rem",
              marginBottom: "-0.25rem",
            }}
          >
            {skill.coinpower > 0 ? `+${skill.coinpower}` : skill.coinpower}
          </SkillDetail>
          <HorizontalGroup>
            <SkillNameTBoxEx skill={skill.prop}>
              <SkillNameBoxEx>
                <SkillNameText>
                  <SkillDetail
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "0.4rem",
                      textShadow: "2px 2px 1px rgba(0, 0, 0, 1)",
                    }}
                  >
                    {skill.power}
                  </SkillDetail>
                  <SkillPImage
                    alt={skill.name}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/skill/${skillname}${character}${skill.name}.webp`}
                  />
                  <SkillText>{skill.name}</SkillText>
                </SkillNameText>
              </SkillNameBoxEx>
            </SkillNameTBoxEx>
          </HorizontalGroup>
          <SkillDetail
            style={{
              marginLeft:
                skill.power > 9 && skill.coinpower < 10
                  ? "3.1rem"
                  : skill.power > 9 && skill.coinpower >= 10
                  ? "2.6rem"
                  : skill.power <= 9 && skill.coinpower < 10
                  ? "2.6rem"
                  : "3.3rem",
            }}
          >
            <SkillDiv style={{ marginTop: "-0.2rem" }}>
              {skill.catype ? (
                <>
                  <SkillImage
                    alt={skill.catype}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${skill.catype}.webp`}
                  />
                </>
              ) : skill.skilltype === "공격" ? (
                <>
                  <SkillImage
                    alt={skill.type}
                    src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/${skill.type}.webp`}
                  />
                </>
              ) : (
                <SkillImage
                  alt={skill.type}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/level/회피레벨.webp`}
                  style={{ marginLeft: "0.4rem" }}
                />
              )}
            </SkillDiv>
          </SkillDetail>
        </SkillContainer>
      )}

      {/* <SkillTable skill={skill} style={{ whiteSpace: "pre-line" }} />
      {skill.hit.start && (
        <div
          style={{
            marginTop: ".8125rem",
            whiteSpace: "pre-line",
            wordBreak: "keep-all",
          }}
        >
          <HighlightedText
            text={skill.hit.start}
            colorMap={ColorMap}
            tooltipMap={ToolTipMap}
          ></HighlightedText>
        </div>
      )} */}

      <SkillDiv>
        <SkillImage
          alt={skill.skilltype}
          src={
            skill.skilltype === "공격" || skill.catype === "반격"
              ? `${process.env.PUBLIC_URL}/assets/images/etc/level/공격레벨.webp`
              : `${process.env.PUBLIC_URL}/assets/images/etc/level/회피레벨.webp`
          }
        />
        {calculateDifference(skill.attack, versionLevel)}
      </SkillDiv>
      <SkillDiv>
        {skill.skilltype === "공격" || skill.skilltype === "반격"
          ? `공격 가중치 : ${skill.weight}`
          : ""}
      </SkillDiv>
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
                wordBreak: "keep-all",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
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
        <div
          style={{
            marginTop: ".8125rem",
            whiteSpace: "pre-line",
            wordBreak: "keep-all",
          }}
        >
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
