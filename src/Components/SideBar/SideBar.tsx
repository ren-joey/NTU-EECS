import './SideBar.scss';

const SideBar = ({
    roomObject,
    setSelectedRoom
}: {
    roomObject: RoomObject,
    setSelectedRoom: (keu: (null|RoomObject)) => void
}) => {
    return (
        <div className="side-bar">
            <div onClick={() => setSelectedRoom(null)}>X</div>
            <div className="infected-patients">
                <div>
                    COVID-19 infected
                </div>
                {
                    roomObject.occupy.map((patient) => {
                        return patient.infectStatus ? (
                            <div key={patient.id}>
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
                            <div key={patient.id}>
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