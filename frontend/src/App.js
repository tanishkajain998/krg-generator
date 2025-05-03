import React, { useState } from "react";
import axios from "axios";
import Graph from "./Graph";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const handleExtract = async () => {
    const res = await axios.post("https://5000-.github.dev/extract", { text });
    setData(res.data);
  };

  return (
    <div className="p-4">
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleExtract}>Generate Graph</button>
      {data && <Graph nodes={data.nodes} edges={data.edges} />}
    </div>
  );
}

export default App;
