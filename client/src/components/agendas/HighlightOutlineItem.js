import React, { Fragment } from "react";
import Icon from "react-fontawesome";
import AgendasContext from "../../context/agendas/agendasContext";
import KeyboardEventHandler from "react-keyboard-event-handler";
import ContentEditable from "react-contenteditable";
import BulletIcon from "./BulletIcon";
import { isBrowser, isMobile } from "react-device-detect";

const HighlightOutlineItem = ({ item, onDragStart, handleDragOver }) => {
  const agendasContext = React.useContext(AgendasContext);
  const ref = React.useRef();

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
    clearHoveredItem,
    addNewAfter,
    editingItem,
    moveItemUp,
    moveItemDown
  } = agendasContext;

  let test1 = isBrowser;
  let test2 = isMobile;
  const isHoveringOverCurrentItem = isHoveredItem(item);
  const isEditingCurrentItem = isEditingItem(item);
  React.useEffect(() => {
    if (isEditingCurrentItem) {
      ref.current.focus();
    }
    // eslint-disable-next-line
  }, [editingItem]);

  const handleClick = () => {
    setEditingItem(item);
  };

  const handleUpBtn = () => {
    moveItemUp(item);
  };

  const handleDownBtn = () => {
    moveItemDown(item);
  };

  const mouseEnter = () => {
    setHoveredItem(item);
  };

  const onChange = e => {
    const value =
      e.target.value == "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ? "" : e.target.value;
    setItemProperty(item.id, "text", value);
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
    addNewAfter(item);
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
  if (isHoveringOverCurrentItem || isEditingCurrentItem) {
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
        <ContentEditable
          innerRef={ref}
          html={item.text} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={onChange} // handle innerHTML change
          tagName='span'
          onClick={setEditingItem}
          className={isHoveringOverCurrentItem && !item.text ? "pr-4" : ""}
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
          {isBrowser && isHoveringOverCurrentItem && (
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
          <div className='col-auto'>
            <BulletIcon indent={item.indent} />
            <span
              style={{
                cursor: "text"
              }}
              className=''
              onClick={handleClick}
            >
              {textContent}
            </span>

            {isMobile && (isHoveringOverCurrentItem || isEditingCurrentItem) && (
              <Fragment>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-primary border-0 ml-2didn'
                  onClick={handleUpBtn}
                >
                  <Icon name='arrow-up' />
                </button>
                <button
                  type='button'
                  className='btn btn-sm btn-primary'
                  onClick={handleDownBtn}
                >
                  Down
                </button>
              </Fragment>
            )}

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
