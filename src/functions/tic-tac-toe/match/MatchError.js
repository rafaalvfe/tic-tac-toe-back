const ID_ERROR_MESSAGE = "";
const PAYLOAD_ERROR_MESSAGE = "";
const FINISHED_ERROR_MESSAGE = "";

export class MatchErrorID extends Error{
  constructor(args){
    super(args);
    this.message = ID_ERROR_MESSAGE;
  }
}

export class MatchErrorPayload extends Error{
  constructor(args){
    super(args);
    this.message = PAYLOAD_ERROR_MESSAGE;
  }
}

export class MatchErrorFinished extends Error{
  constructor(args){
    super(args);
    this.message = FINISHED_ERROR_MESSAGE;
  }
}
