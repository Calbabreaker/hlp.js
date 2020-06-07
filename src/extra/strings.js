// useful for parsing strings

hlp.regexEscape = (str) => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

hlp.smartSplit = (str, charSplit = " ", insideChar, charToDiscludeInsideChar = "") => {
  // regex to avoid double chars
  let formattedStr = str.split(new RegExp(`${charSplit}+`, "g"));
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

hlp.safeEscape = (unsafe) => {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/%/g, "&#37;");
};

hlp.onlyContainsSpaces = (str) => {
  return !str.replace(/\s/g, "").length;
};

hlp.copyToClipboard = async (str) => {
  if (!navigator.clipboard) {
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
    if (!successful) throw new Error("Copy fallback not sucessful!");

    document.body.removeChild(textArea);
  } else {
    await navigator.clipboard.writeText(str);
  }
};
