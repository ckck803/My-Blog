import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostListRequest } from "../redux/reducer/PostListReducer";
import Comment from "./fragments/Comment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
import darcula from "react-syntax-highlighter/dist/esm/styles/hljs/darcula";
// import docco from "react-syntax-highlighter/dist/cjs/styles/prism/

const PostDetails = ({ id }) => {
  const post = useSelector((state) => state.postList.posts[id - 1]);

  const TimeLine = ({ post }) => {
    const createdTime = new Date(post);
    const yymmdd = createdTime.toLocaleDateString();
    const timeStamp = createdTime.toLocaleTimeString();

    return <p>{"Created : " + yymmdd + " " + timeStamp}</p>;
  };

  const markdown = `Here is some JavaScript code:

  ~~~js
  console.log('It works!')
  ~~~
  `;

  // SyntaxHighlighter.registerLanguage("javascript", js);

  return (
    <div>
      {post && (
        <div>
          <h1 className="mt-4">{post.title}</h1>
          <p className="lead">{post.subtitle}</p>
          <hr />
          <TimeLine post={post.createdTime} />
          <hr />
          {/* <img
            className="img-fluid rounded"
            src="http://localhost:8080/file/ccdf3127-db21-4364-86e9-0efeebe5e7e3.png"
            alt=""
          />
          <hr />
          <p>{post.content}</p> */}
          {/* <ReactMarkdown
            parserOptions={{ commonmark: true }}
            escapeHtml={false}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            children={post.content}
            // children={children}
          >
            <SyntaxHighlighter
              children={children}
              // style={dark}
              // language={match[1]}
              PreTag="div"
            />
          </ReactMarkdown> */}

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
