class helper {

}

helper.noNamespace = () => {
  // so that you don't have to do helper. every time (not recomended)
  const helperKeys = Object.keys(helper);
  helperKeys.forEach(key => {
    window[key] = helper[key];
  });
}

helper.test = () => {
  console.log("Justtesting :P")
}