import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleContent(event) {
    setContent(event.target.value);
  }

  function handleExpand() {
    setExpanded(true);
  }

  return (
    <div>
      <form onClick={handleExpand}>
        {isExpanded && (
          <input
            onChange={handleTitle}
            name="title"
            placeholder="Title"
            value={title}
          />
        )}

        <textarea
          onChange={handleContent}
          name="content"
          placeholder={isExpanded ? "Take a note..." : "Add a reminder :)"}
          rows={isExpanded ? 3 : 1}
          value={content}
        />
        <Zoom in={isExpanded}>
          <Fab
            className="addNote"
            onClick={(event) => {
              props.onAdd(title, content);
              setTitle("");
              setContent("");
              event.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
