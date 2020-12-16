import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

// FontAwesome Icons
import * as FaIcons from "react-icons/fa"

const CollapseSection = ({
  title = 'Sección',
  countVideos = '0',
  videos = [],
  time = '30 min'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <div onClick={toggle} className="d-flex bg-light border-bottom pointer p-3">
            <div className="flex-grow-1">
                <p className="font-weight-bold mb-0">{title}</p>
                <small>{countVideos} | {time}</small>
            </div>
            <div>
                <FaIcons.FaChevronDown />
            </div>
        </div>
      <Collapse isOpen={isOpen} className="p-3">
        {
          videos.map((video, i ) => {
            return (
              <div className="d-flex mb-3">
                  {/*   <div className="mr-3">
                      <input type="checkbox" class="" id="" />
                  </div> */}
                  <div>
                      <p className="mb-0">{`${i+1}. ${video.Name}`}</p>
                      <small className="text-muted"><FaIcons.FaPlayCircle className="mr-2" /> 5 min</small>
                  </div>
              </div>
            )
          })
        }
      </Collapse>
    </div>
  );
}

export default CollapseSection;