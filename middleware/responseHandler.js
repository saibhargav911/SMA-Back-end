const ResponseHandler={
    async successResponse(message,details,token){
        var response={
            "status":true,
            "message":message,
            "token":token,
            "details":details
        }
        return response;
    },
    async failureResponse(message,err){
        var response={
            "status":false,
            "message":message,
            "error":err
        }
        return response;
    }
}
export default ResponseHandler