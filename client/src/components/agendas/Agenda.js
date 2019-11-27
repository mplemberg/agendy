import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import Outline from "./Outline";
import Icon from "react-fontawesome";

const Agenda = ({ match }) => {
  const agendasContext = useContext(AgendasContext);

  const {
    loading,
    loadAgenda,
    loadDraft,
    saveAgenda,
    agenda,
    pendingSave,
    pendingPublish
  } = agendasContext;

  useEffect(() => {
    if (match.params.id) {
      loadAgenda(match.params.id);
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
                  <Icon name='save' />
                </button>
              </Fragment>
            )}

            {pendingPublish && (
              <button className='btn btn-dark'>
                <Icon name='upload' />
              </button>
            )}
          </div>
        </div>
      </div>
      {agendaLines && <Outline />}
    </main>
  );
};

export default Agenda;
