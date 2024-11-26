import { makeAutoObservable } from "mobx";
import { User } from "../types/types";
import axios, { AxiosResponse } from "axios";
import { api } from "../api/PostApi";

class userStore{
    users: User[] = []
    user: User | null = null

    constructor() {
        makeAutoObservable(this);
      }

    getUser(userId: number){
        axios.get(`${api.user}${userId}`).then((res: AxiosResponse<User>) => {
            this.user = res.data
        })
    }
}
export default userStore;