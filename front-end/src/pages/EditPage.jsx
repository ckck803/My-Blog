import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import Header from "../components/fragments/Header";

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
      <h1>제목 : </h1>
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
