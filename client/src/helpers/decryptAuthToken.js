const parseJwt = token => {
  var base64Url = token.split(".")[1];
  if (base64Url !== undefined) {
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  }
};

export default parseJwt;
