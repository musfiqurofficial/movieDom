import React from "react";
import UsersProfiles from "../Preference/UsersProfiles";

const ManageProfile = () => {
  return (
    <div className='center manage-profile' >
      <UsersProfiles manageProfile={true} />
    </div>
  );
};

export default ManageProfile;
