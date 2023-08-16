/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  IIDiv,
  IIdivImage,
  InputKeyword,
  PassiveGrid,
  ResiDiv,
  ResiIcon,
  ResiText,
  SPGrid,
  Sdiv,
  SdivImage,
  SdivInfo,
  SdivItem,
  SdivSungImage,
  SdivTitleTextDesc,
  SdivTitleTextDiv,
  SdivTitleTextName,
  SearchDiv,
  SearchDivDiv,
  SearchSpan,
  SkillGrid,
  StatusDiv,
  StatusIcon,
  StatusText,
  SyncButton,
  SyncText,
  HighlightText,
  SdivTotal,
  ResetButton,
  ResiDivDiv,
} from "./EgoInfoStyle";
import Ego from "./Ego";
import Skill from "../components/ego/Skill";
import Passive from "../components/ego/Passive";

export default function EgoInfo() {
  const versionSync = "sync4";
  const versionLevel = 35;
  const rows = 2;
  const columns = 6;

  const COST_IMAGES = [
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/분노icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/색욕icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/나태icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/탐식icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/우울icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/오만icon.webp`,
    `${process.env.PUBLIC_URL}/assets/images/etc/prop/질투icon.webp`,
  ];

  const [allEgoData, setAllEgoData] = useState([]);
  const [clickedEgoData, setClickedEgoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSrcs, setImageSrcs] = useState({});
  const [syncStates, setSyncStates] = useState({});

  const handleSyncToggle = (id, targetSyncState) => {
    setSyncStates((prevStates) => ({
      ...prevStates,
      [id]: targetSyncState,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let initialSyncStates = {};
      let initialImageSrcs = {};

      for (let identity of Ego) {
        const response = await fetch(identity.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.forEach((item) => {
        initialSyncStates[item.id] = versionSync;
        initialImageSrcs[item.id] = item.imgsrc;
      });

      data.sort((a, b) => b.id - a.id);

      setAllEgoData(data);
      setClickedEgoData(data);
      setSyncStates(initialSyncStates);
      setImageSrcs(initialImageSrcs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = allEgoData.filter((identity) =>
        identity.keyword.some((key) => key.includes(searchTerm))
      );
      setClickedEgoData(filteredData);
    } else {
      setClickedEgoData(allEgoData);
    }
  }, [searchTerm, allEgoData]);

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
  };

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

  function resetAllFilters() {
    let initialSyncStates = {};

    allEgoData.forEach((item) => {
      initialSyncStates[item.id] = versionSync;
    });

    setClickedEgoData(allEgoData);
    setSearchTerm("");
    setSyncStates(initialSyncStates);
  }

  const handleImageClick = (id, defaultSrc, alternateSrc) => {
    const currentSrc = imageSrcs[id] || defaultSrc;
    // console.log("Current Image Source:", currentSrc); // 현재 이미지 소스 값 출력
    const newSrc = currentSrc === defaultSrc ? alternateSrc : defaultSrc;
    // console.log("New Image Source:", newSrc); // 새로운 이미지 소스 값 출력
    setImageSrcs((prev) => ({ ...prev, [id]: newSrc }));
  };

  const handleClick = (index) => {
    const clickedEgo = Ego[index];
    if (!clickedEgo) return;

    fetch(clickedEgo.path)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => b.id - a.id);

        let initialSyncStates = {};
        let initialImageSrcs = {};
        data.forEach((item) => {
          initialSyncStates[item.id] = versionSync; // 모든 아이템에 대한 초기 동기화 상태 설정
          initialImageSrcs[item.id] = item.imgsrc; // 모든 아이템에 대한 초기 이미지 소스 설정
        });

        setClickedEgoData(data);
        setSearchTerm("");
        setSyncStates(initialSyncStates);
        setImageSrcs(initialImageSrcs);
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  const filteredEgoData = allEgoData.filter((identity) =>
    identity.keyword.some((key) => key.includes(searchTerm))
  );

  function resistanceText(resist) {
    switch (resist) {
      case "취약":
        return { text: "취약\n(x2)", color: "red" };
      case "내성":
        return { text: "내성\n(x0.5)", color: "gray" };
      case "보통":
        return { text: "보통", color: "black" };
      case "견딤":
        return { text: "견딤\n(x0.75)", color: "dimgray" };
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

  const renderContent = (item, index) => {
    const currentSyncState = syncStates[item.id] || "sync4";

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
        <SdivTitleTextDiv>
          <SdivTitleTextName>
            <SdivSungImage
              alt={item.egorank}
              src={`${process.env.PUBLIC_URL}/assets/images/etc/egorank/${item.egorank}.webp`}
            />{" "}
            {item.name} - {item.character}
          </SdivTitleTextName>
          <SdivTitleTextDesc>{item.description}</SdivTitleTextDesc>
          <SdivTitleTextDesc>
            출시 : {item.birth} / 시즌 {item.season}
          </SdivTitleTextDesc>
          <SdivTitleTextDesc>{item.ticket}</SdivTitleTextDesc>
          <SdivImage
            src={`${process.env.PUBLIC_URL}/assets/images/ego/${
              imageSrcs[item.id] || item.imgsrc
            }`}
            alt={item.name}
            onClick={() => handleImageClick(item.id, item.imgsrc, item.imgsrc2)}
          />
          <StatusDiv>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/level/공격레벨.webp`}
              alt="attack"
            />
            <StatusText>
              {calculateDifference(
                item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].attack,
                versionLevel
              )}
            </StatusText>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/status/정신력.webp`}
              alt="mental"
            />
            <StatusText>
              {item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].mental}
            </StatusText>
          </StatusDiv>
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
                    <ResiText color={resistInfo.color}>
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
        <SdivInfo>
          <SPGrid key={index}>
            <SkillGrid
              style={{
                gridTemplateAreas:
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill2
                    ? `
          "skill1 skill2"
          "passive passive"
        `
                    : `
          "skill1 passive"
        `,
              }}
            >
              <Skill
                key={`${item.character}_${item.position}_skill1`}
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill1
                }
                character={item.character}
                position={item.position}
                style={{ gridArea: "1 / 1 / 2 / 2" }} // (row-start / column-start / row-end / column-end)
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
                  position={item.position}
                  style={{ gridArea: "1 / 2 / 2 / 3" }}
                />
              ) : null}
              <Passive
                key={`${item.character}_${item.position}_pass1`}
                passive={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].pass1
                }
                style={{ gridArea: "2 / 1 / 3 / 3" }} // passive가 2칸을 차지하도록 설정
              />
            </SkillGrid>
          </SPGrid>
        </SdivInfo>
      </SdivItem>
    );
  };

  return (
    <>
      <SearchDiv>
        <SearchDivDiv>
          <SearchSpan>키워드 검색 : </SearchSpan>
        </SearchDivDiv>
        <SearchDivDiv>
          <InputKeyword
            type="text"
            placeholder="키워드 입력"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <ResetButton onClick={resetAllFilters}>초기화</ResetButton>
        </SearchDivDiv>
      </SearchDiv>
      <IIDiv>
        {Array.from({ length: rows * columns }, (_, index) => {
          const identity = Ego[index];
          return (
            <IIdivImage
              key={index}
              src={`${process.env.PUBLIC_URL}/assets/images/etc/portrait/${index}.webp`}
              alt={identity ? identity.name : `Image ${index}`}
              onClick={() => {
                handleClick(index);
              }}
            />
          );
        })}
      </IIDiv>
      <SdivTotal>
        {(searchTerm ? filteredEgoData : clickedEgoData).map((item, index) => (
          <Sdiv key={index}>{renderContent(item, index)}</Sdiv>
        ))}
      </SdivTotal>
    </>
  );
}
