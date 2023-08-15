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
  SyncDiv,
  SyncText,
  HighlightText,
  SdivTotal,
} from "./IdentityInfoStyle";
import Identity from "./Identity";
import Skill from "./components/Skill";
import Passive from "./components/Passive";

export default function IdentityInfo() {
  const versionSync = "sync4";
  const rows = 2;
  const columns = 6;

  const [allIdentityData, setAllIdentityData] = useState([]);
  const [clickedIdentityData, setClickedIdentityData] = useState([]);
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
      for (let identity of Identity) {
        const response = await fetch(identity.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.forEach((item) => {
        initialSyncStates[item.id] = versionSync;
      });

      data.sort((a, b) => b.id - a.id);

      setAllIdentityData(data);
      setClickedIdentityData(data);
      setSyncStates(initialSyncStates);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = allIdentityData.filter((identity) =>
        identity.keyword.some((key) => key.includes(searchTerm))
      );
      setClickedIdentityData(filteredData);
    } else {
      setClickedIdentityData(allIdentityData);
    }
  }, [searchTerm, allIdentityData]);

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
  };

  const handleImageClick = (id, defaultSrc, alternateSrc) => {
    const currentSrc = imageSrcs[id] || defaultSrc;
    // console.log("Current Image Source:", currentSrc); // 현재 이미지 소스 값 출력
    const newSrc = currentSrc === defaultSrc ? alternateSrc : defaultSrc;
    // console.log("New Image Source:", newSrc); // 새로운 이미지 소스 값 출력
    setImageSrcs((prev) => ({ ...prev, [id]: newSrc }));
  };

  const handleClick = (index) => {
    const clickedIdentity = Identity[index];
    if (!clickedIdentity) return;

    fetch(clickedIdentity.path)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => b.id - a.id);
        setClickedIdentityData(data);
        setSearchTerm("");
        setSyncStates({});
        setImageSrcs({});
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  const filteredIdentityData = allIdentityData.filter((identity) =>
    identity.keyword.some((key) => key.includes(searchTerm))
  );

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
              alt={item.rank}
              src={`${process.env.PUBLIC_URL}/assets/images/etc/rank/${item.rank}성.webp`}
            />{" "}
            {item.name} - {item.character}
          </SdivTitleTextName>
          <SdivTitleTextDesc>{item.description}</SdivTitleTextDesc>
          <SdivTitleTextDesc>
            출시 : {item.birth} / 시즌 {item.season}
          </SdivTitleTextDesc>
          <SdivTitleTextDesc>{item.ticket}</SdivTitleTextDesc>
          <SdivImage
            src={`${process.env.PUBLIC_URL}/assets/images/characters/${
              imageSrcs[item.id] || item.imgsrc
            }`}
            alt={item.name}
            onClick={() => handleImageClick(item.id, item.imgsrc, item.imgsrc2)}
          />
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
              {item[syncStates[item.id] || versionSync] &&
                item[syncStates[item.id] || versionSync].defend}
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
            <SkillGrid>
              <Skill
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill1
                }
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill2
                }
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].skill3
                }
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].def
                }
                character={item.character}
                position={item.position}
              />
            </SkillGrid>
            <PassiveGrid>
              <Passive
                passive={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].pass1
                }
              />
              <Passive
                passive={
                  item[syncStates[item.id] || versionSync] &&
                  item[syncStates[item.id] || versionSync].pass2
                }
              />
            </PassiveGrid>
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
        </SearchDivDiv>
      </SearchDiv>
      <IIDiv>
        {Array.from({ length: rows * columns }, (_, index) => {
          const identity = Identity[index];
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
        {(searchTerm ? filteredIdentityData : clickedIdentityData).map(
          (item, index) => (
            <Sdiv key={index}>{renderContent(item, index)}</Sdiv>
          )
        )}
      </SdivTotal>
    </>
  );
}
