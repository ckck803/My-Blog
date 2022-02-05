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
import {
  CategoryContainer,
  CategoryLine,
  InputBorder,
  InputCategory,
  InputTitle,
  Select,
  TitleContainer,
} from "../assets/css/editor";

dotenv.config();

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
