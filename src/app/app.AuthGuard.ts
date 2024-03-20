import { inject } from "@angular/core";
import { SharedService } from "./Sevices/shared.service";
import { Router } from "@angular/router";

export const auth = () => {
    const myUser = inject(SharedService)
    const router = inject(Router)
    if( myUser.ValidateUser() ){
        console.log(myUser.ValidateUser(),'lolll')
        return myUser.ValidateUser();
    }
    else{
        router.navigateByUrl('/');
        return false;
    }
}
