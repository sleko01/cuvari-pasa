import React from 'react'

function Blocked(){
    function logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("id")
        window.location.href = "/";
    }
    window.alert("Blokirani ste!");

    return (
        <a href="#" onClick={logout}>Odjava</a>
    );
}

export default Blocked;