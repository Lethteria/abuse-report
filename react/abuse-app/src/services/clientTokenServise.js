function setClientToken(){
    const someClientToken = "clientToken";
    localStorage.setItem("clientToken",someClientToken)
}

function getClientToken(){
    return localStorage.getItem("clientToken");
}

export {setClientToken, getClientToken}