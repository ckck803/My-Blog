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
  padding-right: 5px;
  padding-left: 10px;
  padding-top: 5px;

  border: 1px solid rgb(0, 0, 0, 0);
  width: 400px;
  height: 100%;

  &:active,
  &:focus {
    outline: none;
  }
`;

const EditPage = () => {
  const editorRef = useRef();

  const [form, setForm] = useState({
    title: null,
    subTitle: null,
    category: null,
    content: "",
    author: null,
  });

  const { title, subTitle, category, content, author } = form;
  const { login } = useSelector((state) => state.login);

  const onClickSubmit = () => {
    setForm({
      ...form,
      content: editorRef.current.getInstance().getMarkdown(),
    });
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

  // const isDesktopOrLaptop = useMediaQuery({ query: "(min-width : 1024px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-height : 900px)" });

  const editHeight = "80vh";

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
          <h5>
            <InputCategory
              placeholder="카테고리를 입력하세요"
              name="category"
              value={category}
              onChange={onChange}
            />
          </h5>
        </TitleContainer>
        <div
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
          }}
        >
          {/* <div style={{ height: "80%" }}> */}
          {/* <div> */}
          {/* {isDesktopOrLaptop && ( */}
          <ToastUIEditor editHeight={editHeight} editorRef={editorRef} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
