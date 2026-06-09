import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaste } from "../services/pasteService";

function ViewPaste() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaste();
  }, []);

  const fetchPaste = async () => {
    try {
      const res = await getPaste(id);

      setContent(res.data.content);
    } catch (err) {
      if (err.response?.status === 410) {
        setError("Paste Expired");
      } else {
        setError("Paste Not Found");
      }
    }
  };

  return (
    <div className="container">
      <h1>Paste Viewer</h1>

      {error ? (
        <h2>{error}</h2>
      ) : (
        <pre>{content}</pre>
      )}
    </div>
  );
}

export default ViewPaste;