// useful for parsing strings

export const regexEscape = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const smartSplit = (str, charSplit = " ", insideChar, charToDiscludeInsideChar = "") => {
  let formattedStr = str.split(new RegExp(`${hlp.regexEscape(charSplit)}+`, "g")); // regex to avoid double chars
  if (!formattedStr.slice(-1)[0]) formattedStr.pop(); // if last element is empty string

  if (insideChar != null) {
    // dont spilt inside the insideChar
    for (let i = 0; i < formattedStr.length; i++) {
      // if insdeChar is in portion of formstr
      if (formattedStr[i].includes(insideChar)) {
        // loop until end of string at start of the portion of the insidechar
        formattedStr.slice(i + 1).forEach((str, j) => {
          const stringIndex = str.indexOf(insideChar);
          if (stringIndex != -1 && str[stringIndex + 1] != charToDiscludeInsideChar) {
            // get string bewteen the inside chars
            const bewtweenInsideChar = formattedStr.slice(i, j + i + 2).join(charSplit);
            formattedStr.splice(i, j + 2, bewtweenInsideChar.replace(charToDiscludeInsideChar, "")); // replace
            return;
          }
        });
      }
    }
  }

  return formattedStr;
};

export const safeEscape = (unsafe) => {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/%/g, "&#37;");
};

export const copyToClipboard = async (str) => {
  if (!navigator.clipboard) {
    console.warn("Navigator copy not supported. Falling back on experimental.");
    // fallback for comapatipility
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    if (!successful) return alert("Copy fallback not sucessful!");

    document.body.removeChild(textArea);
  } else {
    await navigator.clipboard.writeText(str);
  }
};
