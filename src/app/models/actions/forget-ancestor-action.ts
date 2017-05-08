import { Action } from '../action';

export class ForgetAncestorAction implements Action {
    static TYPE = 'FORGETANCESTOR';

    type = ForgetAncestorAction.TYPE;
    distance: number;
}