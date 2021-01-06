import React from "react";

const href = location.href;

const Button = () => <button onClick = {() => { alert(href); } }>App 2 Button</button>;

export default Button;