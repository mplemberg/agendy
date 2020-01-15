import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import AgendasContext from "../../context/agendas/agendasContext";
import OutlineViewer from "../agendas/OutlineViewer";

const About = ({ match }) => {
  const agendasContext = useContext(AgendasContext);

  const { loading, loadAgenda, agenda } = agendasContext;

  useEffect(() => {
    loadAgenda("5656dbfd-d3e4-44f3-b8ca-6a9913cf9993", "view");
    // eslint-disable-next-line
    //Edit code: f2aafe74-393c-4552-a989-57601803da47
  }, []);

  if (loading) return <Spinner />;
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
  const { name, agendaLines } = agenda;
  return (
    <main>
      <div className='row'>
        <div className='col'>
          <div className='row my-3'>
            {leftColumnSpacer}
            <div className='col pl-1'>
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
          </div>
          {agendaLines && (
            <div className='row'>
              <div className='col'>
                <OutlineViewer />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default About;
