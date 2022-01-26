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
import Header from "../fragments/Header";
import Footer from "../fragments/Footer";
import { useCallback } from "react";

dotenv.config();

const ToastUIEditor = ({ editHeight, editorRef }) => {
  // const editorRef = useRef();

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
  console.log(editHeight);

  return (
    // <div
    //   style={{
    //     position: style.position,
    //     bottom: style.bottom,
    //     width: style.width,
    //   }}
    // >
    <div style={{ paddingLeft: "1.75vw", paddingRight: "1.75vw" }}>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height={editHeight}
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        plugins={[codeSyntaxHighlight]}
      />
      {/* <button onClick={onClickSubmit}>Markdown 반환하기</button> */}
    </div>
  );
};

export default ToastUIEditor;
