import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { Link } from "react-router-dom";
import dotenv from "dotenv";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import { useCallback } from "react";
import { useSelector } from "react-redux";

dotenv.config();

const ToastUIEditor = ({ form, setForm, onClickSubmit, id }) => {
  const post = useSelector((state) =>
    state.postList.posts.find((post) => post.id === Number(id))
  );

  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      editorRef.current
        .getInstance()
        .addHook("addImageBlobHook", (blob, callback) => {
          (async () => {
            let formData = new FormData();
            formData.append("file", blob);

            const config = {
              headers: {
                Authorization: localStorage.getItem("token"),
                "content-type": "multipart/formdata",
              },
            };

            console.log("이미지가 업로드 됐습니다.");
            const fileStoreURL = process.env.REACT_APP_FILE_API_URL;

            const { data: filename } = await axios.post(
              fileStoreURL + "/upload",
              formData,
              config
            );

            const imageUrl = fileStoreURL + "/" + filename;

            // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
            callback(imageUrl, "image");
          })();

          return false;
        });
      if (post) {
        editorRef.current.getInstance().setMarkdown(post.content, true);
      }
    }
    return () => {};
  }, [editorRef, post]);

  const onChange = useCallback(
    (props) => {
      if (!editorRef.current) {
        return;
      }
      let content = "";
      if (props === "markdown") {
        content = editorRef.current.getInstance().getMarkdown();
      } else {
        content = editorRef.current.getInstance().getHtml();
      }
      setForm({
        ...form,
        content: content,
      });
    },
    [form, setForm, editorRef]
  );

  return (
    <div style={{ paddingLeft: "1.75vw", paddingRight: "1.75vw" }}>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="75vh"
        // height="40rem"
        // height="0em"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        plugins={[codeSyntaxHighlight]}
        onChange={onChange}
      />
      <div className="float-right">
        <Link to={"/"} className="btn">
          취소
        </Link>
        <Link
          to={"/"}
          className="btn lg-auto d-felx justify-content-end"
          onClick={onClickSubmit}
        >
          저장
        </Link>
      </div>
    </div>
  );
};

export default ToastUIEditor;
