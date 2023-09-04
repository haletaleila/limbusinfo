import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  ButtonContainer,
  ClickableDiv,
  CloseButton,
  Desc,
  FilterButton,
  ImageContainer,
  InfoSection,
  LoadingAni,
  LoadingText,
  Modal,
  ModalFooter,
  ModalNavButton,
  ModalPageInfo,
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
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();

  const isNew = (itemDate) => {
    const itemDateObject = new Date(itemDate);
    const differenceInDays = Math.floor(
      (currentDate - itemDateObject) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays <= 3;
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
  // notice가 true인 아이템만 고른다.
  const noticeItems = getFilteredData().filter((item) => item.notice === true);

  // notice가 없거나 false인 아이템만 고른다.
  const nonNoticeItems = getFilteredData().filter((item) => !item.notice);

  // 일반 아이템에 대해서만 pagination을 적용한다.
  const currentItems = nonNoticeItems.slice(indexOfFirstItem, indexOfLastItem);

  // 공지사항을 제외한 아이템 갯수로 페이지 수를 계산한다.
  const totalPages = Math.ceil(nonNoticeItems.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [currentModalImages, setCurrentModalImages] = useState([]);

  const handleImageClick = (images, index) => {
    setCurrentModalImages(images);
    setCurrentModalIndex(index);
    setModalImageSrc(images[index]);
  };

  const closeModal = () => {
    setModalImageSrc(null);
  };

  const prevImage = () => {
    const prevIndex =
      (currentModalIndex - 1 + currentModalImages.length) %
      currentModalImages.length;
    setCurrentModalIndex(prevIndex);
    setModalImageSrc(currentModalImages[prevIndex]);
  };

  const nextImage = () => {
    const nextIndex = (currentModalIndex + 1) % currentModalImages.length;
    setCurrentModalIndex(nextIndex);
    setModalImageSrc(currentModalImages[nextIndex]);
  };

  // 컴포넌트 안에서
  const [dragStartX, setDragStartX] = useState(0);

  const handleDragStart = (e) => {
    setDragStartX(e.clientX);
  };

  const handleDragEnd = (e) => {
    const dragEndX = e.clientX;
    const dragDistance = dragStartX - dragEndX;

    if (dragDistance > 50) {
      nextImage();
    } else if (dragDistance < -50) {
      prevImage();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 이 코드를 이미지와 버튼에도 추가해주세요.
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
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
          {noticeItems.map((item, index) => (
            <NewsDiv key={item.id}>
              <ClickableDiv onClick={() => handleTitleClick(item.id)}>
                <TitleSection>
                  {`공지사항. ${item.title}`}
                  {item.date && isNew(item.date) && <NewLabel>New</NewLabel>}
                </TitleSection>
                <InfoSection>
                  {item.formal ? "공식" : "비공식"} - {item.date}
                </InfoSection>
              </ClickableDiv>
              {openIndex === item.id && (
                <AccordionContent open={openIndex === item.id}>
                  <br />
                  {item.img.length > 0 && (
                    <ImageContainer>
                      {item.img.map((imgSrc, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={`${process.env.PUBLIC_URL}/assets/images/news/${imgSrc}`}
                          alt={`img-${imgIndex}`}
                          onClick={() => handleImageClick(item.img, imgIndex)}
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
          {currentItems.map((item, index) => (
            <NewsDiv key={item.id}>
              <ClickableDiv onClick={() => handleTitleClick(item.id)}>
                <TitleSection>
                  {`${item.id}. ${item.title}`}
                  {item.date && isNew(item.date) && <NewLabel>New</NewLabel>}
                </TitleSection>
                <InfoSection>
                  {item.formal ? "공식" : "비공식"} - {item.date}
                </InfoSection>
              </ClickableDiv>
              {openIndex === item.id && (
                <AccordionContent open={openIndex === item.id}>
                  <br />
                  {item.img.length > 0 && (
                    <ImageContainer>
                      {item.img.map((imgSrc, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={`${process.env.PUBLIC_URL}/assets/images/news/${imgSrc}`}
                          alt={`img-${imgIndex}`}
                          onClick={() => handleImageClick(item.img, imgIndex)}
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
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />
          {modalImageSrc && (
            <Modal onClick={closeModal}>
              <img
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                src={`${process.env.PUBLIC_URL}/assets/images/news/${modalImageSrc}`}
                alt="modal"
                onClick={handleModalClick}
              />
              <ModalFooter onClick={handleModalClick}>
                <ModalNavButton onClick={prevImage}>이전</ModalNavButton>
                <ModalPageInfo>{`${currentModalIndex + 1} / ${
                  currentModalImages.length
                }`}</ModalPageInfo>
                <ModalNavButton onClick={nextImage}>다음</ModalNavButton>
                <CloseButton onClick={closeModal}>닫기</CloseButton>
              </ModalFooter>
            </Modal>
          )}
        </NewsContainer>
      )}
    </>
  );
};

export default NewsInfo;
