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
  const rows = 2;
  const columns = 6;

  const [allIdentityData, setAllIdentityData] = useState([]);
  const [clickedIdentityData, setClickedIdentityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSrcs, setImageSrcs] = useState({});
  const [syncState, setSyncState] = useState("sync4");
  const syncStates = ["sync3", "sync4"];

  const handleSyncToggle = () => {
    setSyncState((prevState) => (prevState === "sync4" ? "sync3" : "sync4"));
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      for (let identity of Identity) {
        const response = await fetch(identity.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.sort((a, b) => b.id - a.id);

      setAllIdentityData(data);
      setClickedIdentityData(data);
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
    const newSrc = currentSrc === defaultSrc ? alternateSrc : defaultSrc;
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
        setSyncState("sync4");
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

  const renderSyncButtons = () => (
    <div>
      {syncStates.map((state) => (
        <SyncButton
          key={state}
          onClick={() => setSyncState(state)}
          style={{ margin: "10px", padding: "5px 10px" }}
          active={syncState === state} // 현재 활성화된 버튼을 시각적으로 구분하기 위한 속성 (옵션)
        >
          {`동기화 ${state.split("sync")[1]}`}
        </SyncButton>
      ))}
    </div>
  );

  const renderContent = (item, index) => {
    if (syncState === "sync3" && !item.sync3) {
      return (
        <>
          <SdivItem key={index}>
            <SdivTitleTextDiv>
              <SdivTitleTextName>데이터 준비중입니다.</SdivTitleTextName>
              {renderSyncButtons()}
            </SdivTitleTextDiv>
          </SdivItem>
        </>
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
              imageSrcs[index] || item.imgsrc
            }`}
            alt={item.name}
            onClick={() => handleImageClick(index, item.imgsrc, item.imgsrc2)}
          />
          <StatusDiv>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/life.webp`}
              alt="life"
            />
            <StatusText>{item[syncState].life}</StatusText>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/speed.webp`}
              alt="speed"
            />
            <StatusText>{item[syncState].speed}</StatusText>
            <StatusIcon
              src={`${process.env.PUBLIC_URL}/assets/images/etc/char/defend.webp`}
              alt="defend"
            />
            <StatusText>{item[syncState].defend}</StatusText>
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
          {renderSyncButtons()}
        </SdivTitleTextDiv>
        <SdivInfo>
          <SPGrid key={index}>
            <SkillGrid>
              <Skill
                skill={item[syncState].skill1}
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={item[syncState].skill2}
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={item[syncState].skill3}
                character={item.character}
                position={item.position}
              />
              <Skill
                skill={item[syncState].def}
                character={item.character}
                position={item.position}
              />
            </SkillGrid>
            <PassiveGrid>
              <Passive passive={item[syncState].pass1} />
              <Passive passive={item[syncState].pass2} />
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
