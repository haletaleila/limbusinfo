const IMAGES_PATH = `${process.env.PUBLIC_URL}/assets/images`;

const keys = [
  "침잠",
  "마비",
  "공격 레벨 감소",
  "공격 위력 감소",
  "화상",
  "신속",
  "공격 위력 증가",
  "출혈",
  "호흡",
  "진동",
  "보호",
  "수비 위력 증가",
  "파열",
  "수비 위력 감소",
  "타격 취약",
  "관통 취약",
  "취약",
  "충전",
  "방어 레벨 감소",
  "도발치",
  "피해량 감소",
  "속박",
  "피해량 증가",
  "탄환",
  "참격 보호",
  "못",
  "광신",
  "주시",
  "관통 피해량 증가",
  "타격 피해량 증가",
  "약점 분석",
  "체력 회복 감소",
  "갈증",
  "침잠쇄도",
  "K사 앰플",
  "더하기 코인 강화",
  "결투 선포",
  "방어 레벨 증가",
  "정신력 회복 효율", // 나중에 생기면 바꾸기
  "정신력 감소 효율", // 이거도 생기면 바꾸자
  //"부적" 지금없음
];

export const ImageMap = keys.reduce((obj, key) => {
  obj[key] = `${IMAGES_PATH}/etc/status/${key}.webp`;
  return obj;
}, {});

//https://namu.wiki/w/%ED%8C%8C%EC%9D%BC:%EC%9D%B4%EC%83%81_LCB%20%EC%88%98%EA%B0%90%EC%9E%90_%EC%88%98%EB%B9%84%EC%8A%A4%ED%82%AC.png
//https://namu.wiki/w/%ED%8C%8C%EC%9D%BC:%EC%9D%B4%EC%83%81_LCB%20%EC%88%98%EA%B0%90%EC%9E%90_%EC%8A%A4%ED%82%AC1.png
