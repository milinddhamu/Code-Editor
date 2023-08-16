"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [output, setOutput] = useState<string>("");
  const [code, setCode] = useState<string>(
    "\nfunction plusOne(x) {\n  return x + 1;\n}\n\nlet x = 5;\nconsole.log(plusOne(x));"
  );

  function handleCodeRun() {
    const timeoutDuration = 5000;
    let isTimedOut = false;

    const timeoutId = setTimeout(() => {
      isTimedOut = true;
      setOutput("Timeout Error: Code execution took too long.");
    }, timeoutDuration);

    try {
      const capturedOutput: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: any[]) => {
        capturedOutput.push(args.map((arg) => JSON.stringify(arg)).join(" "));
        originalConsoleLog(...args);
      };

      eval(code);
      if (!isTimedOut) {
        setOutput(`${capturedOutput.join("\n")}`);
      }

      console.log = originalConsoleLog;
    } catch (error) {
      setOutput(`${error}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-zinc-900 text-white">
        <div className="flex gap-2 p-2">
          <button
            className="grow p-2 bg-zinc-800 rounded-lg hover:opacity-80"
            onClick={handleCodeRun}
          >
            Run
          </button>
          <button
            className="grow p-2 bg-zinc-800 hover:opacity-80"
            onClick={() => {
              setCode("");
              setOutput("");
            }}
          >
            Clear
          </button>
        </div>
        <Editor
          language="javascript"
          height={"60vh"}
          defaultLanguage="javascript"
          theme={"vs-dark"}
          loading={"Editor is loading..."}
          value={code}
          onChange={(e) => {
            if (e) setCode(e);
          }}
        />
        <pre className="bg-zinc-900 p-2 overflow-y-scroll">{output}</pre>
      </div>
    </>
  );
}
