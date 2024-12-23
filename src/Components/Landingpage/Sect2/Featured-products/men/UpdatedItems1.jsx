
import Itemhandler from '../../../../../Data/Itemhandler'

const UpdatedItems1 = Itemhandler.filter(item => item.featured === "true" || item.featured === true);

export default UpdatedItems1;

