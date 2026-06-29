import { color } from "motion/react";
import React, { Fragment, useState } from "react";
import Markdown from "react-markdown";
import MermaidSetup from "./MermaidSetup";
import RechartSetup from "./RechartSetup";
import { downloadPDF } from "../services/api";

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-indigo-700 mt-6 mb-4 border-b pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h1 className="text-xl font-bold text-indigo-700 mt-5 mb-3 border-b pb-2">
      {children}
    </h1>
  ),
  h3: ({ children }) => (
    <h1 className="text-lg font-bold text-gray-800 mt-4 mb-2">{children}</h1>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-x-16 text-gray-700">{children}</ul>
  ),
  li: ({ children }) => <li className="marker:text-indigo-500">{children}</li>,
};

const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false);

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  )
    return null;
  return (
    <Fragment>
      <div className="mt-6 p-3 space-y-10 bg-white">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📘 Generated Notes
          </h2>
          <div>
            <button
              onClick={() => setQuickRevision(!quickRevision)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${quickRevision ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              {quickRevision ? "Exit Revision Mode" : "Quick Revision (5 min)"}
            </button>
            <button
              onClick={() => downloadPDF(result)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              📑 Download PDF
            </button>
          </div>
        </div>

        {/* topics-list */}
        {!quickRevision && (
          <section>
            <SectionHeader icon={"⭐"} title="Sub Topics" color={"indigo"} />
            <p className="text-sm font-semibold text-gray-700 mb-3">
              ⭐ Sub Topics (Priority Wise)
            </p>

            {Object.entries(result.subTopics).map(([star, topics]) => {
              return (
                <div key={star} className="mb-3">
                  <p className="text-sm font-medium text-indigo-600 mb-1">
                    {star} Priority
                  </p>
                  <ul className="list-disc ml-6 text-gray-700">
                    {topics.map((t, i) => {
                      return <li key={i}>{t}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </section>
        )}

        {/* quick-revision-not-exists-show-full-notes */}
        {!quickRevision && (
          <section>
            <SectionHeader
              icon={"📙"}
              title={"Detailed Notes"}
              color={"purple"}
            />
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <Markdown components={markDownComponent}>{result.notes}</Markdown>
            </div>
          </section>
        )}

        {/* quick-revision-section-exists */}
        {quickRevision && (
          <section className="rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-6">
            <h3 className="font-bold text-green-700 mb-3 text-lg">
              🚨 Exam Quick Revision Points
            </h3>
            <ul className="list-disc ml-6 space-y-1 text-gray-800">
              {result.revisionPoints.map((p, i) => {
                return <li key={i}>{p}</li>;
              })}
            </ul>
          </section>
        )}

        {/* show-diagram */}
        {result.diagram?.data && (
          <section>
            <SectionHeader icon={"📊"} title={"Diagram"} color={"cyan"} />

            <MermaidSetup diagram={result.diagram?.data} />

            <p className="mt-3 text-xs text-gray-500 italic">
              ℹ️ If you need this diagram for future reference or revision, you
              can save it by taking a screenshot.
            </p>
          </section>
        )}

        {/* show-charts */}
        {result.charts.length > 0 && (
          <section>
            <SectionHeader
              icon={"📊"}
              title={"Visual Charts"}
              color={"indigo"}
            />

            <RechartSetup charts={result.charts} />

            <p className="mt-3 text-xs text-gray-500 italic">
              ℹ️ If you need this chart for future reference or revision, you
              can save it by taking a screenshot.
            </p>
          </section>
        )}

        {/* if chart not available for particular notes */}
        {result.charts && result.charts.length === 0 && (
          <p className="text-sm text-gray-400 italic">
            📊 Charts are not relevant for this topic.
          </p>
        )}

        {/* show few-question always either quick revision visible or not */}
        <section>
          <SectionHeader
            icon={"❓"}
            title={"Important Questions"}
            color={"rose"}
          />

          {/* important-short-questions */}
          <p className="font-medium">Short Questions</p>
          <ul className="list-disc ml-6 text-gray-700">
            {result.questions.short.map((q, i) => {
              return <li key={i}>{q}</li>;
            })}
          </ul>

          {/* important-long-questions */}
          <p className="font-medium mt-4">Long Questions</p>
          <ul className="list-disc ml-6 text-gray-700">
            {result.questions.long.map((q, i) => {
              return <li key={i}>{q}</li>;
            })}
          </ul>

          {/* important-diagram-questions */}
          <p className="font-medium mt-4">Diagram Questions</p>
          <ul className="list-disc ml-6 text-gray-700">
            <li>{result.questions.diagram}</li>
          </ul>
        </section>
      </div>
    </Fragment>
  );
};

function SectionHeader({ icon, title, color }) {
  const colors = {
    indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
    purple: "from-purple-100 to-purple-50 test-purple-700",
    blue: "from-blue-100 to-blue-50 text-blue-700",
    green: "from-green-100 to-green-50 text-green-700",
    cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
    rose: "from-rose-100 to-rose-50 text-rose-700",
  };

  return (
    <div
      className={`mb-4 px-4 py-4 rounded-lg bg-gradient-to-r ${colors[color]}) font-semibold flex items-center gap-2`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

export default FinalResult;
