import React, { useState } from "react";
import Filter from "bad-words";

const RTE = ({ id, setRteText, postDataRTE }) => {
  const [content, setContent] = useState("");
  const [selectedForeColor, setSelectedForeColor] = useState("#ffffff");
  const [selectedBackColor, setSelectedBackColor] = useState("#000000");
  const [selectedFontName, setSelectedFontName] = useState("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState(3);

  // Filter out abusive and bad words
  const filter = new Filter();

  function filterAbusiveWords(text) {
    return filter.clean(text);
  }

  const handleChange = (event) => {
    setContent(event.target.value);
    let editorContent = document.getElementById("editor").innerHTML;

    if (editorContent) {
      const filteredText = filterAbusiveWords(editorContent);
      editorContent = filteredText;
    }
    setRteText(editorContent);
  };

  const handleFormat = (format, value = null) => {
    document.execCommand(format, false, value);
  };

  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  const handleForeColorChange = (event) => {
    setSelectedForeColor(event.target.value);
    handleFormat("foreColor", event.target.value);
  };

  const handleBackColorChange = (event) => {
    setSelectedBackColor(event.target.value);
    handleFormat("backColor", event.target.value);
  };

  const handleFontNameChange = (event) => {
    setSelectedFontName(event.target.value);
    handleFormat("fontName", event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setSelectedFontSize(event.target.value);
    handleFormat("fontSize", event.target.value);
  };

  const fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];

  const fontSize = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div
        id={id}
        className="RTE-container text-white shad-textarea text-sm px-3 py-2 w-full"
      >
        <div className="RTE-options">
          {/* <Text Format */}
          <button onClick={() => handleFormat("bold")}>
            <div className="fa-solid fa-bold" />
          </button>
          <button onClick={() => handleFormat("italic")}>
            <div className="fa-solid fa-italic" />
          </button>
          <button onClick={() => handleFormat("underline")}>
            <div className="fa-solid fa-underline" />
          </button>
          <button onClick={() => handleFormat("strikethrough")}>
            <div className="fa-solid fa-strikethrough" />
          </button>

          {/* Undo/Redo */}
          <button onClick={() => handleFormat("undo")}>
            <div className="fa-solid fa-rotate-left" />
          </button>
          <button onClick={() => handleFormat("redo")}>
            <div className="fa-solid fa-rotate-right" />
          </button>

          {/* Link */}
          <button onClick={handleLink}>
            <div className="fa fa-link" />
          </button>
          <button onClick={() => handleFormat("unlink")}>
            <div className="fa fa-unlink" />
          </button>

          {/* Alignment */}
          <button onClick={() => handleFormat("justifyLeft")}>
            <div className="fa-solid fa-align-left" />
          </button>
          <button onClick={() => handleFormat("justifyCenter")}>
            <div className="fa-solid fa-align-center" />
          </button>
          <button onClick={() => handleFormat("justifyRight")}>
            <div className="fa-solid fa-align-right" />
          </button>
          <button onClick={() => handleFormat("justifyFull")}>
            <div className="fa-solid fa-align-justify" />
          </button>
          <button onClick={() => handleFormat("indent")}>
            <div className="fa-solid fa-indent" />
          </button>
          <button onClick={() => handleFormat("outdent")}>
            <div className="fa-solid fa-outdent" />
          </button>

          {/* Font */}
          <select
            id="fontName"
            value={selectedFontName}
            onChange={handleFontNameChange}
            className="text-black"
          >
            {fontList.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            id="fontSize"
            value={selectedFontSize}
            onChange={handleFontSizeChange}
            className="text-black"
          >
            {fontSize.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          {/* Color */}
          <div className="RTE-input-wrapper">
            <input
              type="color"
              id="foreColor"
              value={selectedForeColor}
              onChange={handleForeColorChange}
            />
            <label htmlFor="foreColor">Font Color</label>
          </div>
          <div className="RTE-input-wrapper">
            <input
              type="color"
              id="backColor"
              value={selectedBackColor}
              onChange={handleBackColorChange}
            />
            <label htmlFor="backColor">Highlight Color</label>
          </div>
        </div>

        <div
          contentEditable
          id="editor"
          style={{
            marginTop: "10px",
            border: "1px solid #ddd",
            minHeight: "100px",
            padding: "20px",
            maxWidth: "100%",
            overflow: "auto",
          }}
          onInput={handleChange}
          dangerouslySetInnerHTML={{ __html: content || postDataRTE }}
          className="rounded-md"
        ></div>
      </div>
    </>
  );
};

export default RTE;
