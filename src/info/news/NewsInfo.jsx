import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionTitle,
  FilterButton,
  NewsContainer,
  NewsDiv,
} from "./NewsInfoStyle";

const NewsInfo = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 필터링 상태 ('all', 'true', 'false')

  useEffect(() => {
    // JSON 파일을 불러옵니다.
    fetch("json/News/News.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // 로깅
        setData(data);
      });
  }, []);

  // 필터링된 데이터를 반환하는 함수
  const getFilteredData = () => {
    if (filter === "all") return data;
    const isFormal = filter === "true";
    return data.filter((item) => item.formal === isFormal);
  };
  return (
    <NewsContainer>
      <FilterButton onClick={() => setFilter("all")}>전체보기</FilterButton>
      <FilterButton onClick={() => setFilter("true")}>
        공식 업데이트 정보
      </FilterButton>
      <FilterButton onClick={() => setFilter("false")}>
        사이트 업데이트 정보
      </FilterButton>
      {getFilteredData().map((item, index) => (
        <NewsDiv key={item.id}>
          <AccordionTitle onClick={() => setOpenIndex(item.id)}>
            {item.title}
          </AccordionTitle>
          <AccordionContent open={openIndex === item.id}>
            {item.img.length > 0 && (
              <div className="image-container">
                {item.img.map((imgSrc, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={
                      `${process.env.PUBLIC_URL}/assets/images/news/` + imgSrc
                    }
                    alt={`img-${imgIndex}`}
                  />
                ))}
              </div>
            )}
            <div className="description">{item.desc}</div>
          </AccordionContent>
        </NewsDiv>
      ))}
    </NewsContainer>
  );
};

export default NewsInfo;
