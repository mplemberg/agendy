import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import Outline from "./Outline";
const Agenda = ({ match }) => {
  const agendasContext = useContext(AgendasContext);

  const { loading, loadAgenda, agenda } = agendasContext;

  useEffect(() => {
    loadAgenda(match.params.login);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const { name, outline } = agenda;
  return (
    <main>
      <div className='my-3'>
        <div className='row'>
          <div className='col'>
            <h1>{name}</h1>
          </div>
        </div>
      </div>
      {outline && <Outline />}
    </main>
  );
};

export default Agenda;
