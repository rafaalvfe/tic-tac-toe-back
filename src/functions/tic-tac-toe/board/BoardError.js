const MOVE_ERROR_MESSAGE = "";
const PAYLOAD_ERROR_MESSAGE = "";

export class BoardErrorMove extends Error{
  constructor(args){
    super(args);
    this.message = MOVE_ERROR_MESSAGE;
  }
}
