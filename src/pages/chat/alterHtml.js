export function escapeHtml(text) {
  if (text.match(/[<>&/]/g) !== null) {
    const map = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "/": "&#x2F;",
    };

    return text.replace(/[<>&/]/g, function (char) {
      return map[char];
    });
  } else {
    return text;
  }
}

export function decodeHtml(text) {
  if (text.match(/(&lt;|&gt;|&amp;|&#x2F;)/g) !== null) {
    const map = {
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      "&#x2F;": "/",
    };

    return text.replace(/(&lt;|&gt;|&amp;|&#x2F;)/g, function (entity) {
      return map[entity];
    });
  } else {
    return text;
  }
}
