import React, { useEffect, useState } from "react";
import {
  EgoBox,
  EgoDiv,
  EgoTitleTextDescDiv,
  EgoTitleTextDescDivResult,
  EgoTitleTextName,
  FilterButton,
  GiftDiv,
  SdivImage,
  SdivItem,
  StyledNameSpan,
} from "../../selector/SelectorStyle";
import { useNavigate } from "react-router-dom";

const styleMap = {
  분노: "#c60e0e",
  색욕: "#e46627",
  나태: "#f3b73f",
  탐식: "#92dc1b",
  우울: "#18849b",
  오만: "#195188",
  질투: "#5c0288",
  체력: "#c60e0e",
  정신력: "#ff6f00",
};

const styleHealMap = {
  분노: "#c60e0e",
  색욕: "#e46627",
  나태: "#f3b73f",
  탐식: "#92dc1b",
  우울: "#18849b",
  오만: "#195188",
  질투: "#5c0288",
  체력: "#92dc1b",
  정신력: "#18849b",
};

const ItemComponents = ({ item }) => {
  const [currentText, setCurrentText] = useState(""); // 현재 텍스트 상태
  const [currentResult, setCurrentResult] = useState(""); // 현재 결과 상태
  const [currentGetGift, setCurrentGetGift] = useState("");
  const [currentGetBattleGift, setCurrentGetBattleGift] = useState("");
  const [currentGetCost, setCurrentGetCost] = useState("");
  const [currentGetBuff, setCurrentGetBuff] = useState("");
  const [currentGetDebuff, setCurrentGetDebuff] = useState("");
  const [currentSuccess, setCurrentSuccess] = useState("");
  const [currentSuccessNum, setCurrentSuccessNum] = useState("");
  const [currentGetBattleMember, setCurrentGetBattleMember] = useState("");
  const [nextChoices, setNextChoices] = useState(null); // 다음 선택지 상태

  const colorizeHealText = (text) => {
    const keys = Object.keys(styleHealMap);
    let result = [];

    // 정규식 적용을 위해 배열을 정렬: 더 긴 문자열이 먼저 나오도록
    keys.sort((a, b) => b.length - a.length);

    keys.forEach((key) => {
      let regex;
      if (key.includes("체력") || key.includes("정신력")) {
        regex = new RegExp(`(\\d+)만큼 ${key}`, "g");
      } else {
        regex = new RegExp(`${key}(?![가-힣])`, "g");
      }

      text = text.replace(regex, (match, num) => {
        return `<span style="color:${styleHealMap[key]}">${
          num ? `${num}만큼 ` : ""
        }${key}</span>`;
      });
    });

    result = text.split(/(<span.*?>.*?<\/span>)/g).map((part, index) => {
      if (part.startsWith("<span")) {
        const matchColor = part.match(/color:(#.*?)"/);
        const matchText = part.match(/>(.*?)<\/span>/);
        if (matchColor && matchText) {
          return (
            <span key={index} style={{ color: matchColor[1] }}>
              {matchText[1]}
            </span>
          );
        }
      }
      return part;
    });

    return result;
  };

  const colorizeText = (text) => {
    const keys = Object.keys(styleMap);
    let result = [];

    keys.forEach((key) => {
      let regex;
      if (key.includes("체력") || key.includes("정신력")) {
        regex = new RegExp(`(\\d+)만큼 ${key}`, "g");
      } else {
        regex = new RegExp(`${key}(?![가-힣])`, "g");
      }

      text = text.replace(regex, (match, num) => {
        return `<span style="color:${styleMap[key]}">${
          num ? `${num}만큼 ` : ""
        }${key}</span>`;
      });
    });

    result = text.split(/(<span.*?>.*?<\/span>)/g).map((part, index) => {
      if (part.startsWith("<span")) {
        const matchColor = part.match(/color:(#.*?)"/);
        const matchText = part.match(/>(.*?)<\/span>/);
        if (matchColor && matchText) {
          return (
            <span key={index} style={{ color: matchColor[1] }}>
              {matchText[1]}
            </span>
          );
        }
      }
      return part;
    });

    return result;
  };

  const colorizeSuccessText = (text) => {
    let result = [];
    let buffer = "";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === " " || char === "/") {
        if (buffer && styleMap[buffer]) {
          result.push(
            <span style={{ color: styleMap[buffer] }}>{buffer}</span>
          );
        } else {
          result.push(buffer);
        }
        result.push(char);
        buffer = "";
      } else {
        buffer += char;
      }
    }

    if (buffer) {
      if (styleMap[buffer]) {
        result.push(<span style={{ color: styleMap[buffer] }}>{buffer}</span>);
      } else {
        result.push(buffer);
      }
    }

    return result;
  };

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleButtonClick = (choice) => {
    // 현재 텍스트와 결과를 업데이트
    setCurrentText(choice.text || null);
    setCurrentResult(choice.result || null);
    setCurrentGetGift(choice.getGift || null);
    setCurrentGetBattleGift(choice.getBattleGift || null);
    setCurrentGetCost(choice.getCost || null);
    setCurrentGetBuff(choice.getBuff || null);
    setCurrentGetDebuff(choice.getDebuff || null);
    setCurrentSuccess(choice.success || null);
    setCurrentSuccessNum(choice.successNum || null);
    setCurrentGetBattleMember(choice.getBattleMember || null);

    // 새로운 선택지가 있으면 상태 변수에 저장, 없다면 null로 설정
    if (choice.choices && choice.choices.length > 0) {
      setNextChoices(choice.choices);
    } else {
      setNextChoices(null);
    }
  };

  useEffect(() => {
    // 초기 선택지가 있는지, 그리고 하나만 있는지 확인
    if (item.choices && item.choices.length === 1) {
      const singleChoice = item.choices[0];
      handleButtonClick(singleChoice); // 로직을 handleButtonClick에 넣었습니다.
    } else if (item.choices && item.choices.length > 1) {
      // 새로운 부분: 모든 선택지를 순회하고 'choicesText'가 없는 것은 자동으로 처리
      item.choices.forEach((choice) => {
        if (!choice.choicesText) {
          handleButtonClick(choice);
        }
      });
    }
  }, [item]);

  const handleGiftClick = (giftInfo) => {
    navigate("/egogift", { state: { giftInfo } });
  };

  return (
    <EgoBox>
      <EgoDiv>
        <EgoTitleTextDescDiv style={{ marginBottom: "20px" }}>
          <StyledNameSpan fontColor={item.prop} style={{ fontSize: "2rem" }}>
            {item.title}
          </StyledNameSpan>
        </EgoTitleTextDescDiv>
        <SdivImage
          src={`${process.env.PUBLIC_URL}/assets/images/selector/${item.img}`}
          alt={item.title}
          onClick={() => handleGiftClick(item.gift)} // item.gift를 매개변수로 전달합니다.
        />
        <EgoTitleTextDescDiv>{item.text}</EgoTitleTextDescDiv>

        {/* 초기 선택지 렌더링 */}
        {item.choices &&
          item.choices.map((choice, index) => {
            // choicesText가 있는 경우에만 버튼을 렌더링
            if (choice.choicesText) {
              return (
                <FilterButton
                  key={index}
                  recommend={choice.recommend}
                  cost={choice.cost}
                  buff={choice.buff}
                  onClick={() => handleButtonClick(choice)}
                >
                  {choice.choicesText}
                </FilterButton>
              );
            }
            return null; // choicesText가 없다면 null을 반환하여 렌더링하지 않음
          })}
        <EgoTitleTextName>
          {/* 선택에 따른 텍스트와 결과 렌더링 */}

          {currentText && (
            <EgoTitleTextDescDiv>{currentText}</EgoTitleTextDescDiv>
          )}
          {(currentResult ||
            currentSuccess ||
            currentGetBuff ||
            currentGetDebuff ||
            currentGetGift ||
            currentGetBattleGift ||
            currentGetBattleMember ||
            currentGetCost ||
            currentSuccessNum) && (
            <SdivItem>
              {currentResult && (
                <EgoTitleTextDescDivResult back={true}>
                  {currentResult}
                </EgoTitleTextDescDivResult>
              )}
              {currentSuccess && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    {colorizeSuccessText(currentSuccess)} 유리 판정
                  </EgoTitleTextDescDivResult>
                  <EgoTitleTextDescDivResult>
                    {currentSuccessNum} 이상 시 성공
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetBuff && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    {colorizeHealText(currentGetBuff)}
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetDebuff && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    {colorizeText(currentGetDebuff)}
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetGift && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    E.G.O Gift
                  </EgoTitleTextDescDivResult>
                  <EgoTitleTextDescDivResult
                    prop={item.prop}
                    onClick={() => handleGiftClick(item.gift)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.gift}
                  </EgoTitleTextDescDivResult>
                  <EgoTitleTextDescDivResult>획득</EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetBattleGift && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    전투 발생
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetBattleGift && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    다음 전투 승리 시 E.G.O Gift
                  </EgoTitleTextDescDivResult>
                  <EgoTitleTextDescDivResult
                    prop={item.prop}
                    onClick={() => handleGiftClick(item.gift)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.gift}
                  </EgoTitleTextDescDivResult>
                  <EgoTitleTextDescDivResult>획득</EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetCost && (
                <SdivItem>
                  <GiftDiv>
                    <EgoTitleTextDescDivResult>
                      코스트
                    </EgoTitleTextDescDivResult>
                    <EgoTitleTextDescDivResult prop={"나태"}>
                      {currentGetCost}
                    </EgoTitleTextDescDivResult>
                    <EgoTitleTextDescDivResult>획득</EgoTitleTextDescDivResult>
                  </GiftDiv>
                </SdivItem>
              )}
              {currentGetBattleMember && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    전투 발생
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
              {currentGetBattleMember && (
                <GiftDiv>
                  <EgoTitleTextDescDivResult>
                    다음 전투 승리 시 수감자 추가 이벤트 발생
                  </EgoTitleTextDescDivResult>
                </GiftDiv>
              )}
            </SdivItem>
          )}
          {/* 추가 선택지 렌더링 */}
          {nextChoices &&
            nextChoices.map((choice, index) => (
              <FilterButton
                key={index}
                recommend={choice.recommend}
                cost={choice.cost}
                buff={choice.buff}
                onClick={() => handleButtonClick(choice)}
              >
                {choice.choicesText}
              </FilterButton>
            ))}
        </EgoTitleTextName>
      </EgoDiv>
    </EgoBox>
  );
};

export default React.memo(ItemComponents);
