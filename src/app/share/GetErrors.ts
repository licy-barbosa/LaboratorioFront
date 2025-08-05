export function getErrors(obj: any): string[]{
    const err = obj.error.errors;
    let messagesError: string[] = [];
    
    for(let key in err){
        let field = key;
        const messagesField = err[key].map((message: string) => `${field}: ${message}`);
        messagesError = messagesError.concat(messagesField);
    }

    return messagesError;
}