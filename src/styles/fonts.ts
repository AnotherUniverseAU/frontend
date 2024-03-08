import { css } from "styled-components";

import NotoSansRegular from "src/assets/fonts/NotoSansKR-Regular.ttf";
import NotoSansMedium from "src/assets/fonts/NotoSansKR-Medium.ttf";
import NotoSansBold from "src/assets/fonts/NotoSansKR-Bold.ttf";

export const fonts = css`
  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src:
      local("NotoSansKR"),
      url(${NotoSansRegular}) format("truetype");
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src:
      local("NotoSansKR"),
      url(${NotoSansMedium}) format("truetype");
  }

  @font-face {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src:
      local("NotoSansKR"),
      url(${NotoSansBold}) format("truetype");
  }
`;
