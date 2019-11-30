import React from "react";
import Icon from "react-fontawesome";
import AgendasContext from "../../context/agendas/agendasContext";
import KeyboardEventHandler from "react-keyboard-event-handler";

const HighlightOutlineItem = ({ item, onDragStart, handleDragOver }) => {
  const agendasContext = React.useContext(AgendasContext);

  const {
    setActiveItem,
    clearActiveItem,
    isEditingMode,
    isHighlightingItem,
    setEditingItem,
    isEditingItem,
    setHoveredItem,
    isHoveredItem,
    setItemProperty,
    moveLeft,
    moveRight,
    addItem,
    removeItem,
    isHovering,
    clearHoveredItem
  } = agendasContext;

  const handleClick = () => {
    setEditingItem(item);
  };

  const mouseEnter = () => {
    setHoveredItem(item);
  };

  const onChange = e => {
    setItemProperty(item.id, "text", e.target.value);
  };

  const handleTab = e => {
    e.preventDefault();
    moveRight(item);
  };
  const handleShiftTab = e => {
    e.preventDefault();
    moveLeft(item);
  };

  const handleEnter = e => {
    e.preventDefault();
    addItem();
  };

  const handleBackspace = e => {
    if (item.text === "") {
      e.preventDefault();
      removeItem(item);
    }
  };

  const handleClose = () => {
    removeItem(item);
  };

  const handleMouseLeave = () => {
    if (isHovering()) {
      clearHoveredItem();
    }
  };
  let textContent = item.text;
  if (isEditingItem(item)) {
    textContent = (
      <KeyboardEventHandler
        handleKeys={["tab", "shift+tab", "enter", "backspace"]}
        onKeyEvent={(key, e) => {
          if (key === "tab") {
            handleTab(e);
          } else if (key === "shift+tab") {
            handleShiftTab(e);
          } else if (key === "enter") {
            handleEnter(e);
          } else if (key === "backspace") {
            handleBackspace(e);
          }
        }}
      >
        <input
          className=''
          autoFocus
          style={{ boxShadow: "none", border: "none", boxSizing: "none" }}
          type='text'
          value={item.text || ""}
          onChange={onChange}
        />
      </KeyboardEventHandler>
    );
  }

  let margin = "";
  if (item.indent && item.indent === 1) {
    margin = "ml-3";
  } else if (item.indent && item.indent === 2) {
    margin = "ml-5";
  }

  const isHoveringOverCurrentItem = isHoveredItem(item);
  const isEditingCurrentItem = isEditingItem(item);
  return (
    <div
      className='row'
      onMouseEnter={mouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragOver={handleDragOver}
    >
      <div className='col-auto pr-0'>
        <div
          style={{
            width: "24px"
          }}
        >
          {isHoveringOverCurrentItem && (
            <span
              className='border rounded px-1'
              style={{
                cursor: "move"
              }}
              draggable
              onDragStart={onDragStart}
            >
              <Icon name='ellipsis-v' />
              <Icon name='ellipsis-v' />
            </span>
          )}
        </div>
      </div>
      <div className='col pl-1'>
        <div className={`form-row ${margin}`}>
          <div className='col-auto'>&bull;</div>
          <div className='col-auto'>
            <span
              style={{
                cursor: "text"
              }}
              className=''
              onClick={handleClick}
            >
              {textContent}
            </span>
            {(isHoveringOverCurrentItem || isEditingCurrentItem) && (
              <button
                type='button'
                className='close pl-2'
                onClick={handleClose}
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightOutlineItem;
