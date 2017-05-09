import { Action } from './action';

export class ForgetAncestorAction implements Action {
    static TYPE = 'FORGETANCESTORACTION';

    type = ForgetAncestorAction.TYPE;
    distance: number;
}