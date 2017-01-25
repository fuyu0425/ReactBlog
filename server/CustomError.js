function CustomError(message,status=400){
    this.message=(message || "");
    this.status=(status);
}
CustomError.prototype=new Error();

export default CustomError;
