import React, { useState } from "react";
import {
  HighlightText,
  PassiveGrid,
  ResiDiv,
  ResiIcon,
  ResiText,
  SPGrid,
  SdivImage,
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
  StyledSpan,
  SyncButton,
  SyncText,
} from "../../Identity/IdentityInfoStyle";
import Skill from "./Skill";
import Passive from "./Passive";

const ItemComponent = ({
  item,
  index,
  searchTerm,
  setSearchTerm,
  setFilterTerm,
}) => {
  const versionSync = "sync4";
  const versionLevel = 35;

  const [syncStates, setSyncStates] = useState({});
  const [descState, setDescState] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  function resistanceText(resist) {
    switch (resist) {
      case "취약":
        return { text: "취약 (x2)", color: "red" };
      case "내성":
        return { text: "내성 (x0.5)", color: "gray" };
      case "보통":
        return { text: "보통 (x1)", color: "black" };
      default:
        return { text: "", color: "black" };
    }
  }

  function highlightText(text, searchTerm) {
    if (text.toLowerCase() === searchTerm.toLowerCase()) {
      return <span style={HighlightText}>{text}</span>;
    } else {
      return text;
    }
  }

  const handleImageClick = (id, descriptions) => {
    const descKeys = Object.keys(descriptions);
    const currentIndex = descKeys.indexOf(descState[id] || "desc1");
    const nextDesc = descKeys[(currentIndex + 1) % descKeys.length];

    setDescState((prev) => ({ ...prev, [id]: nextDesc }));
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
  const currentSyncState = syncStates[item.id] || "sync4";

  const handleSyncToggle = (id, targetSyncState) => {
    setSyncStates((prevStates) => ({
      ...prevStates,
      [id]: targetSyncState,
    }));
  };

  function handleKeywordClick(key) {
    setFilterTerm(key);
    setSearchTerm(key); // 이 부분을 추가합니다.
    setCurrentPage(1); // 페이지네이션을 1페이지로 설정
  }

  function calculateDifference(value, versionLevel) {
    const difference = value - versionLevel;
    if (difference > 0) {
      return `${value}(+${difference})`;
    } else if (difference < 0) {
      return `${value}(${difference})`;
    } else {
      return `${value}`;
    }
  }

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
              alt={item.rank}
              src={`${process.env.PUBLIC_URL}/assets/images/etc/rank/${item.rank}성.webp`}
            />{" "}
            <StyledSpan color={item.character}>[{item.name}]</StyledSpan>
            <StyledSpan color={item.character}>{item.character}</StyledSpan>
          </SdivTitleTextName>
          <SdivTitleTextDescDiv>
            출시 : {item.birth} / 시즌 {item.season}
          </SdivTitleTextDescDiv>
          <SdivTitleTextDescDiv>티켓 : {item.ticket}</SdivTitleTextDescDiv>
          <SdivTitleTextDescDiv>획득 방법 : {item.get}</SdivTitleTextDescDiv>
          <SdivImage
            src={`${process.env.PUBLIC_URL}/assets/images/characters/${
              item.desc[descState[item.id] || "desc1"][1]
            }`}
            alt={item.name}
            onClick={() => handleImageClick(item.id, item.desc)}
          />
          <SdivTitleTextDescDiv style={{ marginBottom: "20px" }}>
            <StyledSpan color={item.character}>
              {item.desc[descState[item.id] || "desc1"][0]}
            </StyledSpan>
          </SdivTitleTextDescDiv>
          <StatusDiv>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/life.webp`}
              alt="life"
            />
            <StatusText>
              {item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].life}
            </StatusText>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/speed.webp`}
              alt="speed"
            />
            <StatusText>
              {item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].speed}
            </StatusText>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/defend.webp`}
              alt="defend"
            />
            <StatusText>
              {calculateDifference(
                item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].defend,
                versionLevel
              )}
            </StatusText>
          </StatusDiv>
          <ResiDiv>
            <ResiIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/참격.webp`}
              alt="참격"
            />
            {(() => {
              const resistInfo = resistanceText(item.resistance[0]);
              return (
                <ResiText color={resistInfo.color}>{resistInfo.text}</ResiText>
              );
            })()}
            <ResiIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/관통.webp`}
              alt="관통"
            />
            {(() => {
              const resistInfo = resistanceText(item.resistance[1]);
              return (
                <ResiText color={resistInfo.color}>{resistInfo.text}</ResiText>
              );
            })()}
            <ResiIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/타격.webp`}
              alt="타격"
            />
            {(() => {
              const resistInfo = resistanceText(item.resistance[2]);
              return (
                <ResiText color={resistInfo.color}>{resistInfo.text}</ResiText>
              );
            })()}
          </ResiDiv>
          <SyncText>
            키워드 :
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
        <SPGrid>
          <SkillGrid>
            <Skill
              type="identity"
              key={`${item.character}_${item.position}_skill1`}
              skill={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].skill1
              }
              character={item.character}
              position={item.position}
              tooltip="skill1"
            />
            <Skill
              type="identity"
              key={`${item.character}_${item.position}_skill2`}
              skill={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].skill2
              }
              character={item.character}
              position={item.position}
              tooltip="skill2"
            />
            <Skill
              type="identity"
              key={`${item.character}_${item.position}_skill3`}
              skill={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].skill3
              }
              character={item.character}
              position={item.position}
              tooltip="skill3"
            />
            <Skill
              type="identity"
              key={`${item.character}_${item.position}_def`}
              skill={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].def
              }
              character={item.character}
              position={item.position}
              tooltip="def"
            />
          </SkillGrid>
          <PassiveGrid>
            <Passive
              type="identity"
              key={`${item.character}_${item.position}_pass1`}
              passive={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].pass1
              }
              tooltip="pass1"
            />
            <Passive
              type="identity"
              key={`${item.character}_${item.position}_pass2`}
              passive={
                item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].pass2
              }
              tooltip="pass2"
            />
          </PassiveGrid>
        </SPGrid>
      </SdivInfo>
    </SdivItem>
  );
};

export default React.memo(ItemComponent);
