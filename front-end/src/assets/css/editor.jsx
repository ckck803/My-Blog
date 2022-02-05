import styled from "styled-components";

export const TitleContainer = styled.div`
  /* height: "15vh"; */

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1vw;
  padding-left: 1vw;
  /* padding-right: 2rem;
  padding-left: 2rem; */
  height: 2.75rem; ;
`;

export const CategoryContainer = styled.div`
  padding-left: 1rem;
  /* display: flex;
  flex-wrap: wrap; */
`;

export const InputBorder = styled.span`
  border-right: 5px solid rgb(200, 206, 212);
  /* line-height: 2em; */
  /* height: 100%; */
`;

export const InputTitle = styled.input`
  padding-right: 5px;
  padding-left: 10px;

  border: 1px solid rgb(0, 0, 0, 0);
  width: 900px;

  font-size: 3.5rem;
  &:active,
  &:focus {
    outline: none;
  }
`;

export const InputCategory = styled.input`
  border: 1px solid rgb(0, 0, 0, 0);
  width: 250px;
  font-size: 1.5rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const CategoryLine = styled.div`
  /* padding */
  width: 240px;

  border-top: 1.5px solid rgb(200, 206, 212);
`;

export const Select = styled.select`
 margin-right: 10px
  content: "";
  width: 170px; /* 원하는 너비설정 */
  padding: 0.2em 0.2em 0.2em 0.2em; /* 여백으로 높이 설정 */
  font-family: inherit; /* 폰트 상속 */
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg)
    no-repeat 95% 50%; /* 네이티브 화살표 대체 */
  border: 1px solid #999;
  border-radius: 1px; /* iOS 둥근모서리 제거 */
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  appearance: none;
`;
