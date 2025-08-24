"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

function CodeBlock({ inline, className = "", children = [], ...props }: any) {
  const codeContent = Array.isArray(children)
    ? children.join("")
    : String(children);

  if (inline) {
    return (
      <code className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-100 text-[0.85em]">
        {codeContent}
      </code>
    );
  }

  return (
    <div className="my-2 rounded-lg bg-neutral-900 overflow-auto max-h-72">
      <pre className="px-3 py-2 text-sm leading-relaxed">
        <code className={className} {...props}>
          {codeContent}
        </code>
      </pre>
    </div>
  );
}

export default function FormatMarkdown({ content }: Props) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock,
      }}
    >
      {content.toString()}
    </Markdown>
  );
}
