import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import styled from "styled-components";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import dotenv from "dotenv";
import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import Header from "../components/fragments/Header";
import Footer from "../components/fragments/Footer";
import { useCallback } from "react";
import ToastUIEditor from "../components/contents/ToastUIEditor";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";

dotenv.config();

const TitleContainer = styled.div`
  /* height: "15vh"; */

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1.75vw;
  padding-left: 1.75vw;
  /* padding-right: 2rem;
  padding-left: 2rem; */
  height: 2.75rem; ;
`;

const CategoryContainer = styled.div`
  padding-right: 2rem;
  /* padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  height: 2.75rem; ; */
`;

const InputBorder = styled.span`
  border-left: 5px solid rgb(200, 206, 212);
  /* line-height: 2em; */
  /* height: 100%; */
`;

const InputTitle = styled.input`
  padding-right: 5px;
  padding-left: 10px;

  border: 1px solid rgb(0, 0, 0, 0);
  width: 900px;

  font-size: 2.75rem;
  &:active,
  &:focus {
    outline: none;
  }
`;

const InputCategory = styled.input`
  padding: 0.2em 0.2em 0.2em 0.2em;

  border: 1px solid rgb(0, 0, 0, 0);
  width: 230px;
  height: 100%;

  font-size: 1.17rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

const CategoryLine = styled.div`
  width: 220px;
  border-top: 1.5px solid rgb(200, 206, 212);
`;

const Select = styled.select`
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

const EditPage = () => {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.postList.posts.find((post) => post.id === Number(id))
  );

  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    category: "",
    content: "",
    author: "",
  });

  const { title, category } = form;
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id && title !== "") {
      setForm({
        ...form,
        title: post.title,
        category: post.category,
      });
    }
  }, [id, form, title]);

  const onClickSubmit = () => {
    console.log(form);
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    axios
      .post(process.env.REACT_APP_POST_WRITE_API_URL, form, config)
      .then(console.log("포스트를 생성했습니다."))
      .catch(console.log("포스트를 생성에 실패 했습니다."));
  };

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [setForm, form]
  );

  return (
    <div>
      <Header />
      <div>
        <TitleContainer>
          <h1>
            <InputBorder />
            <InputTitle
              placeholder="제목을 입력하세요"
              name="title"
              value={title}
              onChange={onChange}
            />
          </h1>
          <CategoryContainer>
            <InputCategory
              placeholder="카테고리를 입력하세요"
              name="category"
              value={category}
              onChange={onChange}
            />
            <Select>
              <option>카테고리 선택</option>
              <option>자료구조</option>
              <option>직접입력</option>
            </Select>
            <CategoryLine />
          </CategoryContainer>
        </TitleContainer>
        <div>
          <div
            style={{
              // position: "fixed",
              // paddingTop: "10vh",
              paddingTop: "6em",
              margin: "Button",
              width: "100%",
              height: "100%",
            }}
          >
            <ToastUIEditor
              id={id}
              form={form}
              setForm={setForm}
              onClickSubmit={onClickSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
