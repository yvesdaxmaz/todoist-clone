import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import CollaboratorEditor from './../CollaboratorEditor/CollaboratorEditor';
import Collaborator from './../Collaborator/Collaborator';
import { useStateValue } from './../../StateProvider';
import { BsInbox } from 'react-icons/bs';
import { HIDE_PROJECT_SHARE_MODAL } from './../../actionTypes';

const ProjectShareModal = ({ project }) => {
  const wrapperRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState('collaborators');
  const [{ collaborators }, dispatch] = useStateValue();
  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      handleCloseShareModal();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  const handleCloseShareModal = () => {
    dispatch({
      type: HIDE_PROJECT_SHARE_MODAL,
    });
  };
  const handleSwitchTab = tab => {
    setSelectedTab(tab);
  };

  const current_project_collaborators = collaborators.filter(
    collaborator => collaborator.project_id === project.id,
  );

  return (
    <div className="fixed h-screen w-full bg-gray-800 bg-opacity-50 top-0 left-0">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full py-8">
          <div
            className="flex flex-grow flex-col max-w-sm w-full bg-white rounded-lg p-4"
            ref={wrapperRef}
          >
            <div className="flex items-center justify-between py-2">
              <h2 className="flex items-center space-x-2 font-bold text-sm text-gray-800">
                Share options
              </h2>
              <FaTimes size="1.5em" onClick={handleCloseShareModal} />
            </div>
            <div className="flex border-b border-gray-200">
              <div
                className={
                  'flex space-x-1 justify-center items-center w-1/2 text-sm py-2' +
                  (selectedTab === 'collaborators'
                    ? ' font-bold border-b border-gray-400'
                    : '')
                }
                onClick={() => handleSwitchTab('collaborators')}
              >
                <span>Collaborators</span>
              </div>
              <div
                className={
                  'w-1/2 text-sm text-center py-2' +
                  (selectedTab === 'invite'
                    ? ' font-bold border-b border-gray-400'
                    : '')
                }
                onClick={() => handleSwitchTab('invite')}
              >
                Invite From Project
              </div>
            </div>
            {selectedTab === 'collaborators' ? (
              <div className="flex flex-grow flex-col overflow-y-scroll">
                <div className="flex-grow">
                  <CollaboratorEditor project={project} />
                  {current_project_collaborators.length === 0 ? (
                    <div className="min-h-full flex flex-col items-center justify-center">
                      <div className="h-48 w-48">
                        <svg
                          data-svgs-path="theme_todoist/sharing.svg"
                          viewBox="0 0 220 200"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="1.5"
                        >
                          <g transform="translate(-1797 -759)">
                            <g id="Sharing">
                              <path
                                fill="none"
                                d="M1800-100h300v300h-300z"
                                transform="matrix(.73333 0 0 .66667 477 825.667)"
                              ></path>
                              <path
                                d="M16024.2 896.837s-2.5-1.384-7.4-2.005c-3.1-.401-6.9.392-9.4 1.719-4.4 2.354-6.4 8.176-5.9 12.941"
                                fill="none"
                                stroke="#da4c3f"
                                stroke-width="2.24"
                                transform="translate(-12451.214 7.341) scale(.89233)"
                              ></path>
                              <path
                                d="M16029.2 917.003c1.9-.045 5.8 1.518 7.3 3.142 1.1.176-.1 8.396-8.9 9.64-12.5 1.744-15.5-9.467-16.8-14.838-.1-.672-.3-1.326-.6-1.95-.3-.623-.7-1.319-.7-1.319l3.3-2.646 6 12.172c2-1.446 3.3-2.104 6.2-3.261 1.4-.556 4.2-.94 4.2-.94z"
                                fill="#f9e4e2"
                                transform="matrix(.89233 0 0 .92089 -12452.3 -18.778)"
                              ></path>
                              <path
                                d="M16032.8 927.055c.9-1.251 1-8.773.8-12.618-.1-2.786-1.5-8.046-3.9-10.867h-10.9"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.24"
                                transform="translate(-12450.424 7.181) scale(.89233)"
                              ></path>
                              <path
                                d="M16035.2 926.501c-1.1 3.305-10.5 5.588-16.4 2.192-4.1-2.399-5.4-7.186-6.3-11.022"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12452.3 7.181) scale(.89233)"
                              ></path>
                              <path
                                d="M16009.7 910.93c-1.3-2.302-5-3.817-7.4-.152-.9 1.363-1.1 5.271 1.3 9.373 1.8 3.08 4.6 3.45 4.6 3.45l-1.9 11.346"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.4"
                                transform="matrix(.89233 0 0 .77311 -12452.3 115.503)"
                              ></path>
                              <path
                                d="M16016.8 936h43v19s-6.4 3.064-14.4 3c0 0-15.5-22.413-28.6-22z"
                                fill="#da4c3f"
                                stroke="#da4c3f"
                                stroke-width="2.24"
                                transform="translate(-12452.794 7.7) scale(.89233)"
                              ></path>
                              <g transform="matrix(.9242 0 0 1.04992 -12968.803 -144.573)">
                                <path
                                  fill="#f9e4e2"
                                  d="M16064.8 880h140v100h-140z"
                                ></path>
                                <clipPath id="_clip1">
                                  <path d="M16064.8 880h140v100h-140z"></path>
                                </clipPath>
                                <g clip-path="url(#_clip1)">
                                  <circle
                                    cx="16112.3"
                                    cy="872.5"
                                    r="17.5"
                                    fill="none"
                                    stroke="#fff"
                                    stroke-width="1.31"
                                    transform="matrix(1.51724 0 0 1.57143 -8381.95 -440.574)"
                                  ></circle>
                                  <circle
                                    cx="16112.3"
                                    cy="872.5"
                                    r="17.5"
                                    fill="none"
                                    stroke="#fff"
                                    stroke-width="1.31"
                                    transform="matrix(1.51724 0 0 1.57143 -8241.47 -440.574)"
                                  ></circle>
                                </g>
                              </g>
                              <path
                                d="M16069.8 921.752c-5.2-7.897-15.3-21.724-15.3-21.724"
                                fill="none"
                                stroke="#da4c3f"
                                stroke-width="2.32"
                                transform="matrix(.8449 -.17733 .17733 .8449 -11840.415 2931.402)"
                              ></path>
                              <path
                                d="M16022.4 912.596s.5 1.14.6 2.007"
                                fill="none"
                                stroke="#da4c3f"
                                stroke-width="3.58"
                                transform="matrix(.54436 .12617 -.12617 .54436 -6760.882 -1697.31)"
                              ></path>
                              <path
                                d="M16055.1 938.237c4.8 10.302 2.2 25.365.6 36.186M16015.3 941.368c-3.4 7.624-6.4 15.402-8.3 23.543"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12463.951 63.398) scale(.89233)"
                              ></path>
                              <path
                                d="M15998.9 974.402c-24.2-1.09-31.8-28.046-31.8-28.046 16.7-6.744 30.4-13.439 40.8-14.451 9.9-.953 16.9 4.227 16.9 4.227"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.38"
                                transform="matrix(.75247 0 0 .92218 -10216.397 -20.579)"
                              ></path>
                              <path
                                d="M17208.4 560.506c1-.363 2.6-.555 4.3-.223"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="1.25"
                                transform="matrix(.8344 0 0 2.09797 -12514.802 -357.587)"
                              ></path>
                              <path
                                d="M16026.8 918.535c1.3-.317 4.7-.409 4.7-.409-.5-2.648-.7-5.113-2.8-7.214"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12451.905 7.453) scale(.89233)"
                              ></path>
                              <path
                                d="M16046.9 993.204c.8 1.938 1.4 4.013 1.7 5.858.3 1.358 0 2.778-.9 3.858s-2.2 1.7-3.6 1.7c-9.2.04-27.7.04-33.7.04-8.1 0-14.2 1.26-15.6-4.66-1.3-5.924 3.1-8.602 3.1-8.602s-6.9-22.758-7-30.337c-.1-7.579 5.7-24.843 24.3-24.843 18.7 0 38.6 34.043 38.6 34.043l20.8-7.074 2.5 7.774s-17.6 18.546-32.3 19.039l2.1 3.204z"
                                fill="#eca19a"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12452.3 7.181) scale(.89233)"
                              ></path>
                              <path
                                d="M17189.8 654h36"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.05"
                                transform="matrix(.97469 0 0 .97468 -14922.648 272.517)"
                              ></path>
                              <path
                                d="M16009.8 910.912s5.9-6.007 10-6.912c4.2-.905 13.8 0 13.8 0 3.6-1.735 6-4.076 8.1-6.783.6-.734.8-1.69.5-2.588a2.79 2.79 0 0 0-1.7-2.006v-.022c-4-1.734-8.6-1.288-12.3 1.182-7.6 5.263-13.5 11.019-18.4 17.129z"
                                fill="#da4c3f"
                                stroke="#da4c3f"
                                stroke-width="2.24"
                                transform="translate(-12452.3 7.181) scale(.89233)"
                              ></path>
                              <path
                                d="M16144.8 820v100.996"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.49"
                                transform="matrix(.67966 0 0 .91175 -9030.286 36.588)"
                              ></path>
                              <circle
                                cx="16112.3"
                                cy="872.5"
                                r="17.5"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.24"
                                transform="translate(-12434.922 53.288) scale(.89233)"
                              ></circle>
                              <path
                                d="M16088.5 919.768c.3 5.065 5.5 9.706 10.5 9.612 2.4-.045 4.9-.619 6.7-2.337 4.7-4.636 4.8-15.089-2.1-17.879"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.24"
                                transform="matrix(.86574 -.21623 .21623 .86574 -12221.646 3555.648)"
                              ></path>
                              <path
                                d="M16092.4 921.099c4.7-8.606 12.6-17.109 21.4-21.717"
                                fill="none"
                                stroke="#fff"
                                stroke-width="1.23"
                                stroke-dasharray="1.23,3.68,0,0"
                                transform="matrix(-.918 .81382 -1.2955 -1.46134 17873.967 -10946.907)"
                              ></path>
                              <path
                                d="M16078.3 869.802c15.3-2.245 33.6 1.187 46.6 10.31"
                                fill="none"
                                stroke="#fff"
                                stroke-width="1.79"
                                stroke-dasharray="1.79,5.38,0,0"
                                transform="matrix(1.03867 0 0 1.18718 -14785.796 -237.065)"
                              ></path>
                              <path
                                d="M16067.5 867.397c-2.3 4.731 2.1 10.726 6.7 6.212 4.6-4.477-2.2-9.015-6.7-7.13"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.24"
                                transform="translate(-12437.785 17.87) scale(.89233)"
                              ></path>
                              <path
                                d="M16067.5 867.397c-2.3 4.731 2.1 10.726 6.7 6.212 4.6-4.477-2.2-9.015-6.7-7.13"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.24"
                                transform="matrix(.02027 .8921 -.8921 .02027 2420.324 -13540.378)"
                              ></path>
                              <path
                                d="M16056.1 931.678c6.9-4.581 14.5-11.743 23.5-9.579"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12435.613 35.131) scale(.89233)"
                              ></path>
                              <path
                                d="M16072.4 925.025c3.7.456 7.7 3.203 7.7 7.276M16071.4 928.689c3 1.023 5.4 3.157 6.6 6.095"
                                fill="none"
                                stroke="#eca19a"
                                stroke-width="2.24"
                                transform="translate(-12437.193 36.628) scale(.89233)"
                              ></path>
                              <path
                                d="M16060.7 937.722c2.8.296 6-.899 8-2.985.5-.634.9-1.48 1.4-2.214"
                                fill="none"
                                stroke="#da4c3f"
                                stroke-width="2.36"
                                transform="matrix(.86195 0 0 .83122 -11948.83 93.62)"
                              ></path>
                              <path
                                d="M15990.9 961.061c-.1-7.579 5.7-24.843 24.3-24.843 11.4 0 17.9 5.509 17.9 5.509M16078 970.408s-18.5 19.099-33.2 19.592c-14.6.493-34-26.35-34-26.35"
                                fill="none"
                                stroke="#da4c3f"
                                stroke-width="2.24"
                                transform="translate(-12452.3 7.181) scale(.89233)"
                              ></path>
                              <circle
                                cx="16149.8"
                                cy="915"
                                r="5"
                                fill="none"
                                stroke="#fff"
                                stroke-width="2.24"
                                transform="translate(-12440.155 36.381) scale(.89233)"
                              ></circle>
                              <path
                                d="M17324.4 626.525c.4 3.906-.1 8.799-3.2 11.622"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.05"
                                transform="matrix(.97469 0 0 .97468 -14949.604 279.34)"
                              ></path>
                              <path
                                d="M16129.3 941.066c-2-2.516-3.1-5.745-3.1-9.088v-1.612c0-3.169 1.2-6.209 3.2-8.45 2-2.241 4.7-3.5 7.6-3.5h2.6c2.7 0 5.3 1.186 7.2 3.297 1.9 2.111 3 4.973 3 7.959v3.429c0 2.625-.8 5.169-2.3 7.189-2.4 3.081-5.5 7.332-5.5 7.332l-3.4 4.868-4.1-4.868s-2.9-3.584-5.2-6.556z"
                                fill="#eca19a"
                                stroke="#eca19a"
                                stroke-width="3.55"
                                transform="matrix(.88822 0 0 .80094 -12393.649 134.4)"
                              ></path>
                              <path
                                d="M16084.8 987.286c-1-8.937-2.6-18.099-2.7-27.1M16064.2 970.999c6-.422 11.9-1.305 17.9-2.525"
                                fill="#f9e4e2"
                                stroke="#f9e4e2"
                                stroke-width="2.24"
                                transform="translate(-12427.714 48.885) scale(.89233)"
                              ></path>
                              <path
                                d="M16121.9 1024l1-8s7.7-12.28 7.9-33h19.5l8.3 41"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.24"
                                transform="translate(-12461.68 23.9) scale(.89233)"
                              ></path>
                              <path
                                d="M16163.2 988.837s0 0 0 0c3.2 0 6.2 2.346 7.8 6.156 2.6 6.317 4 17.287 7.3 33.967"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="1.9"
                                transform="matrix(1.20404 0 0 .87408 -17511.483 36.737)"
                              ></path>
                              <circle
                                cx="16067"
                                cy="982.153"
                                r="12.153"
                                fill="#f9e4e2"
                                stroke="#f9e4e2"
                                stroke-width="2.24"
                                transform="translate(-12427.714 48.885) scale(.89233)"
                              ></circle>
                              <path
                                d="M16092.2 956.566c-16.7-.683-37.3 4.535-43.3 22.204-2 5.642-2 10.462.7 15.853 4.6 8.997 17.1 6.017 17.1 6.017"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.33"
                                transform="matrix(.89544 0 0 .82009 -12477.083 116.643)"
                              ></path>
                              <path
                                d="M17324.4 626.525c.4 3.906-.1 8.799-3.2 11.622"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.05"
                                transform="matrix(.97469 0 0 .97468 -14902.012 279.34)"
                              ></path>
                              <path
                                d="M16129.3 941.066c-2-2.516-3.1-5.745-3.1-9.088v-1.612c0-3.169 1.2-6.209 3.2-8.45 2-2.241 4.7-3.5 7.6-3.5h2.6c2.7 0 5.3 1.186 7.2 3.297 1.9 2.111 3 4.973 3 7.959v3.429c0 2.625-.8 5.169-2.3 7.189-2.4 3.081-5.5 7.332-5.5 7.332l-3.4 4.868-4.1-4.868s-2.9-3.584-5.2-6.556z"
                                fill="#eca19a"
                                stroke="#eca19a"
                                stroke-width="3.55"
                                transform="matrix(.88822 0 0 .80094 -12346.057 134.4)"
                              ></path>
                              <path
                                d="M16124.1 1022.91l6.7-39.91h19.5l8.3 41"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="2.24"
                                transform="translate(-12414.088 23.9) scale(.89233)"
                              ></path>
                              <path
                                d="M16163.2 988.837s0 0 0 0c3.2 0 6.2 2.346 7.8 6.156 2.6 6.317 4 17.287 7.3 33.967"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="1.9"
                                transform="matrix(1.20404 0 0 .87408 -17463.89 36.737)"
                              ></path>
                              <path
                                d="M16163.2 988.837s0 0 0 0c3.1 0 6 2.159 7.6 5.729 2 4.591 3.3 11.744 5.2 21.924"
                                fill="none"
                                stroke="#f9e4e2"
                                stroke-width="1.9"
                                transform="matrix(-1.20404 0 0 .87408 21441.798 36.737)"
                              ></path>
                              <path
                                d="M17343.8 641s-6 15.4-6 22c0 3.311 2.7 6 6 6 3.4 0 6-2.689 6-6 0-6.6-6-22-6-22z"
                                fill="#eca19a"
                                transform="translate(-18755.79 127.473) scale(1.19607)"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <h2 className="text-md font-bold text-gray-900">
                        Organize work together
                      </h2>
                      <p className="text-center text-sm text-gray-600 mb-4">
                        Assign tasks and due dates, discuss details in task
                        <br />
                        comments, and keep everyone on the same page.
                      </p>
                    </div>
                  ) : (
                    <div className="py-4">
                      {current_project_collaborators.map(
                        (collaboratorItem, index) => (
                          <Collaborator
                            key={index}
                            collaborator={collaboratorItem}
                          />
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-16">
                <p className="text-gray-400 text-center text-sm">
                  You have no shared projects.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShareModal;
