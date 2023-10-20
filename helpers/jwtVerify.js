

const jwtVerify = (id_token) => {
    const text = Buffer.from(id_token.split(".")[1], "base64").toString();

    return JSON.parse(text).sub;
}

export default jwtVerify;