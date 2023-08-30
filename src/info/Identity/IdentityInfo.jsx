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
  SkillBox,
  SdivTitleTextDescDiv,
  StyledSpan,
  LoadingAni,
  LoadingText,
  EgoSelectBox,
  StyledButton,
  IdentitySelectBox,
  ButtonText,
  FilterButton,
} from "./IdentityInfoStyle";
import Identity from "./Identity";
import Skill from "../components/Identity/Skill";
import Passive from "../components/Identity/Passive";
import { PaginationButtons } from "../components/pagenation/PagenationButton";

export default function IdentityInfo() {
  const versionSync = "sync4";
  const versionLevel = 35;
  const rows = 2;
  const columns = 6;

  const [allIdentityData, setAllIdentityData] = useState([]);
  const [clickedIdentityData, setClickedIdentityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncStates, setSyncStates] = useState({});
  const [descState, setDescState] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonData, setButtonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedGrade, setSelectedGrade] = useState("");

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
  };

  const filteredIdentityData = allIdentityData.filter((identity) => {
    const keywordMatch =
      searchTerm.length >= 2
        ? identity.keyword.some((key) => key === searchTerm)
        : identity.keyword.some((key) => key.includes(searchTerm));

    const gradeMatch = selectedGrade === "" || identity.rank === selectedGrade;

    return keywordMatch && gradeMatch;
  });
  const filteredItems = (
    searchTerm ? filteredIdentityData : clickedIdentityData
  ).filter((identity) => {
    return selectedGrade === "" || identity.rank === selectedGrade;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const calculateTotalPages = () => {
    let totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;
    return totalPages;
  };

  const totalPages = calculateTotalPages();

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSyncToggle = (id, targetSyncState) => {
    setSyncStates((prevStates) => ({
      ...prevStates,
      [id]: targetSyncState,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let data = [];
      let initialSyncStates = {};
      let initialImageSrcs = {};

      for (let identity of Identity) {
        const response = await fetch(identity.path);
        const jsonData = await response.json();
        data = [...data, ...jsonData];
      }

      data.forEach((item) => {
        initialSyncStates[item.id] = versionSync;
        initialImageSrcs[item.id] = item.imgsrc;
      });

      data.sort((a, b) => b.id - a.id);

      setAllIdentityData(data);
      setClickedIdentityData(data);
      setSyncStates(initialSyncStates);
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/Identity/identitykeyword.json`)
      .then((response) => response.json())
      .then((data) => setButtonData(data));
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
    setCurrentPage(1); // 페이지네이션을 1페이지로 설정
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

    allIdentityData.forEach((item) => {
      initialSyncStates[item.id] = versionSync;
    });

    setClickedIdentityData(allIdentityData);
    setSearchTerm("");
    setSyncStates(initialSyncStates);
    setCurrentPage(1);
  }

  const handleImageClick = (id, descriptions) => {
    const descKeys = Object.keys(descriptions);
    const currentIndex = descKeys.indexOf(descState[id] || "desc1");
    const nextDesc = descKeys[(currentIndex + 1) % descKeys.length];

    setDescState((prev) => ({ ...prev, [id]: nextDesc }));
  };

  const handleClick = (index) => {
    const clickedIdentity = Identity[index];
    if (!clickedIdentity) return;

    setSearchTerm("");
    setCurrentPage(1); // 페이지네이션을 1페이지로 설정

    fetch(clickedIdentity.path)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => b.id - a.id);

        let initialSyncStates = {};
        let initialImageSrcs = {};
        data.forEach((item) => {
          initialSyncStates[item.id] = versionSync; // 모든 아이템에 대한 초기 동기화 상태 설정
          initialImageSrcs[item.id] = item.imgsrc; // 모든 아이템에 대한 초기 이미지 소스 설정
        });

        setClickedIdentityData(data);
        setSearchTerm("");
        setSyncStates(initialSyncStates);
      })
      .catch((error) => console.error("error occurred: ", error));
  };

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

  const handleButtonClick = (desc) => {
    // 키워드로 desc를 설정
    setSearchTerm(desc);
  };

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

  return (
    <>
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <>
          <IdentitySelectBox>
            {buttonData.map((button, index) => (
              <StyledButton
                key={index}
                isSelected={searchTerm === button.desc}
                onClick={() => handleButtonClick(button.desc)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/status/${button.img}`}
                  alt={button.title}
                />
                <ButtonText>{button.title}</ButtonText>
              </StyledButton>
            ))}
          </IdentitySelectBox>
          <SearchDiv>
            <SearchSpan>등급별 필터: </SearchSpan>
            {[1, 2, 3].map((grade) => (
              <FilterButton
                key={grade}
                isSelected={selectedGrade === grade}
                onClick={() => handleGradeClick(grade)}
              >
                {grade}
              </FilterButton>
            ))}
            <FilterButton
              isSelected={selectedGrade === ""}
              onClick={() => setSelectedGrade("")}
            >
              모두
            </FilterButton>
          </SearchDiv>
          <SearchDiv>
            <SearchDivDiv>
              {" "}
              <SearchDivDiv></SearchDivDiv>
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
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
          <SdivTotal>
            {currentItems.map((item, index) => (
              <Sdiv key={index}>{renderContent(item, index)}</Sdiv>
            ))}
          </SdivTotal>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </>
  );
}
