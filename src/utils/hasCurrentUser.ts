import isShape from "vet/objects/isShape";
import exists from "vet/exists";

const hasCurrentUser = isShape({
    id: exists,
    name: exists,
})

export default hasCurrentUser;
