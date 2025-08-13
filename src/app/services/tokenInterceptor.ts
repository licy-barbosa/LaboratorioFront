import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { SecurityService } from "./security.service";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
    ) => {
    const seguridadService = inject(SecurityService);
    const token = seguridadService.getToken();

    if (token){
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return next(req);
}