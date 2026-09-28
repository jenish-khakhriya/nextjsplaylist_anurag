// import { redirect } from "next/navigation";

// const ManageFollowers = () => {
//   redirect("/manage-followers/followers");
// };

// export default ManageFollowers;

import { permanentRedirect } from "next/navigation";

const ManageFollowers = () => {
  permanentRedirect("/manage-followers/followers");
};

export default ManageFollowers;