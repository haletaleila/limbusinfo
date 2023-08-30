import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionTitle,
  ButtonContainer,
  Desc,
  FilterButton,
  ImageContainer,
  InfoSection,
  LoadingAni,
  LoadingText,
  Modal,
  NewLabel,
  NewsContainer,
  NewsDiv,
  TitleSection,
} from "./NewsInfoStyle";
import { PaginationButtons } from "../components/pagenation/PagenationButton";

function extractVideoID(url) {
  const videoID = url.split("v=")[1];
  const ampersandPosition = videoID.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoID.substring(0, ampersandPosition);
  }
  return videoID;
}

const NewsInfo = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 필터링 상태 ('all', 'true', 'false')
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();

  const isNew = (itemDate) => {
    const itemDateObject = new Date(itemDate);
    const differenceInDays = Math.floor(
      (currentDate - itemDateObject) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 7;
  };

  useEffect(() => {
    // JSON 파일을 불러옵니다.
    setIsLoading(true);
    fetch(`${process.env.PUBLIC_URL}/json/News/News.json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  const handleTitleClick = (id) => {
    console.log("Clicked id:", id);
    if (openIndex === id) {
      setOpenIndex(null);
    } else {
      setOpenIndex(id);
    }
  };

  const getFilteredData = () => {
    let filteredData;
    if (filter === "all") {
      filteredData = [...data];
    } else {
      const isFormal = filter === "true";
      filteredData = data.filter((item) => item.formal === isFormal);
    }
    return filteredData.reverse(); // 데이터를 역순으로 정렬
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getFilteredData().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoadingAni></LoadingAni>
          <LoadingText>정보 불러오는 중...</LoadingText>
        </>
      ) : (
        <NewsContainer>
          <ButtonContainer>
            <FilterButton onClick={() => setFilter("all")}>
              전체 공지확인
            </FilterButton>
            <FilterButton onClick={() => setFilter("true")}>
              공식 공지확인
            </FilterButton>
            <FilterButton onClick={() => setFilter("false")}>
              사이트 공지확인
            </FilterButton>
          </ButtonContainer>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={Math.ceil(getFilteredData().length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
          {currentItems.map((item, index) => (
            <NewsDiv key={item.id}>
              <TitleSection onClick={() => handleTitleClick(item.id)}>
                {`${item.id}. ${item.title}`}
                {item.date && isNew(item.date) && <NewLabel>New</NewLabel>}
              </TitleSection>
              <InfoSection>
                {item.formal ? "공식" : "비공식"} - {item.date}
              </InfoSection>
              {openIndex === item.id && (
                <AccordionContent open={openIndex === item.id}>
                  <br />
                  {item.img.length > 0 && (
                    <ImageContainer>
                      {item.img.map((imgSrc, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={
                            `${process.env.PUBLIC_URL}/assets/images/news/` +
                            imgSrc
                          }
                          alt={`img-${imgIndex}`}
                          onClick={() => setModalImage(imgSrc)}
                        />
                      ))}
                    </ImageContainer>
                  )}
                  <Desc>{item.desc}</Desc>
                  <ImageContainer>
                    {item.link &&
                      item.link.map((url, linkIndex) => (
                        // eslint-disable-next-line jsx-a11y/iframe-has-title
                        <iframe
                          key={linkIndex}
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${extractVideoID(
                            url
                          )}`}
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        ></iframe>
                      ))}
                  </ImageContainer>
                </AccordionContent>
              )}
            </NewsDiv>
          ))}{" "}
          <PaginationButtons
            currentPage={currentPage}
            totalPages={Math.ceil(getFilteredData().length / itemsPerPage)}
            onPageChange={handlePageClick}
          />
          {modalImage && (
            <Modal onClick={() => setModalImage(null)}>
              <img
                src={
                  `${process.env.PUBLIC_URL}/assets/images/news/` + modalImage
                }
                alt="modal"
              />
            </Modal>
          )}
        </NewsContainer>
      )}
    </>
  );
};

export default NewsInfo;
