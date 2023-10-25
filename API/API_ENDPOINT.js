import ip from "ip";


export default (process.env.NODE_ENV === "env")? `http://${ip.address()}:3030/api/v1`: "https://register.apori.jp/api/v1";