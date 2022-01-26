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

dotenv.config();

const TitleContainer = styled.div`
  position: "absolute";
  clear: "both";

  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
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
  width: 400px;

  font-size: 2.75rem;
  &:active,
  &:focus {
    outline: none;
  }
`;

const InputCategory = styled.input`
  padding-right: 5px;
  padding-left: 10px;

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
    // console.log(editorRef.current.getInstance().getMarkdown());
    // // console.log(editorRef.current.getInstance().getHTML());
    // // console.log(process.env.REACT_APP_POST_WRITE_API_URL);
    // const content = editorRef.current.getInstance().getMarkdown();
    // console.log("content : ", content);
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
      // console.log(value);
      setForm({
        ...form,
        [name]: value,
      });
    },
    [setForm, form]
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("file", blob);

            console.log("이미지가 업로드 됐습니다.");
            const fileStoreURL = process.env.REACT_APP_FILE_API_URL;

            const { data: filename } = await axios.post(
              fileStoreURL + "/upload",
              formData,
              {
                header: { "content-type": "multipart/formdata" },
              }
            );

            const imageUrl = fileStoreURL + "/" + filename;

            // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
            callback(imageUrl, "image");
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  var height = 0;

  // useEffect(() => {
  //   console.log(editorRef.current.props.height);
  //   editorRef.current.props.height = (window.innerHeight / 100) * 80;
  //   // height = (window.innerHeight / 100) * 80;
  // }, [height]);

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
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "75%",
            clear: "both",
          }}
        >
          <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="800px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
            plugins={[codeSyntaxHighlight]}
          />
          <button onClick={onClickSubmit}>Markdown 반환하기</button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
