import React, { useEffect, useState } from "react";
import {
  EgoBox,
  EgoDiv,
  EgoTitleTextDescDiv,
  EgoTitleTextName,
  FilterButton,
  SdivImage,
  StyledNameSpan,
} from "../../selector/SelectorStyle";
import { useNavigate } from "react-router-dom";

const ItemComponents = ({ item }) => {
  const [currentText, setCurrentText] = useState(""); // 현재 텍스트 상태
  const [currentResult, setCurrentResult] = useState(""); // 현재 결과 상태
  const [nextChoices, setNextChoices] = useState(null); // 다음 선택지 상태

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleButtonClick = (choice) => {
    // 현재 텍스트와 결과를 업데이트
    setCurrentText(choice.text || "");
    setCurrentResult(choice.result || "");

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

  useEffect(() => {
    if (item.choices && item.choices.length >= 1) {
      item.choices.forEach((choice) => {
        if (!choice.choicesText) {
          handleButtonClick(choice);
        }
      });
    }
  }, [item]);

  const handleGiftClick = () => {
    navigate("/egogift", { state: { giftInfo: item.gift } }); // navigate 함수를 사용하여 정보와 함께 egogiftinfo로 이동합니다.
  };

  return (
    <EgoBox>
      <EgoDiv>
        <EgoTitleTextDescDiv style={{ marginBottom: "20px" }}>
          <StyledNameSpan fontColor={"없음"}>{item.title}</StyledNameSpan>
        </EgoTitleTextDescDiv>
        <SdivImage
          src={`${process.env.PUBLIC_URL}/assets/images/selector/${item.img}`}
          alt={item.title}
        />
        <EgoTitleTextName>
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
                    onClick={() => handleButtonClick(choice)}
                  >
                    {choice.choicesText}
                  </FilterButton>
                );
              }
              return null; // choicesText가 없다면 null을 반환하여 렌더링하지 않음
            })}

          {/* 선택에 따른 텍스트와 결과 렌더링 */}
          <EgoTitleTextDescDiv>
            {currentText && <div>{currentText}</div>}
          </EgoTitleTextDescDiv>
          <EgoTitleTextDescDiv result={true}>
            {currentResult && <div>{currentResult}</div>}
          </EgoTitleTextDescDiv>

          {/* 추가 선택지 렌더링 */}
          {nextChoices &&
            nextChoices.map((choice, index) => (
              <FilterButton
                key={index}
                recommend={choice.recommend}
                onClick={() => handleButtonClick(choice)}
              >
                {choice.choicesText}
              </FilterButton>
            ))}
          <EgoTitleTextDescDiv>
            {item.gift && (
              <FilterButton recommend={true} onClick={handleGiftClick}>
                Gift 정보 보기
              </FilterButton> // "Gift 정보 보기" 버튼 추가
            )}
          </EgoTitleTextDescDiv>
        </EgoTitleTextName>
      </EgoDiv>
    </EgoBox>
  );
};

export default React.memo(ItemComponents);
