import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [resume, setResume] = useState(null);
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    if (!department) {
      alert("Please select a department.");
      return;
    }

    if (!role) {
      alert("Please select a role.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("department", department);
      formData.append("role", role);

      const response = await axios.post(
        "http://localhost:5000/upload-resume",
        formData
      );

      setAnalysis(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = {
    cse: [
      "softwareEngineer",
      "cloudEngineer",
      "dataAnalyst",
      "mlEngineer",
    ],

    mechanical: [
      "designEngineer",
      "productionEngineer",
      "qualityEngineer",
    ],

    civil: [
      "siteEngineer",
      "structuralEngineer",
      "planningEngineer",
    ],

    electrical: [
      "powerSystemsEngineer",
      "automationEngineer",
      "electricalDesignEngineer",
    ],

    extc: [
      "embeddedEngineer",
      "vlsiEngineer",
      "telecomEngineer",
    ],

    production: [
      "manufacturingEngineer",
      "operationsEngineer",
    ],

    chemical: [
      "processEngineer",
      "plantEngineer",
    ],

    biomedical: [
      "clinicalEngineer",
      "biomedicalDesignEngineer",
    ],
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>AI CareerPrep</h1>

        <p>
          Upload your resume and get ATS analysis based on your department and role.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            setResume(e.target.files[0]);
            setAnalysis(null);
          }}
        />

        <br />
        <br />

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setRole("");
          }}
        >
          <option value="">Select Department</option>

          <option value="cse">Computer Science</option>
          <option value="mechanical">Mechanical</option>
          <option value="civil">Civil</option>
          <option value="electrical">Electrical</option>
          <option value="extc">EXTC</option>
          <option value="production">Production</option>
          <option value="chemical">Chemical</option>
          <option value="biomedical">Biomedical</option>
        </select>

        <br />
        <br />

        {department && (
          <>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>

              {roleOptions[department].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <br />
            <br />
          </>
        )}

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
              <strong>Original Name:</strong> {analysis.originalName}
            </p>

            <p>
              <strong>Department:</strong> {department}
            </p>

            <p>
              <strong>Role:</strong> {role}
            </p>

            <hr />

            <h3>ATS Score</h3>

            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#2563eb",
              }}
            >
              {analysis.atsScore ?? 0}%
            </p>

            <h3>Matched Skills</h3>

            <ul>
              {analysis.matchedSkills?.map((skill) => (
                <li key={skill}>✅ {skill}</li>
              ))}
            </ul>

            <h3>Missing Skills</h3>

            <ul>
              {analysis.missingSkills?.map((skill) => (
                <li key={skill}>❌ {skill}</li>
              ))}
            </ul>

            <hr />

            <h3>Extracted Resume Text</h3>

            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
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