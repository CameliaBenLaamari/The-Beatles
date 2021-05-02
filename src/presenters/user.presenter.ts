import { ModelUser } from "../models/user.model";
import { User } from "../repositories/user.repository";
import { ViewUser } from "../views/user.view";
import { Presenter } from "./presenter.generic";

export class PresenterUser extends Presenter<User, ViewUser, ModelUser> {}