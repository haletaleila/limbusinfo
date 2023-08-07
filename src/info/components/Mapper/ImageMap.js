const IMAGES_PATH = `${process.env.PUBLIC_URL}/assets/images`;

const keys = ["공격 레벨 감소", "수비 레벨 감소", "화상", "마비", "침잠"];

export const ImageMap = keys.reduce((obj, key) => {
  obj[key] = `${IMAGES_PATH}/etc/status/${key}.webp`;
  return obj;
}, {});

//https://namu.wiki/w/%ED%8C%8C%EC%9D%BC:%EC%9D%B4%EC%83%81_LCB%20%EC%88%98%EA%B0%90%EC%9E%90_%EC%88%98%EB%B9%84%EC%8A%A4%ED%82%AC.png
//https://namu.wiki/w/%ED%8C%8C%EC%9D%BC:%EC%9D%B4%EC%83%81_LCB%20%EC%88%98%EA%B0%90%EC%9E%90_%EC%8A%A4%ED%82%AC1.png
