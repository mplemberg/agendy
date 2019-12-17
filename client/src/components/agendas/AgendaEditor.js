import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import AlertContext from "../../context/alert/alertContext";

import OutlineEditor from "./OutlineEditor";
import TitleEditor from "./TitleEditor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Icon from "react-fontawesome";

const AgendaEditor = ({ match }) => {
  const agendasContext = useContext(AgendasContext);
  const alertContext = useContext(AlertContext);

  const {
    loading,
    loadAgenda,
    loadDraft,
    saveAgenda,
    agenda,
    pendingSave,
    publishAgenda
  } = agendasContext;

  useEffect(() => {
    if (match.params.editCode) {
      loadAgenda(match.params.editCode, "edit");
    } else {
      loadDraft();
    }
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const { name, agendaLines } = agenda;

  let viewUrl;
  if (agenda.viewCode) {
    viewUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      "/agenda/view/" +
      agenda.viewCode;
  }
  const titleItem = { id: "title", text: name };
  return (
    <main>
      <div className='row'>
        <div className='col col-lg-8'>
          <div className='row my-3'>
            <div className='col-auto pr-0'>
              {
                //This is needed to line all the text up and have the drag icon to the left
              }
              <div
                style={{
                  width: "24px"
                }}
              ></div>
            </div>
            <div className='col pl-1'>
              <div className='row'>
                <div className='col-auto'>
                  <TitleEditor item={titleItem} />
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  {pendingSave && (
                    <Fragment>
                      <button className='btn btn-success' onClick={saveAgenda}>
                        Save
                      </button>
                    </Fragment>
                  )}

                  {agenda.isPublishable && (
                    <button className='btn btn-dark' onClick={publishAgenda}>
                      {agenda.publishedDate ? "Publish Updates" : "Publish"}
                    </button>
                  )}
                </div>
              </div>
              {agenda.savedDate && (
                <div className='row'>
                  <div className='col-auto'>
                    <div className='small font-italic'>
                      {" "}
                      Last Saved: {agenda.savedDate}
                    </div>
                  </div>
                </div>
              )}
              {agenda.publishedDate && (
                <div className='row'>
                  <div className='col-auto'>
                    <div className='small font-italic'>
                      Last Published: {agenda.publishedDate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {agendaLines && (
            <div className='row'>
              <div className='col'>
                <OutlineEditor />
              </div>
            </div>
          )}
        </div>
        {viewUrl && (
          <div className='col col-lg-4 my-3'>
            <div className='card w-100'>
              <div className='card-body bg-light'>
                <span className='font-weight-bold'>Share </span>
                <CopyToClipboard
                  text={viewUrl}
                  onCopy={() =>
                    alertContext.setAlert("Copied to Clipboard", "primary")
                  }
                >
                  <button
                    className='btn btn-sm btn-info'
                    onClick={publishAgenda}
                  >
                    <Icon name='copy' />
                  </button>
                </CopyToClipboard>
                <a href='#'>
                  <small>{viewUrl}</small>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AgendaEditor;
