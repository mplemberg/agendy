import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import AlertContext from "../../context/alert/alertContext";

import OutlineEditor from "./OutlineEditor";
import TitleEditor from "./TitleEditor";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Icon from "react-fontawesome";
import { AgendaDate } from "./AgendaDate";
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
    publishAgenda,
    saveAndPublishAgenda
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

  const leftColumnSpacer = (
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
  );

  const leftColumnSpacerMobileOnly = (
    <div className='d-lg-none col-auto pr-0'>
      {
        //This is needed to line all the text up and have the drag icon to the left
      }
      <div
        style={{
          width: "24px"
        }}
      ></div>
    </div>
  );
  const titleItem = { id: "title", text: name };

  const handlePublish = async () => {
    if (pendingSave) {
      await saveAndPublishAgenda();
    } else {
      await publishAgenda();
    }
  };
  return (
    <main>
      <div className='row'>
        <div className='col col-lg-8'>
          <div className='row my-3'>
            {leftColumnSpacer}
            <div className='col pl-1'>
              <div className='row'>
                <div className='col-auto'>
                  <TitleEditor item={titleItem} />
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  {
                    <Fragment>
                      <button
                        className='btn btn-sm btn-dark mr-2'
                        onClick={saveAgenda}
                        disabled={!pendingSave}
                      >
                        Save
                      </button>
                    </Fragment>
                  }

                  {
                    <button
                      className='btn btn-sm btn-primary'
                      onClick={handlePublish}
                      disabled={!pendingSave && !agenda.isPublishable}
                    >
                      {pendingSave ? "Save & Publish" : "Publish"}
                    </button>
                  }
                </div>
              </div>
              {agenda.savedDate && (
                <div className='row'>
                  <div className='col-auto'>
                    <div className='small font-italic'>
                      {" "}
                      Last Saved: <AgendaDate date={agenda.savedDate} />
                    </div>
                  </div>
                </div>
              )}
              {agenda.publishedDate && (
                <div className='row'>
                  <div className='col-auto'>
                    <div className='small font-italic'>
                      Last Published: <AgendaDate date={agenda.publishedDate} />
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
          <div className='col col-lg-4'>
            <div className='row my-3'>
              {leftColumnSpacerMobileOnly}
              <div className='col'>
                <div className='row'>
                  <div className='border border-light rounded bg-light p-1 mt-5 mt-lg-0'>
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
                    <a href={viewUrl}>
                      <span
                        className='d-block text-truncate'
                        style={{
                          maxWidth: "400px"
                        }}
                      >
                        {viewUrl}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AgendaEditor;
