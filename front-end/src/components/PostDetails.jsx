import React from "react";
import { useSelector } from "react-redux";
import Comment from "./fragments/Comment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Link } from "react-router-dom";

const PostDetails = ({ id }) => {
  const post = useSelector((state) =>
    state.postList.posts.find((post) => post.id === Number(id))
  );

  const TimeLine = ({ post }) => {
    const createdTime = new Date(post);
    const yymmdd = createdTime.toLocaleDateString();
    const timeStamp = createdTime.toLocaleTimeString();

    return (
      <p style={{ fontSize: "12px" }}>
        {" "}
        {"Created : " + yymmdd + " " + timeStamp}
      </p>
    );
  };

  const onClickDelete = () => {};

  const onClickUpdate = () => {};

  return (
    <div>
      {post && (
        <div>
          <h1 className="mt-4">{post.title}</h1>
          <p className="lead">{post.subtitle}</p>
          <div className="float-right">
            <Link to={"/edit/" + post.id} className="btn btn-sm">
              수정
            </Link>
            <div to={"/delete/" + post.id} className="btn btn-sm ">
              삭제
            </div>
          </div>
          <h6 style={{ fontSize: "15px" }}>Category : {post.category}</h6>
          <hr />
          <TimeLine post={post.createdTime} />
          <hr />
          <ReactMarkdown
            parserOptions={{ commonmark: true }}
            escapeHtml={false}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            children={post.content}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={children}
                    // language={"javascript"}
                    language={match[1]}
                    PreTag="div"
                    // style={darcula}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          ></ReactMarkdown>

          <hr />
          <Comment />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
