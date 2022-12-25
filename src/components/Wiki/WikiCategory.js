import React, { useState } from "react"
import { useParams } from "react-router-dom"
import seekResults from "../Util/Seek"
import SeekTool from "../Util/SeekTool"
import PrePost from "../Util/PrePost"
import Titleist from "../Util/Titleist"
import NoResults from "../Util/NoResults"
import { sortByKey } from "../Util/Func"

export default function WikiCategory({ site, stuff }) {
  const { category } = useParams()
  const data = stuff.filter(post => post.type === "wiki" && post.metadata.category === category)
  const relevant = sortByKey(data, "title", "")
  const [results, setResults] = useState(relevant)
  document.title = `${category} - ${site.metadata.section_labels.wiki} - ${site.metadata.name}`

  return (
    <main id="main" className="max-w-screen-lg w-screen mx-auto my-0">
      <div className="feed-head sm:flex sm:flex-grow place-content-between">
        <Titleist section={`${site.metadata.section_labels.wiki} [category : ${category}]`} />
        <SeekTool seekResults={seekResults} setResults={setResults} relevant={relevant} />
      </div>

      <div className="feed-list grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {results.length > 0 && results.map(post => <PrePost key={post.id} site={site} post={post} />)}

        {results.length === 0 && <NoResults />}
      </div>
    </main>
  )
}
