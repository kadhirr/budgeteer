import { deleteItem } from "../helper"
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export async function logoutAction(){
    deleteItem({key: "username"});
    toast.success("You've deleted your account")

    return redirect("/")
}