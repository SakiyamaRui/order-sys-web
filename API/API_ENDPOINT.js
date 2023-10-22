import ip from "ip";


export default (process.env.NODE_ENV === "env")? `http://${ip.address()}:3030/api/v1`: "http://147.185.221.16:49851/api/v1";