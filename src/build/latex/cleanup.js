export default function cleanUp(latex) {
  // strip any \[ and \], which is a block-level LaTeX markup indicator for MathJax:
  latex = latex.replace(/^'/, "").replace(/'$/, "").replace("\\[", "").replace("\\]", "");

  // wrap some known functor words in italics markup
  ["Bézier"].forEach((term) => {
    latex = latex.replace(new RegExp(term, "g"), "\\textit{" + term + "}");
  });

  // also unindent the LaTeX.
  var indent = false;
  var lines = latex.split("\n").filter((line) => !!line.trim());
  var clean = function (line, idx) {
    if (!indent) {
      var matched = line.match(/^(\s+)/);
      if (matched) {
        indent = matched[0];
      }
    }
    if (indent) {
      lines[idx] = line.replace(indent, "").trim();
    }
  };
  lines.forEach(clean);
  latex = lines.join("\n");
  return latex;
}
