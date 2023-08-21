
type Status = 'pending' | 'success' | 'error'
type Response = Promise<any> | Promise<Error>;
function promiseWrapper<T extends Response>(promise: Promise<T>) {
    let status: Status = 'pending';
    let response: Response;

    const suspender = promise.then(
        res => {
            status = 'success';
            // console.log('res is....',res)
            response = res;
        },
        error => {
            status = 'error'
            response = error
        })

    function read() {
        switch (status) {
            case 'pending':
                console.log('inside read..', status)
                throw suspender;
            case 'error':
                console.log('inside read..', status)
                throw response
            default:
                console.log('inside read..', status)
                return response

        }
    }

    return { read };
}

export { promiseWrapper }