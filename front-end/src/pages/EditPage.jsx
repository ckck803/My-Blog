import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import styled from "styled-components";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import Header from "../components/fragments/Header";
import Footer from "../components/fragments/Footer";

const TitleContainer = styled.div`
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

  const handleClick = () => {
    console.log(editorRef.current.getInstance().getMarkdown());
  };

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

            // axios.defaults.withCredentials = true;
            // const { data: url } = await axios.post(
            //   `${backUrl}image.do`,
            //   formData,
            //   {
            //     header: { "content-type": "multipart/formdata" },
            //   }
            // );
            // callback(url, "alt text");
          })();

          return false;
        });
    }

    return () => {};
  }, [editorRef]);

  return (
    <div>
      <Header />
      <TitleContainer>
        <h1>
          <InputBorder />
          <InputTitle placeholder="제목을 입력하세요"></InputTitle>
        </h1>
        <h5>
          <InputCategory placeholder="카테고리를 입력하세요"></InputCategory>
        </h5>
      </TitleContainer>
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="800px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
          plugins={[codeSyntaxHighlight]}
        />
        <button onClick={handleClick}>Markdown 반환하기</button>
      </div>
    </div>
  );
};

export default EditPage;
