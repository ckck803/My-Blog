import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { useSelector } from "react-redux";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import { useCallback } from "react";
import ToastUIEditor from "../components/contents/ToastUIEditor";
import { useParams } from "react-router-dom";
import {
  CategoryContainer,
  CategoryLine,
  InputBorder,
  InputCategory,
  InputTitle,
  TitleContainer,
} from "../assets/css/editor";
import Select from "react-select";

dotenv.config();

const customStyles = {
  control: (styles) => ({
    ...styles,
    width: 200,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 10,
    // width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const EditPage = () => {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.postList.posts.find((post) => post.id === Number(id))
  );
  const ref = useRef();

  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    category: "",
    content: "",
    author: "",
  });

  const { title, category } = form;

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const onChangeSelect = ({ value, label }) => {
    setForm({
      ...form,
      category: label,
    });
  };

  return (
    <div>
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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <InputCategory
                placeholder="카테고리를 입력하세요"
                name="category"
                value={category}
                onChange={onChange}
              />
              <Select
                onChange={onChangeSelect}
                ref={ref}
                options={options}
                styles={customStyles}
              />
            </div>
            <CategoryLine />
          </CategoryContainer>
        </TitleContainer>
        <div>
          <div
            style={{
              // position: "fixed",
              // paddingTop: "10vh",
              paddingTop: "8.5rem",
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
