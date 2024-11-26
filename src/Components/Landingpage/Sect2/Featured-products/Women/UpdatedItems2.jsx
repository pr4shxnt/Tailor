
import Itemhandler2 from "../../../../../Data/Itemhandler2";

const UpdatedItems2 = Itemhandler2.filter(item => item.featured === "true" || item.featured === true);

export default UpdatedItems2;

