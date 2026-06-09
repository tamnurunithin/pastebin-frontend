import { useState } from "react";
import { createPaste } from "../services/pasteService";

function Home() {
  const [content, setContent] = useState("");
  const [expireMinutes, setExpireMinutes] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createPaste({
        content,
        expireMinutes: expireMinutes || null,
        maxViews: maxViews || null,
      });

      const pasteId = res.data.pasteId;

      const url = `${window.location.origin}/paste/${pasteId}`;

      setGeneratedLink(url);

      setContent("");
      setExpireMinutes("");
      setMaxViews("");

    } catch (error) {
      console.error(error);
      alert("Failed to create paste");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied successfully!");
  };

  return (
    <div className="container">

      <div className="hero">
        <div className="badge">Pastebin Lite</div>

        <h1>Share Text Securely</h1>

        <p>
          Create temporary text snippets, share them instantly
          using a unique URL, and control access with expiration
          times and view limits.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <label>Paste Content</label>

        <textarea
          placeholder="Write or paste your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="form-row">

          <div>
            <label>Expire After (Minutes)</label>

            <input
              type="number"
              placeholder="e.g. 60"
              value={expireMinutes}
              onChange={(e) =>
                setExpireMinutes(e.target.value)
              }
            />
          </div>

          <div>
            <label>Maximum Views</label>

            <input
              type="number"
              placeholder="e.g. 5"
              value={maxViews}
              onChange={(e) =>
                setMaxViews(e.target.value)
              }
            />
          </div>

        </div>

        <button type="submit">
          Create Secure Link
        </button>

      </form>

      {generatedLink && (
        <div className="success-box">

          <strong>
            Paste created successfully 🎉
          </strong>

          <a
            href={generatedLink}
            target="_blank"
            rel="noreferrer"
          >
            {generatedLink}
          </a>

          <button
            className="copy-btn"
            onClick={copyToClipboard}
          >
            Copy Link
          </button>

        </div>
      )}

    </div>
  );
}

export default Home;