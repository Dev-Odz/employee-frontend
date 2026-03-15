import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);

  return next(req).pipe(

    catchError((error) => {

      // use switch case
      switch (error.status) {
        case 0:
          toastr.error("Server not reachable");
          break;
        case 401:
          toastr.error("Unauthorized access");
          break;
        case 409:
          toastr.error("Conflict occurred");
          break;
        case 500:
          toastr.error("Server error occurred");
          break;
        default:
          toastr.error(error.error?.message || "Something went wrong");
          break;
      }

      return throwError(() => error);
    })

  );

};