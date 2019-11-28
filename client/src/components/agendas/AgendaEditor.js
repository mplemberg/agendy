import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import OutlineEditor from "./OutlineEditor";
import Icon from "react-fontawesome";

const AgendaEditor = ({ match }) => {
  const agendasContext = useContext(AgendasContext);

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
  return (
    <main>
      <div className='my-3'>
        <div className='row'>
          <div className='col-auto'>
            <div className='h1'>{name}</div>
          </div>
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
                Publish
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
      {agendaLines && <OutlineEditor />}
    </main>
  );
};

export default AgendaEditor;
