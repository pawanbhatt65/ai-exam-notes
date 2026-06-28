import React, { Fragment } from "react";

const Sidebar = ({ result }) => {
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow:sm p-5 space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">📌</span>
          <h3 className="text-lg font-semibold text-indigo-600">
            Quick Exam View
          </h3>
        </div>

    

        {/* exam-importance */}
        <section className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <p className="text-sm-font-semibold text-gray-700 mb-1">
            🔥 Exam Importance
          </p>
          <span className="text-yellow-700 font-bold text-sm">
            {result.importance}
          </span>

          <p className="text-sm font-semibold text-gray-700 mb-3">❓ Important Questions</p>

          {/* print-short questions */}
          <div className="mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3">
               <p className="text-sm font-semibold text-indigo-700 mb-1">
                  Short Questions
                </p>
                <ul className="list-disc ml-4 text-sm text-gray-700 mb-1 space-y-1">
                  {result.questions.short.map((t, i) => {
                    return <li key={i}>{t}</li>;
                  })}
                </ul>
          </div>

          {/* print-long questions */}
          <div className="mb-4 rounded-lg bg-purple-50 border border-purple-200 p-3">
               <p className="text-sm font-semibold text-purple-700 mb-1">
                  Long Questions
                </p>
                <ul className="list-disc ml-4 text-sm text-gray-700 mb-1 space-y-1">
                  {result.questions.long.map((t, i) => {
                    return <li key={i}>{t}</li>;
                  })}
                </ul>
          </div>

          {/* print-diagram questions */}
          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
               <p className="text-sm font-semibold text-blue-700 mb-1">
                  Diagram Question
                </p>
                <ul className="list-disc ml-4 text-sm text-gray-700 mb-1 space-y-1">
                  <li>{result.questions.diagram}</li>
                </ul>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Sidebar;
