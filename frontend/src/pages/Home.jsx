import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [resume, setResume] = useState(null);
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const departmentOptions = {
    cse: "Computer Science Engineering",
    mechanical: "Mechanical Engineering",
    civil: "Civil Engineering",
    electrical: "Electrical Engineering",
    extc: "Electronics & Telecommunication Engineering",
    production: "Production Engineering",
    chemical: "Chemical Engineering",
    biomedical: "Biomedical Engineering",
  };

  const roleOptions = {
    cse: {
      softwareEngineer: "Software Engineer",
      cloudEngineer: "Cloud Engineer",
      dataAnalyst: "Data Analyst",
      mlEngineer: "Machine Learning Engineer",
    },

    mechanical: {
      designEngineer: "Design Engineer",
      productionEngineer: "Production Engineer",
      qualityEngineer: "Quality Engineer",
    },

    civil: {
      siteEngineer: "Site Engineer",
      structuralEngineer: "Structural Engineer",
      planningEngineer: "Planning Engineer",
    },

    electrical: {
      powerSystemsEngineer: "Power Systems Engineer",
      automationEngineer: "Automation Engineer",
      electricalDesignEngineer: "Electrical Design Engineer",
    },

    extc: {
      embeddedEngineer: "Embedded Engineer",
      vlsiEngineer: "VLSI Engineer",
      telecomEngineer: "Telecommunication Engineer",
    },

    production: {
      manufacturingEngineer: "Manufacturing Engineer",
      operationsEngineer: "Operations Engineer",
    },

    chemical: {
      processEngineer: "Process Engineer",
      plantEngineer: "Plant Engineer",
    },

    biomedical: {
      clinicalEngineer: "Clinical Engineer",
      biomedicalDesignEngineer: "Biomedical Design Engineer",
    },
  };

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

  return (
    <>
      <Navbar />

      <div className="container">
        <section
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            🚀 AI Powered Resume Intelligence
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              marginBottom: "1rem",
            }}
          >
            AI CareerPrep
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              opacity: 0.8,
              lineHeight: "1.7",
            }}
          >
            Upload your resume, select your engineering department and desired
            role, and receive an ATS-based analysis with skill matching,
            missing skills, and extracted resume insights.
          </p>
        </section>

        <div
          className="resume-card"
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ marginBottom: "2rem" }}>
            Resume Analysis
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
              }}
            >
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setResume(e.target.files[0]);
                setAnalysis(null);
              }}
            />
          </div>

          {resume && (
            <div
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              📄 Selected File: <strong>{resume.name}</strong>
            </div>
          )}

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
              }}
            >
              Department
            </label>

            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setRole("");
              }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
              }}
            >
              <option value="">Select Department</option>

              {Object.entries(departmentOptions).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {department && (
            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Target Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                }}
              >
                <option value="">Select Role</option>

                {Object.entries(roleOptions[department]).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>

        {analysis && (
          <div
            className="resume-card"
            style={{
              maxWidth: "850px",
              margin: "2rem auto 0",
            }}
          >
            <h2 style={{ marginBottom: "2rem" }}>
              Analysis Results
            </h2>

            <div
              style={{
                display: "grid",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <strong>Original Name:</strong>{" "}
                {analysis.originalName}
              </div>

              <div>
                <strong>Department:</strong>{" "}
                {departmentOptions[department]}
              </div>

              <div>
                <strong>Role:</strong>{" "}
                {roleOptions[department]?.[role]}
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                borderRadius: "16px",
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.2)",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ marginBottom: "1rem" }}>
                ATS Score
              </h3>

              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: "800",
                  color: "#2563eb",
                }}
              >
                {analysis.atsScore ?? 0}%
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 style={{ marginBottom: "1rem" }}>
                  ✅ Matched Skills
                </h3>

                {analysis.matchedSkills?.length ? (
                  <ul>
                    {analysis.matchedSkills.map((skill) => (
                      <li
                        key={skill}
                        style={{
                          marginBottom: "0.75rem",
                        }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No matched skills found.</p>
                )}
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 style={{ marginBottom: "1rem" }}>
                  ❌ Missing Skills
                </h3>

                {analysis.missingSkills?.length ? (
                  <ul>
                    {analysis.missingSkills.map((skill) => (
                      <li
                        key={skill}
                        style={{
                          marginBottom: "0.75rem",
                        }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No missing skills found.</p>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: "1rem" }}>
                Extracted Resume Text
              </h3>

              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1.5rem",
                  borderRadius: "16px",
                  lineHeight: "1.7",
                }}
              >
                {analysis.extractedText || "No text found."}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;