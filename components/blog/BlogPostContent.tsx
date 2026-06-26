import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  h2: ({ children, id }) => (
    <h2 id={id} className="blog-heading">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="blog-heading-sm">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="blog-heading-xs">
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="blog-paragraph">{children}</p>,
  ul: ({ children }) => <ul className="blog-list">{children}</ul>,
  ol: ({ children }) => <ol className="blog-list-ordered">{children}</ol>,
  li: ({ children }) => <li className="blog-list-item">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="blog-quote">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="blog-link">
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className={`blog-code-block ${className || ""}`}>{children}</code>;
    }
    return <code className="blog-code-inline">{children}</code>;
  },
  pre: ({ children }) => <pre className="blog-pre">{children}</pre>,
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="blog-image-wrap block my-8">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={675}
          className="rounded-2xl border border-border w-full h-auto"
          loading="lazy"
        />
      </span>
    );
  },
  table: ({ children }) => (
    <div className="blog-table-wrap overflow-x-auto my-8">
      <table className="blog-table">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="blog-th">{children}</th>,
  td: ({ children }) => <td className="blog-td">{children}</td>,
  hr: () => <hr className="blog-hr" />,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
};

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
