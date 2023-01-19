import './SideBar.scss';

const SideBar = ({
    roomObject,
    setSelectedRoom,
    setSelectedPatient,
    setPaused
}: {
    roomObject: RoomObject;
    setSelectedRoom: (key: (null|RoomObject)) => void;
    setSelectedPatient: (key: (null|PatientObject)) => void;
    setPaused: (key: boolean) => void;
}) => {
    return (
        <div className="side-bar">
            <div
                onClick={() => {
                    setSelectedRoom(null);
                    setPaused(false);
                }}
            >X
            </div>
            <div className="infected-patients">
                <div>
                    COVID-19 infected
                </div>
                {
                    roomObject.occupy.map((patient) => {
                        return patient.infectStatus ? (
                            <div
                                key={patient.id}
                                onClick={() => {
                                    // setSelectedRoom(null);
                                    setSelectedPatient(patient);
                                }}
                            >
                                {`${patient.id} ${patient.name}`}
                            </div>
                        ) : <></>;
                    })
                }
            </div>
            <div className="not-infected-patients">
                <div>
                    General
                </div>
                {
                    roomObject.occupy.map((patient) => {
                        return patient.infectStatus ? (
                            <></>
                        ) : (
                            <div
                                key={patient.id}
                                onClick={() => {
                                    // setSelectedRoom(null);
                                    setSelectedPatient(patient);
                                }}
                            >
                                {`${patient.id} ${patient.name}`}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default SideBar;
export {
    SideBar
};