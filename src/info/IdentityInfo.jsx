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
      setClickedIdentityData([]);
    }
  }, [searchTerm, allIdentityData]);

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
  };

  const handleImageClick = (id, defaultSrc, alternateSrc) => {
    const newSrc = imageSrcs[id] === defaultSrc ? alternateSrc : defaultSrc;
    setImageSrcs((prev) => ({ ...prev, [id]: newSrc }));
  };

  const handleClick = (index) => {
    const clickedIdentity = Identity[index];
    if (!clickedIdentity) return;

    fetch(clickedIdentity.path)
      .then((res) => res.json())
      .then((data) => {
        setClickedIdentityData(data);
        setSearchTerm("");
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
      <Sdiv>
        {(searchTerm ? filteredIdentityData : clickedIdentityData).map(
          (item, index) => (
            <Sdiv key={index}>
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
                  <SdivImage
                    src={`${process.env.PUBLIC_URL}/assets/images/characters/${
                      imageSrcs[index] || item.imgsrc
                    }`}
                    alt={item.name}
                    onClick={() =>
                      handleImageClick(index, item.imgsrc, item.imgsrc2)
                    }
                  />
                  <StatusDiv>
                    <StatusIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/char/life.webp`}
                      alt="life"
                    />
                    <StatusText>{item.life}</StatusText>
                    <StatusIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/char/speed.webp`}
                      alt="speed"
                    />
                    <StatusText>{item.speed}</StatusText>
                    <StatusIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/char/defend.webp`}
                      alt="defend"
                    />
                    <StatusText>{item.defend}</StatusText>
                  </StatusDiv>
                  <ResiDiv>
                    <ResiIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/참격.webp`}
                      alt="참격"
                    />
                    {(() => {
                      const resistInfo = resistanceText(item.resistance[0]);
                      return (
                        <ResiText color={resistInfo.color}>
                          {resistInfo.text}
                        </ResiText>
                      );
                    })()}
                    <ResiIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/관통.webp`}
                      alt="관통"
                    />
                    {(() => {
                      const resistInfo = resistanceText(item.resistance[1]);
                      return (
                        <ResiText color={resistInfo.color}>
                          {resistInfo.text}
                        </ResiText>
                      );
                    })()}
                    <ResiIcon
                      src={`${process.env.PUBLIC_URL}/assets/images/etc/resistance/타격.webp`}
                      alt="타격"
                    />
                    {(() => {
                      const resistInfo = resistanceText(item.resistance[2]);
                      return (
                        <ResiText color={resistInfo.color}>
                          {resistInfo.text}
                        </ResiText>
                      );
                    })()}
                  </ResiDiv>
                  {/* <SyncDiv>
                    <SyncText>
                      동기화 정보 :&nbsp;
                      {Array.from({ length: 4 }, (_, i) => (
                        <SyncButton
                          key={i}
                          active={activeIndex === i}
                          onClick={() => handleButtonSelect(i)}
                        >
                          {i + 1}
                        </SyncButton>
                      ))}
                    </SyncText>
                  </SyncDiv> */}
                  <SyncText>
                    키워드 :{" "}
                    {item.keyword
                      .map((key, index) => (
                        <span
                          key={index}
                          onClick={() => handleKeywordClick(key)}
                        >
                          {highlightText(key, searchTerm)}
                        </span>
                      ))
                      .reduce((prev, curr, i) => {
                        return i === 0 ? [curr] : [...prev, ", ", curr];
                      }, [])}
                  </SyncText>
                </SdivTitleTextDiv>
                <SdivInfo>
                  {/* {(searchTerm
                    ? filteredIdentityData
                    : clickedIdentityData
                  ).map((item, index) => ( */}
                  <SPGrid key={index}>
                    <SkillGrid>
                      <Skill
                        skill={item.skill1}
                        character={item.character}
                        position={item.position}
                      />
                      <Skill
                        skill={item.skill2}
                        character={item.character}
                        position={item.position}
                      />
                      <Skill
                        skill={item.skill3}
                        character={item.character}
                        position={item.position}
                      />
                      <Skill
                        skill={item.def}
                        character={item.character}
                        position={item.position}
                      />
                    </SkillGrid>
                    <PassiveGrid>
                      <Passive passive={item.pass1} />
                      <Passive passive={item.pass2} />
                    </PassiveGrid>
                  </SPGrid>
                  {/* ))} */}
                </SdivInfo>
              </SdivItem>
            </Sdiv>
          )
        )}
      </Sdiv>
    </>
  );
}
