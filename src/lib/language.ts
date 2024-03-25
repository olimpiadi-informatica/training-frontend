export function language(fileName: string) {
  const lang = fileName.match(/\.(\w+)$/)?.[1];
  switch (lang) {
    case "cpp":
    case "cc":
    case "cxx":
    case "c++":
      return "C++";
    case "c":
      return "C";
    case "cs":
      return "C#";
    case "dart":
      return "Dart";
    case "go":
      return "Go";
    case "html":
      return "Javascript (HTML)";
    case "java":
      return "Java";
    case "js":
      return "Javascript";
    case "kt":
      return "Kotlin";
    case "ts":
      return "Typescript";
    case "php":
      return "PHP";
    case "pas":
    case "pp":
      return "Pascal";
    case "py":
    case "py2":
    case "py3":
      return "Python";
    case "sb3":
      return "Scratch";
    case "srs":
      return "Pseudocode";
    case "rb":
      return "Ruby";
    case "rs":
      return "Rust";
    case "vb":
      return "VisualBasic";
    default:
      return "N/A";
  }
}
