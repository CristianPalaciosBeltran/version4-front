import React, { useState } from "react";
import {
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
} from "reactstrap";
import { ReadChild } from "../components-organization-chart";
import { ReadPosition } from "../components-position";


// FontAwesome Icons
import * as FaIcons from "react-icons/fa";

export const Modals = ({ positionChartId, children, tab }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <span role="button" onClick={toggle}>
        {children}
      </span>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Información</ModalHeader>
        <ModalBody>
          <ReadChild positionChartId={positionChartId} tab={tab} />
        </ModalBody>
        {/* <ModalFooter>
          <Button color="danger" onClick={toggle}>Quitar puesto</Button>{''}
          <Button color="primary" onClick={toggle}>Cerrar</Button>
        </ModalFooter> */}
      </Modal>
    </>
  );
};

export const ModalPosition = ({ positionChartId, children }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <span role="button" onClick={toggle}>
        {children}
      </span>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Posición</ModalHeader>
        <ModalBody>
          <ReadPosition positionChartId={positionChartId}/>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="danger" onClick={toggle}>Quitar puesto</Button>{''}
          <Button color="primary" onClick={toggle}>Cerrar</Button>
        </ModalFooter> */}
      </Modal>
    </>
  );
};

const CollapseSection = ({
  title = "Sección",
  countVideos = "0",
  videos = [],
  time = "30 min",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        onClick={toggle}
        className="d-flex bg-light border-bottom pointer p-3"
      >
        <div className="flex-grow-1">
          <p className="font-weight-bold mb-0">{title}</p>
          <small>
            {countVideos} | {time}
          </small>
        </div>
        <div>
          <FaIcons.FaChevronDown />
        </div>
      </div>
      <Collapse isOpen={isOpen} className="p-3">
        {videos.map((video, i) => {
          return (
            <div className="d-flex mb-3">
              {/*   <div className="mr-3">
                      <input type="checkbox" class="" id="" />
                  </div> */}
              <div>
                <p className="mb-0">{`${i + 1}. ${video.Name}`}</p>
                <small className="text-muted">
                  <FaIcons.FaPlayCircle className="mr-2" /> 5 min
                </small>
              </div>
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default CollapseSection;

export const Node = ({
  isFirst,
  children,
  area,
  labelButton,
  employee,
  addChild,
  updateNode,
  deleteChild,
  positionId,
  name,
  positionChartId,
  watchChild,
  isOpenAux = false,
  mode,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenAux);

  const toggle = () => setIsOpen(!isOpen);
  const rArea = area ? area : "";
  return (
    <div>
      <Card className="card-left mb-2 mr-0 pr-0">
        <CardBody className="mr-0 pr-0">
          <div className={"mr-0"}>
            <small>
              {rArea?.Name ? (
                <div
                  className="text-dark text-start"
                  style={{ textAlign: "start" }}
                >
                  {`Area: ${rArea.Name}`}
                </div>
              ) : (
                ""
              )}
            </small>
            <div className="d-flex my-2">
              <div></div>
              <div
                onClick={toggle}
                className="font-weight-bold  mb-2 pointer mr-2"
                style={{ textAlign: "start" }}
              >
                {!isOpen ? (
                  <FaIcons.FaChevronCircleRight className="mr-1  text-muted" />
                ) : (
                  <FaIcons.FaChevronCircleDown className="mr-1 text-primary" />
                )}
              </div>
              <div
                className="text-dark font-weight-bold text-start  mr-5"
                style={{ textAlign: "start" }}
              >
                {mode === "Editar" ? (
                  <Modals
                    positionChartId={positionChartId}
                    tab={"1"}
                    modalTitle={name}
                    name={name}
                  >
                    {labelButton}
                  </Modals>
                ) : (
                  <ModalPosition
                  positionChartId={positionChartId}
                  >
                    {labelButton}

                  </ModalPosition>
                )}
              </div>
              <div
                className="text-dark text-start mr-5"
                style={{ textAlign: "start" }}
              >
                {mode === "Editar" ? (
                  <Modals
                    positionChartId={positionChartId}
                    tab={"2"}
                    modalTitle={name}
                    name={name}
                  >
                    {employee ? employee : "Empleado"}
                  </Modals>
                ) : employee ? (
                  employee
                ) : (
                  "Empleado"
                )}
              </div>
              <div className="mr-2">
                {isFirst !== null ? (
                  <FaIcons.FaEye
                    className="text-secondary"
                    onClick={watchChild}
                  />
                ) : (
                  ""
                )}
              </div>
              {mode === "Editar" ? (
                <>
                  <div className="mr-2">
                    <FaIcons.FaUserEdit
                      className="text-secondary"
                      onClick={updateNode}
                    />
                  </div>
                  <div className="mr-2">
                    <FaIcons.FaPlusCircle
                      className="text-secondary"
                      onClick={addChild}
                    />
                  </div>
                  <div className="mr-2">
                    {deleteChild && (
                      <FaIcons.FaMinusCircle
                        className="text-secondary"
                        onClick={deleteChild}
                      />
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <Collapse isOpen={isOpen}>{children}</Collapse>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
