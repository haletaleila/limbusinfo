import React, { useState } from "react";

import Skill from "./Skill";
import Passive from "./Passive";
import {
  HighlightText,
  ResiDiv,
  ResiDivDiv,
  ResiIcon,
  ResiText,
  SPGrid,
  SdivImage,
  SdivImageDiv,
  SdivInfo,
  SdivItem,
  SdivSungImage,
  SdivTitleTextDescDiv,
  SdivTitleTextDiv,
  SdivTitleTextName,
  SkillBox,
  SkillGrid,
  StatusDiv,
  StatusIcon,
  StatusText,
  StyledNameSpan,
  StyledSpan,
  SyncButton,
  SyncText,
} from "../../ego/EgoInfoStyle";

const ItemComponent = ({
  item,
  index,
  searchTerm,
  setSearchTerm,
  setFilterTerm,
}) => {
  const versionSync = "sync4";
  const [syncStates, setSyncStates] = useState({});
  const [descState, setDescState] = useState({});
  const currentSyncState = syncStates[item.id] || "sync4";

  const [currentPage, setCurrentPage] = useState(1);

  const COST_IMAGES = [
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/분노icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/색욕icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/나태icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/탐식icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/우울icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/오만icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/질투icon.webp`,
  ];

  const handleSyncToggle = (id, targetSyncState) => {
    setSyncStates((prevStates) => ({
      ...prevStates,
      [id]: targetSyncState,
    }));
  };

  const renderSyncButtonsForItem = (id) => (
    <div>
      {
        // 나중에 싱크 더나오면 추가하장
        ["sync3", "sync4"].map((state) => (
          <SyncButton
            key={state}
            onClick={() => handleSyncToggle(id, state)}
            style={{ margin: "10px", padding: "5px 10px" }}
            active={syncStates[id] === state}
          >
            {`동기화 ${state.split("sync")[1]}`}
          </SyncButton>
        ))
      }
    </div>
  );

  function resistanceText(resist) {
    switch (resist) {
      case "취약":
        return { text: "취약\n(x2)", color: "red", fontSize: "1rem" };
      case "내성":
        return { text: "내성\n(x0.5)", color: "gray", fontSize: "1rem" };
      case "보통":
        return { text: "보통\n(x1)", color: "black", fontSize: "1rem" };
      case "견딤":
        return { text: "견딤\n(x0.75)", color: "dimgray", fontSize: "1rem" };
      default:
        return { text: "", color: "black" };
    }
  }

  function highlightText(text, searchTerm) {
    const parts = text.split(new RegExp(`(${searchTerm})`, "i"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} style={HighlightText}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
    setFilterTerm(keyword);
    setCurrentPage(1); // 페이지네이션을 1페이지로 설정
  };

  // sync3 데이터가 없고, 현재 동기화 상태가 sync3인 경우
  if (currentSyncState === "sync3" && !item.sync3) {
    return (
      <SdivItem key={index}>
        <SdivTitleTextDiv>
          <SdivTitleTextName>데이터 준비중입니다.</SdivTitleTextName>
          {renderSyncButtonsForItem(item.id)}
        </SdivTitleTextDiv>
      </SdivItem>
    );
  }

  // sync4 데이터가 없고, 현재 동기화 상태가 sync4인 경우
  if (currentSyncState === "sync4" && !item.sync4) {
    return (
      <SdivItem key={index}>
        <SdivTitleTextDiv>
          <SdivTitleTextName>데이터 준비중입니다.</SdivTitleTextName>
          {renderSyncButtonsForItem(item.id)}
        </SdivTitleTextDiv>
      </SdivItem>
    );
  }

  return (
    <SdivItem key={index}>
      <SkillBox>
        <SdivTitleTextDiv>
          <SdivTitleTextName>
            <SdivSungImage
              alt={item.egorank}
              src={`${process.env.PUBLIC_URL}/assets/images/etc/egorank/${item.egorank}.webp`}
            />{" "}
            <StyledNameSpan
              fontColor={item[syncStates[item.id] || versionSync].skill1.prop}
              color={item.character}
            >
              [{item.name}]
            </StyledNameSpan>
            <StyledSpan color={item.character}>{item.character}</StyledSpan>
          </SdivTitleTextName>
          <SdivTitleTextDescDiv>
            출시 : {item.birth} / 시즌 {item.season}
          </SdivTitleTextDescDiv>
          <SdivTitleTextDescDiv>
            환상체 : {item.abnormality}
          </SdivTitleTextDescDiv>
          <SdivTitleTextDescDiv>티켓 : {item.ticket}</SdivTitleTextDescDiv>
          <SdivTitleTextDescDiv>획득 방법 : {item.get}</SdivTitleTextDescDiv>
          <SdivImageDiv>
            <SdivImage
              src={`${process.env.PUBLIC_URL}/assets/images/ego/${
                item.desc[descState[item.id] || "desc1"][1]
              }`}
              alt={item.name}
            />
          </SdivImageDiv>

          {/* <SdivTitleTextDescDiv style={{ marginBottom: "20px" }}>
              <StyledNameSpan
                fontColor={item[syncStates[item.id] || versionSync].skill1.prop}
                color={item.character}
              >
                {item.desc[descState[item.id] || "desc1"][0]}
              </StyledNameSpan>
            </SdivTitleTextDescDiv> */}
          {/* <StatusDiv>
              <StatusIcon
                src={`${process.env.PUBLIC_URL}/assets/images/etc/level/공격레벨.webp`}
                alt="attack"
              />
              <StatusText>
                {[
                  item[syncStates[item.id] || versionSync]?.attack,
                  item[syncStates[item.id] || versionSync]?.skill1?.attack,
                  item[syncStates[item.id] || versionSync]?.skill2?.attack,
                ]
                  .filter(Boolean)
                  .map((value) => calculateDifference(value, versionLevel))
                  .join(" / ")}
              </StatusText>
              <StatusIcon
                src={`${process.env.PUBLIC_URL}/assets/images/etc/status/정신력.webp`}
                alt="mental"
              />
              <StatusText>
                {item[syncStates[item.id] || versionSync] &&
                  (item[syncStates[item.id] || versionSync].mental
                    ? item[syncStates[item.id] || versionSync].mental
                    : "") +
                    (item[syncStates[item.id] || versionSync].skill1 &&
                    item[syncStates[item.id] || versionSync].skill1.mental
                      ? item[syncStates[item.id] || versionSync].skill1.mental
                      : "") +
                    (item[syncStates[item.id] || versionSync].skill2 &&
                    item[syncStates[item.id] || versionSync].skill2.mental
                      ? " / " +
                        item[syncStates[item.id] || versionSync].skill2.mental
                      : "")}
              </StatusText>
            </StatusDiv> */}
          {"코스트 소모량"}
          <StatusDiv>
            {item[syncStates[item.id] || versionSync] &&
            item[syncStates[item.id] || versionSync].cost
              ? item[syncStates[item.id] || versionSync].cost.map(
                  (costValue, index) => {
                    if (costValue >= 1) {
                      return (
                        <React.Fragment key={index}>
                          <StatusIcon
                            src={COST_IMAGES[index]}
                            alt={`Cost ${index}`}
                          />
                          <StatusText>
                            {" x "}
                            {costValue}
                          </StatusText>
                        </React.Fragment>
                      );
                    }
                    return null;
                  }
                )
              : null}
          </StatusDiv>
          {"내성"}
          <ResiDiv>
            {item.resistance.map((resist, index) => {
              const resistInfo = resistanceText(resist);
              return (
                <div
                  key={index}
                  style={{ textAlign: "center", marginRight: "1rem" }}
                >
                  <ResiDivDiv>
                    <ResiIcon src={COST_IMAGES[index]} alt={resist} />
                    <ResiText
                      color={resistInfo.color}
                      fontSize={resistInfo.fontSize}
                    >
                      {resistInfo.text}
                    </ResiText>
                  </ResiDivDiv>
                </div>
              );
            })}
          </ResiDiv>
          <SyncText>
            키워드 :{" "}
            {item.keyword
              .map((key, index) => (
                <span key={index} onClick={() => handleKeywordClick(key)}>
                  {highlightText(key, searchTerm)}
                </span>
              ))
              .reduce((prev, curr, i) => {
                return i === 0 ? [curr] : [...prev, ", ", curr];
              }, [])}
          </SyncText>
          {renderSyncButtonsForItem(item.id)}
        </SdivTitleTextDiv>
      </SkillBox>
      <SdivInfo>
        <SPGrid key={index}>
          <SkillGrid
            hasSkill2={
              !!(
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].skill2
              )
            }
          >
            <Skill
              key={`${item.character}_${item.position}_skill1`}
              skill={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].skill1
              }
              character={item.character}
              name={item.name}
              skillname={item.name}
              style={{ gridArea: "1 / 1 / 2 / 2" }} // (row-start / column-start / row-end / column-end)
              tooltip="skill1"
              desc={item.desc[descState[item.id] || "desc1"][0]}
            />
            {item[syncStates[item.id] || versionSync] &&
            item[syncStates[item.id] || versionSync].skill2 ? (
              <Skill
                key={`${item.character}_${item.position}_skill2`}
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill2
                }
                character={item.character}
                name={item.name}
                skillname={item.name}
                style={{ gridArea: "1 / 2 / 2 / 3" }}
                tooltip="skill2"
                desc={item.desc[descState[item.id] || "desc2"][0]}
              />
            ) : null}
            <Passive
              key={`${item.character}_${item.position}_pass1`}
              passive={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].pass1
              }
              style={{ gridArea: "2 / 1 / 3 / 3" }} // passive가 2칸을 차지하도록 설정
              tooltip="pass1"
            />
          </SkillGrid>
        </SPGrid>
      </SdivInfo>
    </SdivItem>
  );
};

export default React.memo(ItemComponent);
