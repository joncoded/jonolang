import React, { useState } from "react"
import seekResults from "../Util/Seek"
import SeekTool from "../Util/SeekTool"
import PrePost from "../Util/PrePost"
import Titleist from "../Util/Titleist"
import NoResults from "../Util/NoResults"
import { sortByKey } from "../Util/Func"

export default function Wikis({ site, stuff }) {
  const data = stuff.filter(post => post.type === "wiki")
  let relevant = sortByKey(data, "title", "")
  
  const [results, setResults] = useState(relevant)

  document.title = `${site.metadata.section_labels.wiki} (${site.metadata.section_taglines.wiki}) - ${site.metadata.name}`

  return (
    <main id="main" className="max-w-screen-lg w-screen mx-auto my-0">
      <div className="feed-head sm:flex sm:flex-grow place-content-between">
        <Titleist section={site.metadata.section_labels.wiki} subsection={site.metadata.section_taglines.wiki} />
        <SeekTool seekResults={seekResults} setResults={setResults} relevant={relevant} />
      </div>

      <div className="feed-list grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {results.length > 0 && results.map(post => <PrePost key={post.id} site={site} post={post} />)}

        {results.length === 0 && <NoResults text={site.metadata.message_labels.no_content} />}
      </div>
    </main>
  )
}
