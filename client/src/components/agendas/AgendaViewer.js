import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import OutlineViewer from "./OutlineViewer";
import Icon from "react-fontawesome";

const AgendaViewer = ({ match }) => {
  const agendasContext = useContext(AgendasContext);

  const { loading, loadAgenda, agenda } = agendasContext;

  useEffect(() => {
    if (match.params.viewCode) {
      loadAgenda(match.params.viewCode, "view");
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
        </div>
        {agenda.publishedDate && (
          <div className='row'>
            <div className='col-auto'>
              <div className='small font-italic'>
                Last Updated: {agenda.publishedDate}
              </div>
            </div>
          </div>
        )}
      </div>
      {agendaLines && <OutlineViewer />}
    </main>
  );
};

export default AgendaViewer;
