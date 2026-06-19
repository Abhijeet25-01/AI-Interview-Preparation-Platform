import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const response = await axios.post(
        "http://localhost:5000/upload-resume",
        formData
      );

      setAnalysis(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to upload resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>AI Interview Preparation & Resume Analyzer</h1>

        <p>
          Practice interviews, analyze resumes, and improve your chances of
          getting hired.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(event) => {
            setResume(event.target.files[0]);
            setAnalysis(null);
          }}
        />

        <br />
        <br />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        <br />
        <br />

        {resume && (
          <p>
            Selected File: <strong>{resume.name}</strong>
          </p>
        )}

        {analysis && (
          <div className="resume-card">
            <h2>Resume Analysis</h2>

            <p>
              <strong>Original Name:</strong>{" "}
              {analysis.originalName}
            </p>

            <p>
              <strong>Saved File:</strong>{" "}
              {analysis.fileName}
            </p>

            <p>
              <strong>File Size:</strong>{" "}
              {(analysis.size / 1024).toFixed(2)} KB
            </p>

            <hr />

            <h3>Extracted Resume Text</h3>

            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              {analysis.extractedText || "No text found."}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;