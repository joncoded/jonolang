import React from "react"
import ReactMarkdown from "react-markdown"
import { useParams, Link } from "react-router-dom"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import Flip from "../Util/Flip"
import Meta from "../Util/Meta"
import None from "../Util/None"

export default function Wiki({ site, stuff }) {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, "")} {...props} /> : <code className={className} {...props} />
    }
  }

  const { id } = useParams()

  const post = stuff.filter(p => p.slug === id).shift()
  const postType = site.metadata.section_labels[post.type]

  const tags = post.metadata.tags.split(",")

  if (!post) return <None />

  document.title = `${post.title} - ${site.metadata.section_labels.wiki} (${site.metadata.section_taglines.wiki}) - ${site.metadata.name}`

  return (
    <main id="main" tabIndex="-1" className="w-screen">
      <div className="wiki-container max-w-screen-lg mx-auto my-0">
        <article className="blog-proper mb-12">
          <Meta site={site} post={post} />

          <Flip stuff={stuff} post={post} hidden="true" />

          <div className="wiki-content mb-6">
            <div className="unreset">{post.metadata.alternate_content ? <ReactMarkdown components={components} children={post.metadata.alternate_content}></ReactMarkdown> : <div className="unreset" dangerouslySetInnerHTML={{ __html: post.content }}></div>}</div>
          </div>

          {post.metadata.extension && (
            <div className="wiki-extension mb-6">
              <div className="unreset" dangerouslySetInnerHTML={{ __html: post.metadata.extension }}></div>
            </div>
          )}

          {post.metadata.footnotes && (
            <div className="wiki-footnotes mb-6 text-sm">
              <div className="unreset" dangerouslySetInnerHTML={{ __html: post.metadata.footnotes }}></div>
            </div>
          )}

          {post.metadata.tags && (
            <div className="text-tags my-12 text-center">              
              <ul className="inline">
                {tags.map(tag => (
                  <li key={tag} className="inline mr-2">
                    <Link className="tight bg-gray-200 hover:bg-green-900 text-green-700 hover:text-white hover:underline dark:text-green-500 dark:hover:text-white py-2 px-4" to={`/${postType}/tag/${tag.trim()}`}>
                      {tag.trim()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <Flip stuff={stuff} post={post} hidden="false" />
      </div>
    </main>
  )
}
