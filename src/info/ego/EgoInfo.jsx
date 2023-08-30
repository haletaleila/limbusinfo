/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  IIDiv,
  IIdivImage,
  InputKeyword,
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
  ResiDivDiv,
  SkillBox,
  SdivTitleTextDescDiv,
  StyledSpan,
  StyledNameSpan,
  SdivImageDiv,
  LoadingAni,
  LoadingText,
  EgoSelectBox,
  StyledButton,
  ButtonText,
  FilterButton,
} from "./EgoInfoStyle";
import Ego from "./Ego";
import Skill from "../components/ego/Skill";
import Passive from "../components/ego/Passive";
import { PaginationButtons } from "../components/pagenation/PagenationButton";

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

  const filteredEgoData = allEgoData.filter((ego) => {
    const keywordMatch =
      searchTerm.length >= 2
        ? ego.keyword.some((key) => key === searchTerm)
        : ego.keyword.some((key) => key.includes(searchTerm));

    const gradeMatch = selectedGrade === "" || ego.egorank === selectedGrade; // 수정

    return keywordMatch && gradeMatch;
  });
  const filteredItems = (searchTerm ? filteredEgoData : clickedEgoData).filter(
    (ego) => {
      return selectedGrade === "" || ego.egorank === selectedGrade; // 수정
    }
  );

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
    fetch(`${process.env.PUBLIC_URL}/json/Ego/egokeyword.json`)
      .then((response) => response.json())
      .then((data) => setButtonData(data));
  }, []);

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

      for (let ego of Ego) {
        const response = await fetch(ego.path);
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
      setCurrentPage(1);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = allEgoData;

    // 등급 필터 적용
    if (selectedGrade !== "") {
      filteredData = filteredData.filter(
        (ego) => ego.egorank === selectedGrade
      );
    }

    // 키워드 검색 필터 적용
    if (searchTerm !== "") {
      filteredData = filteredData.filter((ego) =>
        ego.keyword.some((key) => key.includes(searchTerm))
      );
    }

    setClickedEgoData(filteredData);
  }, [searchTerm, allEgoData, selectedGrade]);

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
    } else if (difference === 0) {
      return `${value}(0)`;
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
    setCurrentPage(1);
  }

  const handleImageClick = (id, descriptions) => {
    const descKeys = Object.keys(descriptions);
    const currentIndex = descKeys.indexOf(descState[id] || "desc1");
    const nextDesc = descKeys[(currentIndex + 1) % descKeys.length];

    setDescState((prev) => ({ ...prev, [id]: nextDesc }));
  };

  const handleClick = (index) => {
    const clickedEgo = Ego[index];
    if (!clickedEgo) return;

    setSearchTerm("");
    setCurrentPage(1);

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
      })
      .catch((error) => console.error("error occurred: ", error));
  };

  // const filteredEgoData = allEgoData.filter((identity) =>
  //   identity.keyword.some((key) => key.includes(searchTerm))
  // );

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

  return (
    <>
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <>
          <EgoSelectBox>
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
          </EgoSelectBox>
          <SearchDiv>
            <SearchDivDiv></SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>등급별 필터: </SearchSpan>
              {["ZAYIN", "TETH", "HE", "WAW", "ALEPH"].map((grade) => (
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
            </SearchDivDiv>
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <SearchDiv>
            <SearchDivDiv>
              <SearchDivDiv></SearchDivDiv>
            </SearchDivDiv>
            <SearchDivDiv>
              <SearchSpan>키워드 검색 : </SearchSpan>
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
            <SearchDivDiv></SearchDivDiv>
          </SearchDiv>
          <IIDiv>
            {Array.from({ length: rows * columns }, (_, index) => {
              const ego = Ego[index];
              return (
                <IIdivImage
                  key={index}
                  src={`${process.env.PUBLIC_URL}/assets/images/etc/portrait/${index}.webp`}
                  alt={ego ? ego.name : `Image ${index}`}
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
