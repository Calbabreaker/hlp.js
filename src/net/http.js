hlp.httpPost = async (url, type, data, options = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: options.mode ?? "cors",
    cache: options.cache ?? "no-cache",
    credentials: options.credentials ?? "same-origin",
    headers: options.headers ?? {
      "Content-Type": "application/json",
    },
    redirect: options.redirect ?? "follow",
    referrerPolicy: options.referrerPolicy ?? "no-referrer",
    body: JSON.stringify(data),
  });

  if (type == hlp.json) return await response.json();
  else if (type == hlp.blob) return await response.blob();
  else return await response.text();
};
