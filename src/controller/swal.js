import Swal from "sweetalert2";
export function swal() {
    Swal.fire({
      title: 'Thành công',
      type: 'success',
      icon: 'success'
    });
  }
 export function swalErr() {
    Swal.fire({
      title: 'Xóa Thành công',
      type: 'success',
      icon: 'error'
    });
  }
