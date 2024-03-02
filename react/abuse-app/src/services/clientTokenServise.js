function setClientToken(){
    const someClientToken = "someClientToken";
    localStorage.setItem("clientToken",someClientToken)
}

function getClientToken(){
    return localStorage.getItem("clientToken");
}

export {setClientToken, getClientToken}